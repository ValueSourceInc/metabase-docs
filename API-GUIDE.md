# Metabase API Guide

Hand-written reference for interacting with the Metabase REST API. The generated
docs in `docs/metabase/` are the *output* of these API calls — this guide is
about *how* to call the API effectively.

**Base URL pattern:** `{METABASE_API_BASE_URL}/api{endpoint}`
(no trailing slash on the base; endpoints start with `/`.)

## Authentication

```
Header: x-api-key: <METABASE_API_KEY>
```

The API key is a long-lived token from Admin → Settings → Authentication → API Keys.
It bypasses session-based auth entirely — no cookie/session management needed.

### Self-Signed Certs

If the Metabase instance uses a self-signed certificate (common in internal/VPN
deployments), set before making requests:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

Or in the generator: `METABASE_ALLOW_SELF_SIGNED_CERT=true` in `.env`.

## Endpoint Reference

All endpoints are GET. All return JSON arrays at the top level (except detail
endpoints which return a single object).

### Collections

```
GET /api/collection
```

Returns all collections (flat list — not nested). Each item has:
`id`, `name`, `parent_id`, `location`, `description`, `archived`, `is_personal`.

**Note:** The flat list is enough to reconstruct the tree (use `location` for
path-based ordering, `parent_id` for parent links).

### Cards (list)

```
GET /api/card
```

Returns all cards/questions/models as a flat list. Each item includes basic
metadata but **does NOT include `result_metadata`** (field definitions).
For fields, you must fetch each card individually via the detail endpoint.

Key fields in list response:
- `id`, `name`, `description`, `display`, `type`, `query_type`
- `database_id`, `collection_id`, `archived`
- `dataset_query` — the full query JSON (MBQL or native SQL); always present

### Cards (detail)

```
GET /api/card/{id}
```

Returns the full card object **including `result_metadata`** — the array of
field definitions (name, display_name, base_type, effective_type, semantic_type).

**This is the main reason to call the detail endpoint** — the list endpoint
omits field metadata. The generator fetches every card individually for this.

**Rate-limit note:** This endpoint is the bottleneck. The generator uses
concurrency=8 (8 parallel requests). Going higher risks 429/503 errors on
moderate-to-large instances.

**Error handling:** Individual card fetches can fail (timeout, deleted card,
permission change). Always handle per-card errors gracefully — log a warning
and fall back to the list entry (which has all data except result_metadata).

### Dashboards (list)

```
GET /api/dashboard
```

Returns all dashboards. Does NOT include `dashcards` (the cards placed on each
dashboard).

### Dashboards (detail)

```
GET /api/dashboard/{id}
```

Returns the full dashboard **including `dashcards`** — each dashcard has a
`card_id` and optionally an embedded `card` object.

**Rate-limit note:** Generator uses concurrency=5 for dashboards.

### Search

```
GET /api/search?q=<keyword>&models=card,dashboard,collection
```

Server-side full-text search across cards, dashboards, and collections.
Returns a ranked list of results. This is efficient for name-based lookup
when you don't need the full catalog.

### Database Metadata (for SQL exploration)

```
GET /api/database/{id}/metadata
```

Returns tables, fields, and foreign keys for a database. Not used by the
generator but useful when exploring the underlying schema.

```
GET /api/database/{id}/schemas
GET /api/database/{id}/schema/{schema}
```

Schema-level metadata. Useful for understanding which tables/views are available.

```
GET /api/table/{id}/query_metadata
```

Returns field metadata for a specific table, including foreign key targets.
Used for building MBQL queries against a table.

## Rate Limiting & Concurrency

Metabase API has no documented hard rate limit, but practical experience:

| Endpoint | Safe Concurrency | Notes |
|----------|-----------------|-------|
| `/api/card/{id}` | 8 | Bottleneck endpoint. 226 cards ≈ 30s at concurrency=8 |
| `/api/dashboard/{id}` | 5 | Less data per request but still IO-bound |
| `/api/collection` | 1 | Single call, near-instant |
| `/api/card` (list) | 1 | Single call, ~1-2s for 200+ cards |
| `/api/dashboard` (list) | 1 | Single call, near-instant |

**Timeout:** Use 120s per request (generator uses `AbortSignal.timeout(120000)`).
The API occasionally takes 30-60s for complex card detail requests.

**Retry pattern:** For transient failures (429, 503, timeout), a single retry
after 2-3s is usually sufficient. Don't retry 4xx errors (bad request, not found).

## Data Model Notes

### Card Types

Metabase's `type` field is the authoritative signal:
- `"question"` — a saved question (MBQL builder or native SQL)
- `"model"` or `"dataset"` — a model (cached query result usable as a data source)

**Don't infer type from the card name.** Cards named "Xxx Model" may be
questions, and vice versa. Always check the `type` field.

### Query Types

`query_type` tells you how the card was built:
- `"query"` — MBQL graphical query builder
- `"native"` — raw SQL

For models, `query_type` may not be set. In that case, scan `dataset_query`
for `"mbql.stage/native"` to detect native SQL.

### Dependencies (source-card references)

Cards can reference other cards via `#source-card` in their `dataset_query`.
The generator recursively walks the query JSON to find all `source-card` and
`card-id` values. This gives you the upstream/downstream DAG.

**Important:** A card that references another card's ID in its query depends
on it. Changing an upstream card can break downstream cards silently (Metabase
doesn't validate cross-card references on save).

### Fields (result_metadata)

Only available from the detail endpoint. Each field has:
- `name` — internal column name (may be `sum`, `sum_2`, etc. for aggregations)
- `display_name` — human-readable label
- `base_type` — underlying database type
- `effective_type` — Metabase's interpretation of the type
- `semantic_type` — optional semantic tag (e.g. `type/FK`, `type/Number`)

**Watch for:** generic aggregation field names (`sum`, `sum_2`, `avg`, `min`,
`max`) — these indicate the card was built without explicit column aliases and
the field names are ambiguous without reading the chart configuration.

## Common Workflows

### 1. Fetch all cards with full metadata

```typescript
// 1. Get flat list (fast, no field metadata)
const cards = await apiGet<CardSummary[]>("/card");

// 2. Fetch each card individually for result_metadata
const detailed = await mapWithConcurrency(cards, 8, (card) =>
  apiGet<CardSummary>(`/card/${card.id}`)
);
```

### 2. Find a card by name (API-based)

```bash
curl -s -H "x-api-key: $KEY" "$BASE/api/search?q=settlement&models=card" | jq '.data[] | {id, name}'
```

### 3. Get dashboard with its cards

```typescript
const dashboard = await apiGet<DashboardSummary>(`/dashboard/${id}`);
// dashboard.dashcards[] → each has card_id and optional card object
```

### 4. Trace what depends on a card

After building the dependency graph (see generator's `buildCardDocs`):
- Upstream card IDs are in `source-card` references within `dataset_query`
- Downstream = reverse lookup: any card whose upstream list includes this card

### 5. Filter cards by database

Cards from different databases can coexist in Metabase. Use `database_id` to
filter. The generator supports `METABASE_DATABASE_IDS` (comma-separated) for
multi-database setups, falling back to `METABASE_DB_ID` for single-database.

## When to Use API vs Generated Docs

| Scenario | Use |
|----------|-----|
| Find a card by name | API `/api/search` first (zero local tokens); fall back to `_catalog.md` |
| Browse all cards by domain | `_catalog.md` or `domains/{domain}.md` |
| Get a card's fields | `cards/{id}.md` (pre-generated) |
| Trace dependencies | `_deps.json` (pre-computed) |
| Check if docs are stale | API `/api/card` → compare count with `_index.json` summary |
| Real-time data query | API only (docs are metadata-only, no raw data) |
| Explore database schema | API `/api/database/{id}/metadata` |
| Build a new MBQL query | API `/api/table/{id}/query_metadata` for field metadata |

**Rule of thumb:** Read generated docs for metadata lookups (fast, offline, token-aware).
Call the API for real-time data, search, or when the docs might be stale.

## Ad-hoc Queries (Dataset)

```
POST /api/dataset
Content-Type: application/json

{
  "database": 4,
  "type": "native",
  "native": { "query": "SELECT ..." }
}
```

Run arbitrary SQL against the database. Returns `{"data":{"rows":[...],"cols":[...]}}`.
**Rate-limit note:** No documented limit, but complex queries can take 1-2s. Don't
firehose it with concurrent requests.

**PostgreSQL type strictness:** Columns imported from CSV/text sources may be `text`
in the DB even when they contain numbers. Use `CAST(col AS INTEGER)` or `col::integer`
before aggregating — `SUM(text_column)` will fail.

## Gotchas

1. **List vs detail mismatch.** `/api/card` list doesn't include fields.
   Always fetch detail (`/api/card/{id}`) if you need `result_metadata`.

2. **Deleted cards may still appear.** Cards deleted during a bulk fetch can
   return 404 on detail. Handle individually, don't abort the whole batch.

3. **Archived cards are included by default.** The list endpoint returns archived
   cards. Filter `archived: true` if you need only active ones.

4. **Personal collections.** Cards in personal collections (e.g. "Cui Liu's
   Personal Collection") may reference tables/models that get deleted, leaving
   orphaned cards. These show up with `is_personal: true` on the collection.

5. **Native SQL cards lack field metadata.** Even from the detail endpoint,
   native SQL cards may have empty `result_metadata` because Metabase can't
   introspect raw SQL. These cards will have empty field lists in the docs.

6. **`query_type` is reliable for questions but not models.** Models may have
   `query_type: null` even when they use native SQL. Use the fallback detection
   (scan for `mbql.stage/native` in dataset_query).

7. **Self-referencing dependencies.** A card can reference itself (circular).
   The generator's dependency depth calculation has cycle detection to avoid
   infinite recursion.

8. **API key permissions.** The API key inherits the creating user's permissions.
   If you can't see certain cards/collections, check the key's group membership
   in Admin → Permissions.

9. **Base URL already includes `/api`.** The `.env` base URL is
   `https://metabase.vsource.local/api`. Appending `/api/card/...` creates
   `/api/api/...` which returns `"API endpoint does not exist."`. Endpoint
   paths are relative: `{base}/card/{id}`, not `{base}/api/card/{id}`.

10. **Card detail doesn't expose source table.** To find the underlying DB table
    for a card: GET `/api/card/{id}` → extract `table_id` → GET `/api/table/{id}`
    → extract `name`. Key tables in this project:

    | Card | table_id | SQL Table |
    |------|----------|-----------|
    | #776 Orders | 930 | `reports__flat_file_all_orders_data_by_order_date_general_hourly_main` |
    | #742 Settlement | 927 | `v_settlement_new` |
    | #733 Returns | 748 | `reports__customer_returns_data_main` |
11. **Querying a card/model as a source via `/api/dataset` (MBQL).** To run a
    saved card's result with your own filter/aggregation without re-pasting its
    SQL, POST `/api/dataset` with `{"database":4,"type":"query","query":{\
    "source-card":<id>, "filter":..., "aggregation":..., "breakout":...}}`.
    Field refs must be full clauses: `["field","sku",{"base-type":"type/Text"}]`.
    Quirks observed (2026-06):
    - **`=` filter on text fields of a source-card sometimes returns 0 rows**
      even when the value exists (e.g. `["=","sku","QS001-T-ST-DG"]` on #806
      returned empty, while `["contains",...,"QS001-T-ST-DG"]` returned the
      row). Prefer `contains` + client-side exact match, or filter via the
      card's own parameters.
    - **`fields` projection is ignored** when querying a source-card — all
      result columns come back regardless. Don't rely on it to cut payload.
    - **`result_metadata` can lag the live SQL.** A model's cached field list
      may include columns the current query no longer SELECTs (e.g. #928 lists
      `unallocated_platform_cost_remainder_usd` in docs, but the live native
      query does not output it). Trust the live `dataset_query.native`, not the
      cached metadata, for correctness questions.

12. **Python 3.9 system SSL can't reach this Metabase.** `urllib`/`requests` on
    the macOS system python3.9 fails with `TLSV1_ALERT_PROTOCOL_VERSION`.
    `curl` (its own SSL stack) works fine. For scripted API calls, shell out to
    `curl` and parse the JSON with python, rather than using python's HTTP
    client directly.

13. **Native SQL referencing another card — use the short `{{#<id>}}` form.**
    The slug form `{{#904-sold-operating-performance-source}}` (id + slugified
    English name) works for cards that have one, but a card with a non-ASCII
    name (e.g. #928 `按SKU全摊薄已售经营表现底表`) has no reliable slug —
    guessing it produces a saved card that silently returns 0 rows (no error,
    empty `result_metadata`). The short form `{{#928}}` (id only) always works
    and is documented-legal. Template-tag entry: `{"name":"#928","type":"card",
    "id":"#928","card-id":928}`. Verify a newly created native card with
    `POST /api/card/{id}/query` — if it returns 0 rows / empty cols, the
    reference slug is wrong.

14. **`PUT /api/dashboard/{id}/cards` REPLACES all dashcards (not append).**
    Sending only the new dashcard deletes every existing one. To add a card,
    send the full array: existing dashcards with their real `id` + the new one
    with `id: -1`. New dashcard needs `id` as an integer (use `-1`); `null` is
    rejected with `{"errors":{"cards":{"id":"integer"}}}`. The dedicated
    `POST /api/dashboard/{id}/dashcards` endpoint does NOT exist on this
    instance ("API endpoint does not exist.") — `/cards` is the only path.

15. **Dashboard parameter values need an `id` key.** When calling
    `POST /api/dashboard/{dash-id}/dashcard/{dc-id}/card/{card-id}/query` with
    filters, each parameter object must include the dashboard parameter's `id`
    (e.g. `{"id":"f50ef8d1","type":"string/contains","target":...,"value":...}`)
    — omitting it gives `{"errors":{"parameters":{"id":"value must be a
    non-blank string."}}}`. This dashboard-query path is also the reliable way
    to test a `string/contains` SKU filter: the same filter via ad-hoc
    `POST /api/dataset` with `parameters` returns 0 rows (the ad-hoc path
    doesn't resolve dashboard parameter mappings the same way — related to
    gotcha #11). Trust the dashboard dashcard query endpoint for filter
    validation, not ad-hoc `/api/dataset`.

16. **Never leave an empty `filters: []` array in a card's dataset_query.** When
    you clone a card's query and strip a filter (e.g. removing the整店 sku
    exclusion), deleting all filter entries leaves `filters: []`. A saved card
    with `filters: []` returns **0 rows / empty `result_metadata` / empty cols**
    on `POST /api/card/{id}/query` — silently, no error. The query runs fine
    via ad-hoc `/api/dataset` and via a hand-built equivalent, so this looks
    like a source-card or uuid problem and wastes hours. Fix: `delete` the
    `filters` key entirely (don't set it to `[]`). Cards that keep a real
    filter (e.g. a `date >=` clause) are unaffected — only the empty array
    poisons the card. Symptom signature: `result_metadata` is `None`/empty
    right after PUT, and card/query returns `{"data":{"rows":[],"cols":[]}}`.

17. **Multiple new dashcards in one `PUT /dashboard/{id}/cards` need unique
    negative ids.** Each new dashcard in the `cards` array uses `id: -1` to
    signal "create". Sending two entries with `id: -1` silently drops all but
    one (the PUT returns the existing cards + only one new one). Use distinct
    negative ids (`-1`, `-2`, `-3`, ...) per new dashcard. Existing dashcards
    must keep their real positive `id`. Re-send the FULL array every time —
    the endpoint replaces (see gotcha #14), so omitting an existing dashcard
    deletes it.

18. **Multi-stage MBQL queries: field references live in EVERY stage, not just
    stage 0.** When cloning a card's `dataset_query` and remapping field names
    (e.g. `net_profit_usd` → `fully_loaded_net_profit_usd`), walk the ENTIRE
    `stages` array, not just `stages[0]`. A two-stage query typically defines
    expressions in stage 0 and does `breakout` + `aggregation` (referencing
    raw source fields again) in stage 1 — stage 1's field refs are easy to miss
    because they look like aggregation clauses. Symptom: the by-SKU card runs
    and returns data, but uses the wrong (订单级) field silently — only visible
    by inspecting `dataset_query.stages[*]` field refs or the UI's Summarize
    panel. The gen changes-summary does NOT catch this (fieldCount is
    unchanged) — verify field refs explicitly after cloning multi-stage cards.

19. **Gen changes-summary is fieldCount-based, not field-ref-based.** The diff
    detects when a card's field COUNT changes, not when a field REFERENCE
    changes (e.g. `net_profit_usd` → `fully_loaded_net_profit_usd` keeps the
    same count). After remapping fields in a card, the summary shows nothing —
    you must verify the change by reading the card's `dataset_query` directly,
    not by trusting "Changes: none".

# Metabase API Guide

Hand-written reference for interacting with the Metabase REST API. The generated
docs in `docs/` are the _output_ of these API calls — this guide is
about _how_ to call the API effectively.

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

| Endpoint                | Safe Concurrency | Notes                                                 |
| ----------------------- | ---------------- | ----------------------------------------------------- |
| `/api/card/{id}`        | 8                | Bottleneck endpoint. 226 cards ≈ 30s at concurrency=8 |
| `/api/dashboard/{id}`   | 5                | Less data per request but still IO-bound              |
| `/api/collection`       | 1                | Single call, near-instant                             |
| `/api/card` (list)      | 1                | Single call, ~1-2s for 200+ cards                     |
| `/api/dashboard` (list) | 1                | Single call, near-instant                             |

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

**Gotcha — aggregation array order ≠ `sum_N` naming (#37):** When a stage has
multiple aggregations, Metabase auto-names them `sum`, `sum_2`, `sum_3`, … but the
`sum_N` assignment does **not** track the `aggregation[]` array index. To find which
array element produces a given `sum_N`, match on `result_metadata[].display_name`
(e.g. `"Sum of Wps Production - Sku → In Stock"`) plus the field-ref's `join-alias` —
not the array position. Editing `aggregation[7]` believing it is `sum_8` will silently
mutate a different column.

## Common Workflows

### 1. Fetch all cards with full metadata

```typescript
// 1. Get flat list (fast, no field metadata)
const cards = await apiGet<CardSummary[]>("/card");

// 2. Fetch each card individually for result_metadata
const detailed = await mapWithConcurrency(cards, 8, (card) => apiGet<CardSummary>(`/card/${card.id}`));
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

| Scenario                   | Use                                                                     |
| -------------------------- | ----------------------------------------------------------------------- |
| Find a card by name        | API `/api/search` first (zero local tokens); fall back to `_catalog.md` |
| Browse all cards by domain | `_catalog.md` or `domains/{domain}.md`                                  |
| Get a card's fields        | `cards/{id}.md` (pre-generated)                                         |
| Trace dependencies         | `_deps.json` (pre-computed)                                             |
| Check if docs are stale    | API `/api/card` → compare count with `_index.json` summary              |
| Real-time data query       | API only (docs are metadata-only, no raw data)                          |
| Explore database schema    | API `/api/database/{id}/metadata`                                       |
| Build a new MBQL query     | API `/api/table/{id}/query_metadata` for field metadata                 |

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

### Run a saved card as-is (for verification)

```
POST /api/card/{id}/query
Content-Type: application/json
{}
```

Runs the card's saved `dataset_query` unchanged — returns the same `{"data":{"rows","cols"}}`
shape as `/api/dataset`. **Use this when verifying what a card actually outputs** (e.g.
checking a computed field against its source): no need to rebuild or hand-filter the
MBQL5 `dataset_query`. Fetch the full result, then filter rows client-side by SKU/field.

Trade-off vs `POST /api/dataset`: running the saved card can't take an ad-hoc filter, so
you pay to transfer all rows. Fine for table models (~hundreds of rows); for huge cards,
inject a filter into the stage's `filters` and send via `/api/dataset` instead.

### Dry-run a modified dataset_query before PUT (#38)

Before `PUT /api/card/{id}` with a hand-edited `dataset_query`, validate it ad-hoc:

```
POST /api/dataset
Content-Type: application/json
<body = the full modified dataset_query object>
```

Same `{data:{rows,cols}}` shape as running a saved card. Confirm only the intended
columns changed and the row count is stable, **then** `PUT /api/card/{id}` with
`{"dataset_query": <modified>}`. Catches MBQL5 field-ref / `lib/uuid` / `join-alias`
mistakes before they land on a card that downstream cards depend on. Also lets you
A/B old vs new output side-by-side (run the saved card via the endpoint above for the
"before", this one for the "after").

## Building an MBQL5 card (dataset_query syntax rules)

A saved card's `dataset_query` is **MBQL5** (opts-first field refs, `stages` array).
This section consolidates the syntax rules for hand-building one via API. Every
rule below was verified against this instance (Metabase 0.62).

### Top-level + stage0 skeleton

```json
{
  "database": <db>,
  "lib/type": "mbql/query",
  "stages": [{
    "lib/type": "mbql.stage/mbql",
    "lib/uuid": "<uuid4>",
    "source-card": <id>,            // or "source-table": <id> for a raw table
    "breakout": [...], "aggregation": [...], "joins": [...],
    "filters": [...], "expressions": [...], "fields": [...]
  }]
}
```

Top-level has only `database`, `lib/type`, `stages` — no `type`/`query`/`lib/version`.

### field ref — two shapes, position-dependent (gotcha #31)

- **inside `dataset_query`** → MBQL5 **opts-first**:
  `["field", {"base-type":"type/Text","lib/uuid":"<uuid>","effective-type":"type/Text"?,"join-alias":"<alias>"?}, "<name>"]`
- **inside `parameters[].target` and dashboard `parameter_mappings[].target`** → MBQL4 **name-first**:
  `["field", "<name>" | <field-id>, {"base-type":"type/Text","join-alias":"<alias>"?}]`
- Mixing throws `"Attempted to normalize an MBQL 5 :field clause as MBQL 4"`.

### breakout (group-by)

`[["field",{opts},"sku"], ["field",{opts},"scope"]]` — list of field refs; rows
collapse to one per distinct combo.

### aggregation

- Simple: `["sum"|"max"|"min"|"count", {"lib/uuid":"<uuid>","name":"<col-name>","display-name":"<col-name>"}, ["field",{opts},"<col>"]]`
- Custom expression (e.g. `inbound = max(shipped)+max(receiving)`):
  `["+", {"lib/uuid":"<uuid>","name":"<col-name>","display-name":"<col-name>"}, ["max",{"lib/uuid":"<uuid>"}, field1], ["max",{"lib/uuid":"<uuid>"}, field2]]`
- Reference another aggregation in the same stage by its uuid:
  `["aggregation", {"base-type":"...","lib/uuid":"<uuid>"}, "<agg-uuid>"]` (e.g. `sales_per_day = sum/30`)
- A joined field inside aggregation needs `"join-alias":"<alias>"` in its opts.

### joins

```json
{
  "lib/type":"mbql/join",
  "stages":[{"lib/type":"mbql.stage/mbql","lib/uuid":"<uuid>","source-card":<id>,
             "filters":[...optional, see below]}],
  "alias":"<alias>", "strategy":"left-join",
  "conditions":[["=",{"lib/uuid":"<uuid>"}, <base-field>, <join-field>]],
  "lib/options":{"lib/uuid":"<uuid>"}
}
```

- A join field ref carries `"join-alias":"<alias>"`.
- **filter placement decides unmatched-row survival (gotcha #35)**: a filter on a
  left-joined field at the TOP level runs after the join → drops unmatched rows
  (left-join becomes inner). To keep unmatched rows (e.g. "all SKUs incl.
  0-sales" when filtering orders by date), put the filter INSIDE the join's own
  `stages[0].filters` (filters the source-card before joining).

### filters

- `["!=", {lib/uuid}, field, ""]` — non-empty
- `["not", {lib/uuid}, ["contains", {lib/uuid}, field, "substr"]]`
- `["time-interval", {lib/uuid,"include-current":false}, field, -30, "day"]`
- `["between", {lib/uuid}, field, "2026-06-03", "2026-07-03"]`
- `["not-in", {lib/uuid}, field, "v1","v2",...]`

### expressions (non-aggregation context, gotcha #33)

`["coalesce", {"lib/expression-name":"<name>","lib/uuid":"<uuid>","effective-type":"type/Integer"}, [field], 0]`
— referenced in `fields` as `["expression",{"base-type":"...","lib/uuid":"<uuid>"},"<name>"]`.

### uuid rule (gotcha #24 / #33)

EVERY node (field ref opts, operator opts, expression opts, join stage, every
aggregation) gets its own FRESH `uuid4`. Reusing one → `Invalid query: Duplicate
:lib/uuid`. Use a small script (`uuid.uuid4()` per node) — don't hand-write.

### parameters — card-level vs dashboard (gotcha #36, 0.62 key)

Card-level dimension parameter (target `["dimension",...]`):
```json
{"id":"<uuid>","type":"date/range"|"string/="|"number/=",
 "target":["dimension",["field","<name>"|<id>,{"base-type":"...","join-alias":"...?"}],{"stage-number":0}],
 "name":"<name>","slug":"slug","default":"past30days"?,"section":"date"|"string","isMultiSelect":bool?}
```
⚠️ **In Metabase 0.62 a MBQL card's OWN dimension parameter crashes UI
visualization** ("We're experiencing server issues" / API:
`"Invalid parameter: Card N does not have a template tag named nil"`). Query-builder
component previews work; only running the full card fails. Template-tag
parameters (native SQL) and dashboard-path queries are unaffected.
**Workaround: don't put dimension params on the card — host on a dashboard and
use DASHBOARD params + `parameter_mappings`** (same MBQL4 name-first target).
Verify via `POST /api/dashboard/{did}/dashcard/{dc}/card/{cid}/query` with
`{"parameters":[{"id":"<dash-param-id>","type":"...","value":"..."}]}`.

### create + verify

`POST /api/card` payload:
```json
{"name":"...", "display":"table", "type":"question"|"model",
 "query_type":"query", "collection_id":<id>,     // MANDATORY (gotcha #34)
 "dataset_query":{...}, "parameters":[...], "visualization_settings":{}}
```
- Omitting `collection_id` → 403 "You don't have permissions" (API key has no
  personal-collection write). Always pass a writable collection_id.
- Verify query (no params): `POST /api/card/{id}/query -d '{}'`.
- Verify with params: use the dashboard path above (card-path dim params fail in 0.62).
- Promote to model: `PUT {"type":"model"}` + `result_metadata` for display names (gotcha #29).

## Gotchas

1. **List vs detail mismatch.** `/api/card` list doesn't include fields.
   Always fetch detail (`/api/card/{id}`) if you need `result_metadata`.

2. **Deleted cards may still appear.** Cards deleted during a bulk fetch can
   return 404 on detail. Handle individually, don't abort the whole batch.

3. **Archived cards are included by default.** The list endpoint returns archived
   cards. Filter `archived: true` if you need only active ones.

4. **Personal collections.** Cards in personal collections may reference
   tables/models that get deleted, leaving orphaned cards. These show up with
   `is_personal: true` on the collection.

5. **Native SQL cards lack field metadata.** Even from the detail endpoint,
   native SQL cards may have empty `result_metadata` because Metabase can't
   introspect raw SQL. These cards will have empty field lists in the docs.

6. **`query_type` is reliable for questions but not models.** Models may have
   `query_type: null` even when they use native SQL. Use the fallback detection
   (scan for `mbql.stage/native` in `dataset_query`).

7. **Self-referencing dependencies.** A card can reference itself (circular).
   The dependency depth calculation needs cycle detection to avoid infinite
   recursion.

8. **API key permissions.** The API key inherits the creating user's permissions.
   If you can't see certain cards/collections, check the key's group membership
   in Admin → Permissions.

9. **Base URL already includes `/api`.** If your `.env` base URL is
   `https://metabase.example.com/api`, appending `/api/card/...` creates
   `/api/api/...` which returns `"API endpoint does not exist."` Endpoint
   paths are relative: `{base}/card/{id}`, not `{base}/api/card/{id}`.

10. **Card detail doesn't expose source table.** To find the underlying DB table
    for a card: GET `/api/card/{id}` → extract `table_id` → GET `/api/table/{id}`
    → extract `name`. Native SQL cards may not have a `table_id` if they reference
    other cards rather than physical tables.

11. **Querying a card/model as a source via `/api/dataset` (MBQL).** To run a
    saved card's result with your own filter/aggregation without re-pasting its
    SQL, POST `/api/dataset` with
    `{"database":<db>,"type":"query","query":{"source-card":<id>, "filter":..., "aggregation":..., "breakout":...}}`.
    Field refs must be full clauses: `["field","sku",{"base-type":"type/Text"}]`.
    Quirks observed:
    - **`=` filter on text fields of a source-card sometimes returns 0 rows**
      even when the value exists. Prefer `contains` + client-side exact match,
      or filter via the card's own parameters.
    - **`fields` projection is ignored** when querying a source-card — all
      result columns come back regardless. Don't rely on it to cut payload.
    - **`result_metadata` can lag the live SQL.** A model's cached field list
      may include columns the current query no longer SELECTs. Trust the live
      `dataset_query.native`, not the cached metadata, for correctness questions.

12. **Python 3.9 system SSL can't reach some Metabase instances.** `urllib`/
    `requests` on the macOS system python3.9 may fail with
    `TLSV1_ALERT_PROTOCOL_VERSION`. `curl` (its own SSL stack) works fine. For
    scripted API calls, shell out to `curl` and parse the JSON with python,
    rather than using python's HTTP client directly.

13. **Native SQL referencing another card — use the short `{{#<id>}}` form.**
    The slug form `{{#<id>-slugified-name}}` works for cards with an ASCII name,
    but a card with a non-ASCII name has no reliable slug — guessing it produces
    a saved card that silently returns 0 rows (no error, empty
    `result_metadata`). The short form `{{#<id>}}` (id only) always works and
    is documented-legal. Template-tag entry:
    `{"name":"#<id>","type":"card","id":"#<id>","card-id":<id>}`. Verify a newly
    created native card with `POST /api/card/{id}/query` — if it returns 0 rows
    / empty cols, the reference slug is wrong.

14. **`PUT /api/dashboard/{id}/cards` REPLACES all dashcards (not append).**
    Sending only the new dashcard deletes every existing one. To add a card,
    send the full array: existing dashcards with their real `id` + the new one
    with `id: -1`. New dashcard needs `id` as an integer (use `-1`); `null` is
    rejected. The dedicated `POST /api/dashboard/{id}/dashcards` endpoint does
    NOT exist on some instances — `/cards` is the only path.

15. **Dashboard parameter values need an `id` key.** When calling
    `POST /api/dashboard/{dash-id}/dashcard/{dc-id}/card/{card-id}/query` with
    filters, each parameter object must include the dashboard parameter's `id`
    — omitting it gives `{"errors":{"parameters":{"id":"value must be a
    non-blank string."}}}`. This dashboard-query path is also the reliable way
    to test a `string/contains` filter: the same filter via ad-hoc
    `POST /api/dataset` with `parameters` returns 0 rows (the ad-hoc path
    doesn't resolve dashboard parameter mappings the same way).

16. **Never leave an empty `filters: []` array in a card's dataset_query.** When
    you clone a card's query and strip a filter, deleting all filter entries
    leaves `filters: []`. A saved card with `filters: []` returns **0 rows /
    empty `result_metadata` / empty cols** on `POST /api/card/{id}/query` —
    silently, no error. The query runs fine via ad-hoc `/api/dataset` and via a
    hand-built equivalent. Fix: `delete` the `filters` key entirely (don't set
    it to `[]`). Cards that keep a real filter are unaffected — only the empty
    array poisons the card. Symptom signature: `result_metadata` is `None`/empty
    right after PUT, and card/query returns `{"data":{"rows":[],"cols":[]}}`.

17. **Multiple new dashcards in one `PUT /dashboard/{id}/cards` need unique
    negative ids.** Each new dashcard in the `cards` array uses `id: -1` to
    signal "create". Sending two entries with `id: -1` silently drops all but
    one. Use distinct negative ids (`-1`, `-2`, `-3`, ...) per new dashcard.
    Existing dashcards must keep their real positive `id`. Re-send the FULL
    array every time — the endpoint replaces (see #14).

18. **Multi-stage MBQL queries: field references live in EVERY stage, not just
    stage 0.** When cloning a card's `dataset_query` and remapping field names,
    walk the ENTIRE `stages` array, not just `stages[0]`. A two-stage query
    typically defines expressions in stage 0 and does `breakout` + `aggregation`
    (referencing raw source fields again) in stage 1 — stage 1's field refs are
    easy to miss because they look like aggregation clauses. Symptom: the card
    runs and returns data, but uses the wrong field silently. The gen
    changes-summary does NOT catch this (fieldCount is unchanged) — verify field
    refs explicitly after cloning multi-stage cards.

19. **Gen changes-summary is fieldCount-based, not field-ref-based.** The diff
    detects when a card's field COUNT changes, not when a field REFERENCE
    changes. After remapping fields in a card, the summary shows nothing — you
    must verify the change by reading the card's `dataset_query` directly, not
    by trusting "Changes: none".

20. **`order-by` missing `lib/uuid` + `lib/source-name` BREAKS card save
    (masks as 403).** A hand-built MBQL `order-by` clause like
    `["desc", ["aggregation", 0]]` fails to save with a 403 — even though the
    API key's user is `is_superuser: true`. The 403 is a red herring: the query
    fails validation and Metabase reports it as a permissions error. When the
    Metabase UI saves a sort, it emits the FULL form with `lib/uuid` on every
    node. **Practical fix: create the card WITHOUT `order-by` (succeeds
    cleanly), then set the sort in the Metabase UI — the UI emits the correct
    full clause.** A PUT that keeps a UI-generated order-by works fine; only
    hand-built incomplete ones fail.

21. **Dashcard field names are `size_x`/`size_y` (snake_case), not camelCase.**
    Sending `sizeX`/`sizeY` silently produces a card with default/zero size.
    Other required dashcard fields: `id` (use `-1` for new — see #17),
    `card_id`, `dashboard_id`, `row`, `col`, `visualization_settings` (map, not
    null), `parameter_mappings` (array; each mapping needs `parameter_id`
    matching a dashboard param's `id`, `card_id`, and `target` =
    `["dimension",["field","<fieldname>",{"base-type":"..."}],{"stage-number":0}]`).

22. **PUT /api/card with a `native` SQL change: edit the SQL string in the
    payload's `dataset_query.stages[0].native` directly.** A subtle trap: if you
    save the original card JSON to a file, edit the SQL in a *separate* `.sql`
    file, then rebuild the PUT payload by loading the *original* JSON, your
    edits are silently lost — the PUT succeeds (200 + id) but the response
    `native` still has the OLD SQL, and the live card is unchanged. Always
    rebuild the payload from the edited SQL file
    (`payload['dataset_query']['stages'][0]['native'] = open(edited.sql).read()`),
    and assert `'your_new_token' in response_native` before trusting the save.
    Symptom: PUT returns 200 but `{{#card}}` ref still errors "column does not
    exist".

23. **Adding a category to an MBQL pivot card: deep-copy an existing category's
    clause across EVERY stage.** MBQL pivot cards (month×category matrix,
    cumulative, etc.) cannot be edited as text. To add a category
    programmatically: deep-copy an existing category's component (stage0 `case`
    expression + stage1 `sum` aggregation + stage1 MoM/cumulative aggregation if
    present), then recursively regenerate every `lib/uuid`→new uuids, rewrite
    `lib/source-name`/`name`/`display-name`→new category name, and the CASE
    condition value. Insert right after the original sibling to keep display
    order. This works because you're cloning a valid clause with all required
    `lib/uuid`/`lib/source-name` fields — hand-building from scratch fails (see
    #20). Watch for:
    - **MoM/cumulative aggs reference the sum by UUID string**
      (`["aggregation",{opts},"<sum-uuid>"]`, not by index) — after cloning the
      sum and regenerating its `lib/uuid`, you MUST capture that new uuid and
      rewrite the MoM's reference string to point at it.
    - **Cumulative cards with `other = total - sum(known)` residual:** the new
      category is already in `total` (via net_profit), so it silently lands in
      "Other" until you ALSO add it to the `known` sum (then Other shrinks by
      exactly the new amount, total unchanged).
    - **Insert order to avoid index shift:** insert later-position clauses (MoM)
      before earlier-position ones (sum), or recompute positions after each
      insert.

24. **Editing an MBQL `case` expression: predicate and value must be INDEPENDENT
    subtrees with fresh `lib/uuid`s — never share a node.** A `case` arm is
    `[predicate, value]`. The original often has predicate and value as two
    SEPARATE but structurally-identical subtrees (e.g.
    `case when (x) > 0 then (x) else 0`). When you modify the value (e.g.
    subtract a new field: `(x - y)`), you MUST also update the predicate to the
    same new expression if the intent is `max(0, ...)` — otherwise the
    predicate fires on the OLD condition `(x)>0` while the value is the NEW
    expression `(x-y)`, and the result goes NEGATIVE. AND: build predicate and
    value as two separate trees, each with its OWN fresh `lib/uuid` on every
    new node — reusing the same object (or deep-copying without regenerating
    uuids) makes the inner node's `lib/uuid` appear twice in the JSON, and the
    card fails with `Invalid query: Duplicate :lib/uuid #{...}`. Correct
    pattern: wrap each side independently — `wrap(pred_inner)` and
    `wrap(val_inner)` as two calls, each generating new uuids. Verify with
    `POST /api/card/{id}/query`: expect no `Duplicate :lib/uuid` error and no
    negative totals.

25. **A pivot card (`display: pivot`) that sources a changed card may error
    `Error reducing result rows: null` for reasons UNRELATED to your edit.**
    Before assuming your change broke a downstream pivot, run the pivot against
    the REVERTED upstream (re-PUT the original, query the pivot, re-PUT your
    edit) — if the pivot returns the identical error on BOTH, it's a
    pre-existing data-level issue (NULL pivot dimension / row-count), not a
    schema break. The pivot reduction error is unrelated to fields your edit
    didn't touch. Don't spend time "fixing" it as part of an unrelated card
    edit.

26. **`PUT /api/card/{id}` supports partial updates — send only
    `{"visualization_settings": {...}}` to change chart config WITHOUT touching
    `dataset_query`.** Useful when fixing a chart's series/axis layout without
    risking the underlying MBQL/SQL. Caveat: `visualization_settings` is
    replaced wholesale (not deep-merged), so GET the full card first, mutate the
    one key you need (e.g. `graph.metrics`), then PUT the entire
    `visualization_settings` object back. Backup the GET response to
    `/tmp/c{id}_backup.json` before PUT so you can restore if the new chart
    config is wrong.

27. **Searching `dataset_query` for `source-table`/`source-card` references:
    walk the parsed JSON, don't grep the string.** `json.dumps` emits `", "` and
    `": "` (space after colon/comma) by default, so a substring search like
    `'"source-table":730' in json_str` MISSES — the actual output is
    `"source-table": 730` with a space. Correct pattern: recursively walk the
    parsed JSON object, collect every `source-table` (and `source-card`) int
    value, then intersect with target ids. Same applies to `source-card`
    lookups for downstream tracing. Before declaring a table "safe to delete"
    based on a search, spot-check one known consumer via the detail endpoint.

28. **Downstream tracing must collect BOTH `source-card` (MBQL) AND `card-id`
    (native SQL template tags).** A card references another card two ways:
    - MBQL: `{"source-card": <id>}` in `dataset_query.stages[*]`
    - Native SQL: `{{#<id>}}` template tag → appears as
      `{"name":"#<id>","type":"card","card-id":<id>}` in
      `dataset_query.template_tags` (or stages' `template-tags`)
    Walking only `source-card` misses every native-SQL consumer — a single
    model can have many transitive `{{#id}}` consumers. Correct pattern:
    recursively walk the parsed `dataset_query`, collect int values under both
    `source-card` and `card-id` keys, build a reverse adjacency map, then
    BFS/DFS from the target. Same walk-JSON rule as #27 applies (no string
    grep). When evaluating table deletion impact, downstream reachability
    matters more than direct references — a table with few direct consumers can
    still break many cards via transitive `source-card`/`{{#id}}` chains.

29. **Turning a card into a model: PUT `{"type":"model"}`, NOT
    `{"type":"dataset"}`.** Metabase 49+ migrated from the old boolean
    `dataset` column to a `type` column with values `question` / `model` (more
    types like `metric` coming). PUT `{"type":"dataset"}` fails with
    `"nullable All acceptable card types"`. Use `{"type":"model"}` (or legacy
    `{"dataset":true}` for older versions). To configure model field metadata,
    PUT `{"result_metadata":[{"name":"avg","display_name":"...","base_type":"type/Decimal","semantic_type":"type/Cost"},...]}` —
    this persists on models (unlike questions where result_metadata is
    auto-generated/read-only). Changing query_type (query→native) and type
    (question→model) does NOT break `source-card` / `{{#id}}` references — only
    the output column NAMES matter.

30. **When a card shows some columns empty and others populated for one row,
    check the join key for trailing whitespace first.** Symptom: columns
    sourced directly from the base table have values, but columns sourced via
    a join are null — while other rows render fine. Diagnostic direction:
    base-table columns populated + joined columns null → the join didn't
    match. Most common cause is a trailing space on the join key in one table
    but not the other (MBQL `=` is strict equality, `'ABC123 ' != 'ABC123'`).
    Confirm with `SELECT a.id, LENGTH(a.id), b.id FROM base a LEFT JOIN other b
    ON a.id=b.id WHERE a.id ILIKE '%<keyword>%'` — `b.id` NULL and
    `LENGTH(a.id) > LENGTH(TRIM(a.id))` means whitespace. Fix at the source
    (`UPDATE ... SET id=TRIM(id)`); you can't put `TRIM()` inside an MBQL join
    condition.

31. **MBQL4 (ad-hoc `/api/dataset`) and MBQL5 (saved-card `dataset_query`)
    use OPPOSITE field-reference argument order — mixing them throws
    "Attempted to normalize an MBQL 5 :field clause as MBQL 4
    ((some-fn nil? map?) opts)".** Ad-hoc `POST /api/dataset`
    (`{"type":"query","query":{...}}`) expects **name-first**:
    `["field","name",{"base-type":"..."}]`. Saved-card
    `dataset_query.stages[*]` expects **opts-first**:
    `["field",{"base-type":"...","lib/uuid":"..."},"name"]`. The ad-hoc
    endpoint normalizes in MBQL4 mode, so an opts-first clause there fails the
    assertion. Rule: name-first for ad-hoc, opts-first for saved cards — one
    shape does not work in both.

32. **Ad-hoc `/api/dataset` cannot resolve a generic aggregation column name
    (`sum`, `avg`, `count`, …) projected from a JOINED source-card, but a
    saved MBQL5 card can.** Symptom: `column __mb_source.<name> does not
    exist`. The ad-hoc endpoint compiles the joined source-card into a SQL
    subquery whose output column alias is not the generic name, so the field
    ref can't resolve. A saved MBQL5 card resolves the same join via the lib
    layer. Practical rule: don't pre-verify a join that projects a
    generic-named aggregation column via ad-hoc `/api/dataset` — save the
    MBQL5 card and verify via `POST /api/card/{id}/query`. (To avoid the
    generic-name problem entirely, prefer joining a source whose output
    columns have explicit aliases, or aggregate inline in your own query
    instead of joining a pre-aggregated model.)

33. **MBQL5 custom expressions are a LIST (not a dict), with the column name
    inside an opts map; `coalesce` is supported for null→0 on a left-joined
    field.** Expression format: `["<op>", {"lib/expression-name":"<name>","lib/uuid":"<uuid>","effective-type":"type/..."}, <arg1>, <arg2>, ...]`.
    Reference it in `fields` as `["expression",{"base-type":"type/...","lib/uuid":"<uuid>"},"<name>"]`.
    Null→0 on a left-joined column: `["coalesce",{"lib/expression-name":"...","lib/uuid":"...","effective-type":"type/Integer"}, ["field",{"join-alias":"...","base-type":"type/Integer","lib/uuid":"..."},"<col>"], 0]`.
    Give EVERY node (expression opts, each field ref, each operator opts) its
    own FRESH `lib/uuid` — reusing one throws `Invalid query: Duplicate
    :lib/uuid` on save (see #24). A small script generating a `uuid4` per node
    is the safe way to hand-build a many-uuid MBQL5 payload.

34. **`POST /api/card` MUST include `collection_id` (an API-key-writable
    collection) — omitting it 403s "You don't have permissions to do that."**
    The API key has no personal-collection write access, so an unset
    `collection_id` defaults to a personal collection the key can't write and
    returns 403. This 403 is a permissions truth, NOT the gotcha-#20 validation
    red herring — but they're indistinguishable from the body alone. Symptom:
    every card POST 403s regardless of query complexity, while a known-good
    payload (same key, same query) POSTs fine once `collection_id` is set.
    Always pass `collection_id` explicitly when creating cards via API key.

35. **A top-level filter CAN reference a join source-card's field — but a
    filter on a LEFT-join field at stage 0 turns the join into an inner-join
    (unmatched rows dropped).** `["between",...,["field",{"join-alias":"X",...},"<col>"],...]`
    and `["time-interval",...,["field",{"join-alias":"X",...},"<date>"],-30,"day"]`
    both compile and run. But the filter is applied AFTER the join (stage 0),
    so left-joined rows with NULL in the filtered column are excluded — a
    "show all SKUs incl. 0-sales" left-join silently loses the 0-sales rows
    when you add a time filter on the joined orders table. To preserve unmatched
    rows, put the filter INSIDE the join's own `stages[0]` (filtering the
    source-card before the join), not at the top-level stage. Symptom: row
    count drops (e.g. 519 → 345) the moment a date filter is added, even though
    the base table's rows are all still expected.

36. **In Metabase 0.62, a MBQL card's OWN dimension parameter (`type:
    string/=`, `date/range`, etc. with `target:["dimension",...]`) crashes the
    card's visualization in the UI — but the SAME dimension parameter works on
    a dashboard.** Symptom: in the query builder, every join/filter/aggregation
    component's *preview* renders data fine, but clicking *Visualization* (or
    viewing the saved card) throws "We're experiencing server issues" / 500.
    Via API the failure is `"Invalid parameter: Card N does not have a template
    tag named nil."` from `validate_card_parameters`. The card-path validator
    mis-handles dimension parameters (looks for a template-tag that doesn't
    exist on MBQL cards); template-tag parameters (native SQL, target
    `["variable",["template-tag",...]]`) and dashboard-path queries are
    unaffected. **Workaround: don't put dimension parameters on the card —
    host the card on a dashboard and use DASHBOARD parameters with
    `parameter_mappings` (`target:["dimension",["field",<id-or-name>,{opts}],{"stage-number":0}]`).
    Verify via `POST /api/dashboard/{id}/dashcard/{dc}/card/{cid}/query` with
    `{"parameters":[{"id":"<dash-param-id>","type":"...","value":"..."}]}`.
    Parameter field refs use NAME-FIRST MBQL4 form (`["field","name",{opts}]`
    or `["field",<field-id>,{opts}]`) regardless of the card's dataset_query
    being MBQL5 opts-first.**

37. **When extending a `["+", opts, ...fields]` (or any operator arg list) in a
    cloned MBQL5 clause, construct the new field ref DIRECTLY rather than
    `replace_uuids(deepcopy(existing_field))` — the deepcopy form can silently
    empty the query.** Symptom: `POST /api/card/{id}/query` returns
    `cols=0, rows=0, status=completed, error=None` — no error, just empty, even
    though the PUT succeeded and the field name exists on the source. This
    happens when you append a `replace_uuids(deepcopy(...))`'d field ref to an
    existing `+`/`*`/`-` arg list (e.g. adding a new cost category to
    `total_cost_pct`'s numerator `["+",opts,f1,...,fN]`). Fix: build the ref
    inline — `["field", {"base-type":"type/Decimal","effective-type":"type/Decimal","lib/uuid":<new-uuid>}, "<name>"]`.
    The directly-constructed form always validates; the deepcopy+replace form is
    fragile for field refs appended to operator arg lists. Always verify after
    PUT with a query returning `rows>0` — `cols=0/rows=0/status=completed` is
    this bug, not an empty data set. (Cloning+replace_uuids still works fine for
    whole clauses like `case` expressions and `sum` aggregations — the trap is
    specific to appending a single field ref onto an existing operator's arg
    list.)

38. **Native SQL field-filter (dimension) template-tags do NOT work on a
    `{{#<id>}}` card-reference column.** Symptom: `POST /api/card/{id}/query`
    fails with `operator does not exist: integer = character varying` (or a
    wrong-field comparison) - Metabase resolves the dimension target to the
    wrong field when the FROM source is a card ref instead of a physical table.
    `{{#id}}` itself works for pulling data; it's field filters *on its columns*
    that break. **Use the raw underlying physical table as the FROM source when
    you need a field-filterable native SQL card.** Reserve `{{#id}}` for native
    cards that don't need field filters on the ref's columns.

39. **Metabase field filters compile to TABLE-NAME-qualified conditions
    (`<table>.<col> = 'value'`), so aliasing the source table breaks the query.**
    `FROM <table> AS o ... AND {{field_filter}}` fails with `invalid reference to
    FROM-clause entry for table "<table>" ... Perhaps you meant to reference the
    table alias "o"` - Postgres forbids mixing the alias with the full table name
    the field filter emits. **Don't alias the source table in native SQL that uses
    `{{field_filter}}`;** qualify its columns with the full table name (or leave
    them unqualified where unambiguous). The JOIN partner table can still be
    aliased. (This forces verbose `<long_table_name>.sku` in JOIN conditions -
    unavoidable when joining a field-filtered source.)

40. **Field-filter (dimension) parameter values passed via
    `POST /api/card/{id}/query` must be ARRAYS, not bare strings.**
    `"parameters":[{"id":"<id>","type":"string/=","value":"DH"}]` returns 400
    `Invalid values provided for operator: :string/=`; use
    `"value":["DH"]`. To leave a field filter unset (return all rows), simply
    omit it from the `parameters` array - an unset field filter substitutes a
    true condition, so the card runs fine with `{}`.

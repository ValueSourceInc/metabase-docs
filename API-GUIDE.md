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

20. **`order-by` missing `lib/uuid` + `lib/source-name` BREAKS card save
    (masks as 403).** A hand-built MBQL `order-by` clause like
    `["desc", ["aggregation", 0]]` fails to save with `{"via":[{"message":"You
    cannot save this Question because you do not have permissions to run its
    query."}], "status-code":403}` — even though the API key's user is
    `is_superuser: true`. The 403 is a red herring: the query fails validation
    and Metabase reports it as a permissions error. The real cause is an
    incomplete order-by clause. When the Metabase UI saves a sort, it emits the
    FULL form: `["desc", {"lib/uuid":"<uuid>"}, ["aggregation",
    {"effective-type":"type/Decimal","base-type":"type/Decimal","lib/uuid":"<uuid>",
    "lib/source-name":"net_profit_usd"}, "<agg-lib-uuid>"]]` — the direction
    tuple needs a `lib/uuid` map as its 2nd element, and the aggregation ref
    needs `lib/uuid` + `lib/source-name` + the aggregation's own lib/uuid as a
    string. Hand-rolling all these UUIDs is error-prone. **Practical fix:
    create the card WITHOUT `order-by` (succeeds cleanly), then set the sort in
    the Metabase UI — the UI emits the correct full clause.** A PUT that keeps
    the UI-generated order-by works fine; only hand-built incomplete ones fail.
    Symptom signature: 403 with hand-built order-by, 200 + new id without it.
    (2026-06, building #940/#941.)

21. **Dashcard field names are `size_x`/`size_y` (snake_case), not camelCase.**
    When building the `cards` array for `PUT /api/dashboard/{id}/cards`, the
    size fields are `size_x` and `size_y` (snake_case). Sending `sizeX`/`sizeY`
    silently produces a card with default/zero size. Other required dashcard
    fields: `id` (use `-1` for new — see gotcha #17), `card_id`, `dashboard_id`,
    `row`, `col`, `visualization_settings` (map, not null), `parameter_mappings`
    (array; each mapping needs `parameter_id` matching a dashboard param's `id`,
    `card_id`, and `target` = `["dimension",["field","<fieldname>",{"base-type":"..."}],{"stage-number":0}]`).
    Re-send the FULL array every PUT (gotcha #14: it replaces). (2026-06, adding
    #940 to dashboard #70.)

22. **PUT /api/card with a `native` SQL change: edit the SQL string in the
    payload's `dataset_query.stages[0].native` directly.** A subtle trap: if you
    save the original card JSON to a file, edit the SQL in a *separate* `.sql`
    file, then rebuild the PUT payload by loading the *original* JSON, your edits
    are silently lost — the PUT succeeds (200 + id) but the response `native`
    still has the OLD SQL, and the live card is unchanged. Always rebuild the
    payload from the edited SQL file (`payload['dataset_query']['stages'][0]['native']
    = open(edited.sql).read()`), and assert `'your_new_token' in response_native`
    before trusting the save. Symptom: PUT returns 200 but `{{#card}}` ref still
    errors "column does not exist". (2026-06, #904 gif column.)

23. **Settlement `#742` (v_settlement_new) has FOUR categories, not two.** The
    `category` field is `revenue` / `cost` / `other` / `platform`. Cards that
    whitelist `WHERE category IN ('revenue','cost')` (e.g. #904 order_settlement)
    silently drop the entire `platform` and `other` categories. Key platform
    sub_categories and their gotchas:
    - `platform/advertising_cost` (-$193k, all order-id NULL) is the settlement
      raw ad ledger; it is NOT the same as `allocated_ad_cost_usd` (-$179k,
      pre-allocated onto `revenue/product_sales` rows from a separate ads table).
      They are two independent lines with ZERO row overlap. #904 correctly uses
      `allocated_ad_cost_usd` and excludes `advertising_cost` (avoids double
      count). The ~$14k gap is an ads-allocation coverage issue, not a dup.
    - `platform/global_inbound_transportation_fees` (AGL cross-border inbound
      freight, ~-$7k, **sku is EMPTY on all rows** — the `order-id` column holds
      FBA shipment IDs like `FBA195WLFS2D`, NOT sales order IDs). Because sku is
      empty, every `WHERE sku <> ''` base table (#902/#904/#928) drops it. It
      cannot be restored via order-id→orders-table join (the FBA shipment IDs
      have no sku match in the orders table — a LEFT JOIN yields all-NULL sku;
      an aggregate `count(*) FILTER WHERE sku IS NULL` can falsely report 0 due
      to row multiplication, always verify with a row-level LEFT JOIN). Correct
      handling: pool-allocate like storage_fees, NOT row-level.
    - `other/*` (product_sales_tax, marketplace_withheld_tax, shipping_credits,
      promotional_rebates under `other`) are tax/credit lines — exclude from
      operating profit is fine.
    `#896` (Amazon Settlement Cost Breakdown) breaks out by category×sub_category
    with only a CC001 sku exclusion, so it surfaces ALL categories including
    platform — use it as the source-of-truth checklist for "what fees exist".

24. **Inbound fee allocation weights: volume, not unit count.** Two inbound
    fees in #928 pool-allocation:
    - `inbound_placement_fees`: Amazon per-unit fee, rate varies by size tier +
      weight band → per-unit cost is NOT uniform across SKUs.
    - `global_inbound_transportation_fees`: AGL freight, billed by dimensional
      (volumetric) weight.
    Both are physically driven by size/volume, so allocating by raw unit count
    (`afn-inbound-shipped-quantity`) mis-assigns large-item fees to small items.
    Correct weight = `inbound_shipped_qty × per-unit-volume` (inbound volume,
    proxy for dimensional weight), with unit-count fallback when volume is
    missing/abnormal (per-unit-volume NULL/0/≥10 affects ~36% of inbound SKUs in
    #806). Same fallback pattern as storage_weight. After switching inbound_placement
    from unit-count to volume weight, the allocated TOTAL stays conserved
    (-13142.42) but per-SKU distribution shifts (more accurate). Official basis
    confirmed via Amazon docs: placement fee "per-unit ... depends on size tier,
    weight"; AGL freight "dimensional weight". (2026-06, #928 fix4.)

25. **Adding a cost category to MBQL pivot "wide" cards requires touching EVERY
    stage, not just the SQL-less base.** Collection 130 has two parallel cost-
    structure families, and a new fee must be added to BOTH plus all their
    pivot/cumulative derivatives:
    - Long-table base: #906 (from #904, full incl. platform rows) and #933
      (from #928, SKU-allocated). Adding a category = one `WHEN` in the CASE +
      one row in the `VALUES` list. Downstream long-table consumers (#907/#908/
      #934/#936) auto-inherit — no edit needed.
    - Pivot "wide" cards (#909/#937 = month×category matrix + MoM growth;
      #905/#935 = cumulative) are MBQL, NOT native SQL. They CANNOT be edited
      as text. To add a category programmatically: deep-copy the inbound_placement
      component (stage0 `case` expr + stage1 `sum` agg + stage1 MoM `case` agg),
      then recursively rewrite `lib/uuid`→new uuids, `lib/source-name`/`name`/
      `display-name`→new category, the CASE condition value, AND the MoM agg's
      sum-reference uuid string (`["aggregation",{opts},"<sum-uuid>"]` — MoM
      references the sum by UUID, not index, so inserting a new sum does NOT
      break existing MoM refs). Insert each copy right after its inbound_placement
      sibling to keep display order. This works (no 403) because you're cloning
      a valid clause with all required `lib/uuid`/`lib/source-name` fields —
      hand-building from scratch fails (gotcha #20). (2026-06, #909/#937/#905/#935.)
    - Cumulative cards (#905/#935) have an `other_cost_adjustments = total -
      sum(known)` residual expression. A new fee already lives in `total` (via
      net_profit), so it silently lands in "Other" until you ALSO add it to the
      `known` sum (then Other shrinks by exactly the fee amount, total unchanged).
      Symptom: fee appears missing but total is correct — it's hiding in Other.
      Fix: add `<fee>_positive_usd` expr + append it to other's known-sum chain +
      add `cumulative_<fee>` cum-sum agg. (2026-06, #905/#935 gif拆出.)
    - **The 2000-row ad-hoc limit hides platform rows.** `POST /api/dataset`
      caps at 2000 rows; #904/#928/#906/#933 return ~10-20k rows. To validate a
      fee's total, wrap the card SQL in `SELECT sum(...) FROM (...) sub` (no row
      limit on aggregates), or query via `{{#card}}` ref — never trust a 2000-row
      sample sum.

26. **Removing a cost category is the reverse of #25, and breaks downstream
    harder than adding.** When a fee is duplicated (e.g. `global_inbound_
    transportation_fees` / AGL-SEND freight was ALSO recorded internally in
    `wps_pricing.avg_actual_shipment_cost`, so #904's `Shipment Cost` already
    contained it), removing it from the cost pipeline touches the same fan-out
    as adding — but in reverse, and the failure mode is louder:
    - **Native source cards first (#904/#928):** delete the CASE column from
      BOTH the `order_settlement` CTE AND the `uncovered_platform_cost` CTE
      (they're UNION'd via `SELECT *` — column count must match), AND drop the
      sub_category from the uncovered whitelist. In #928, the fee threads
      through 6+ spots: `total_<fee>` → `unk.<fee>` redistribution →
      `sku_<fee>_alloc` weight expr → `alloc_<fee>` daily expr → output column
      → BOTH residual sums (`allocated_platform_cost_usd` and
      `fully_loaded_net_profit_usd`). Miss any one and the SQL errors or the
      residual double-counts.
    - **Downstream native long-tables (#906/#933/#943):** delete the WHEN arm
      AND the matching VALUES tuple. Trivial, but they reference the deleted
      upstream column — if you forget, `column does not exist` at query time.
    - **MBQL cards (#937/#935/#949/#898) break SILENTLY then LOUDLY.** Their
      `source-card` is the native card you just changed. A `case`/`sum` that
      referenced the now-deleted column: #937/#949/#898 returned `0`/NULL
      (case found no match) — looks fine but is a dead column; #935 ERRORED
      (`column ... does not exist`) because its stage0 expression referenced
      the dropped field directly. So: after editing any native source card,
      immediately run every downstream MBQL card's query — don't assume
      "no error" means "correct", it may mean "silently zeroed".
    - **Cleanup is by name, not index.** MBQL aggregations reference each
      other by UUID (MoM growth refs the sum by `["aggregation",{opts},<uuid>]`,
      not index — see #25), so inserting/deleting a sum does NOT shift other
      refs. To remove a fee from an MBQL card: filter `aggregation`/`expressions`
      by `name`/`lib/source-name` matching the fee, then recursively strip the
      fee's field-ref sub-nodes from any `+`/`-` chain (e.g. #935's
      `other_cost_adjustments = total - sum(known)` had gif as the LAST term
      of the `known` `+`-chain; #898's `total_controllable_expense` `+`-chain
      had a `coalesce(aggregation-ref-by-uuid, 0)` for gif). After removal,
      Other/total residuals auto-rebalance (gif was in `total` via net_profit,
      so dropping it from `known` makes Other absorb it back — total unchanged,
      exactly the reverse of #25's add).
    - **Duplicate-fee detection before removal.** Don't remove on suspicion.
      Compare magnitudes per marketplace: internal `Shipment Cost` (36,175,
      US 58% / CA 42%) vs settlement `gif` (7,125, US 100% / CA 0%). If they
      were the same fee, marketplaces shares would match — CA gif=0 while
      internal CA ship≠0 proved they're NOT identical. Confirm with the
      business which internal field records the fee (`wps_pricing` =
      SEND/AGL freight) before deleting from settlement pipeline. (2026-06,
      gif removed from #904/#928/#906/#933/#943/#935/#937/#949/#898.)

27. **Editing an MBQL `case` expression: predicate and value must be
    INDEPENDENT subtrees with fresh `lib/uuid`s — never share a node.**
    A `case` arm is `[predicate, value]`. The original often has predicate
    and value as two SEPARATE but structurally-identical subtrees (e.g.
    #901 `total_need_to_produce` = `case when (us+ca-stock) > 0 then
    (us+ca-stock) else 0`, wrapped in `ceil`). When you modify the value
    (e.g. subtract a new field: `(us+ca-stock-return_ship)`), you MUST
    also update the predicate to the same new expression if the intent is
    `max(0, ...)` — otherwise the predicate fires on the OLD condition
    `(us+ca-stock)>0` while the value is the NEW expression, and the
    result goes NEGATIVE (the `case`/`ceil` does not clamp it). Symptom:
    a few rows return negative `total_need_to_produce` instead of 0.
    AND: build predicate and value as two separate trees, each with its
    OWN fresh `lib/uuid` on every new node — reusing the same Python list
    object (or deep-copying without regenerating uuids) makes the inner
    node's `lib/uuid` appear twice in the JSON, and the card fails to run
    with `Invalid query: Duplicate :lib/uuid #{...}`. Correct pattern:
    wrap each side independently — `wrap(pred_inner)` and `wrap(val_inner)`
    as two calls, each generating new uuids for the new outer `-` node and
    the new `sum_15` field-ref. Verify with `POST /api/card/{id}/query`:
    expect no `Duplicate :lib/uuid` error and no negative totals.
    (2026-06, #901 return_ship exclusion.)

28. **A pivot card (`display: pivot`) that sources a changed card may error
    `Error reducing result rows: null` for reasons UNRELATED to your edit.**
    Before assuming your change broke a downstream pivot, run the pivot
    against the REVERTED upstream (re-PUT the original, query the pivot,
    re-PUT your edit) — #931 (pivot of #873) returned the identical
    `Error reducing result rows: null` on BOTH the original and edited
    #873, because its `fields` projection + `breakout`/`aggregation`
    reference specific columns and never touch the new field. The pivot
    reduction error is a pre-existing data-level issue (NULL pivot
    dimension / row-count), not a schema break. Don't spend time "fixing"
    it as part of an unrelated card edit. (2026-06, #931 while editing #878.)

29. **`PUT /api/card/{id}` supports partial updates — send only
    `{"visualization_settings": {...}}` to change chart config WITHOUT touching
    `dataset_query`.** Useful when fixing a chart's series/axis layout without
    risking the underlying MBQL/SQL. Caveat: `visualization_settings` is replaced
    wholesale (not deep-merged), so GET the full card first, mutate the one key
    you need (e.g. `graph.metrics`), then PUT the entire `visualization_settings`
    object back. Verified pattern (2026-07, #937): the card had `graph.metrics` =
    24 fields (12 `*_usd` + 12 `*_mom_growth`) all on one left axis with Y locked
    to [-1, 4] — USD values (thousands) flew off-axis while % curves were
    squashed, and the legend mixed "Xxx USD" / "Xxx MoM %" because USD fields had
    no `series_settings` entry (legend falls back to `result_metadata.display_name`)
    while MoM% fields had `series_settings.title` set. Fix: GET → filter
    `graph.metrics` to the 12 `*_mom_growth` only → PUT `{"visualization_settings":
    full_vs}`. `dataset_query` untouched, card still runs (13 rows × 25 cols; USD
    columns remain in `result_metadata`, just not plotted). Backup the GET
    response to `/tmp/c{id}_backup.json` before PUT so you can restore if the new
    chart config is wrong.

30. **Searching `dataset_query` for `source-table`/`source-card` references:
    walk the parsed JSON, don't grep the string.** `json.dumps` emits `", "` and
    `": "` (space after colon/comma) by default, so a substring search like
    `'"source-table":730' in json_str` MISSES — the actual output is
    `"source-table": 730` with a space. This caused a real false-negative: a
    string-grep across 409 cards for wps_pricing (table_id 730) returned only
    #838 (native SQL `FROM "wps"."wps_pricing"`), silently missing two MBQL
    cards (#595, #621) that referenced table 730 via `source-table`, plus their
    downstream model #745 and card #752. Correct pattern: recursively walk the
    parsed JSON object, collect every `source-table` (and `source-card`) int
    value, then intersect with target ids. Same applies to `source-card`
    lookups for downstream tracing. Before declaring a table "safe to delete"
    based on a search, spot-check one known consumer via the detail endpoint.
    (2026-07, wps_pricing deletion impact analysis.)

31. **Downstream tracing must collect BOTH `source-card` (MBQL) AND `card-id`
    (native SQL template tags).** A card references another card two ways:
    - MBQL: `{"source-card": <id>}` in `dataset_query.stages[*]`
    - Native SQL: `{{#<id>}}` template tag → appears as
      `{"name":"#<id>","type":"card","card-id":<id>}` in
      `dataset_query.template_tags` (or stages' `template-tags`)
    Walking only `source-card` misses every native-SQL consumer. Real
    false-negative: tracing #621's downstream via `source-card` alone returned
    2 cards (#745, #752); adding `card-id` revealed **25 downstream cards**
    including 9 core models (#904/#906/#928/#933/#943/#969/#888/#893/#745) — the
    entire Finance cost/profit pipeline. Correct pattern: recursively walk the
    parsed `dataset_query`, collect int values under both `source-card` and
    `card-id` keys, build a reverse adjacency map, then BFS/DFS from the target.
    Same walk-JSON rule as gotcha #30 applies (no string grep). When evaluating
    table deletion impact, downstream reachability matters more than direct
    references — a table with 3 direct consumers can still break 28 cards via
    transitive `source-card`/`{{#id}}` chains. (2026-07, wps_pricing deletion.)

32. **Table-deletion pre-flight: the #30/#31 card search has a DB-view blind spot.**
    #30 (walk parsed JSON, don't string-grep) + #31 (collect both `source-card`
    and `card-id`) find every card that names the target table directly. They
    CANNOT see through a DB VIEW: a card querying a view that internally
    `SELECT`s from the target table shows only the view name, so it won't be
    flagged. For pre-deletion safety, also reverse-check view definitions at
    the DB level (PostgreSQL): `SELECT table_name FROM information_schema.views
    WHERE view_definition ILIKE '%<table>%'`. The Metabase API key can't run
    this — it needs a separate DB connection. (2026-07, `wps_shipment_po_map`
    deletion pre-flight: 0 direct card refs via #30/#31; view check clean.)


# Skill: Modifying Metabase Cards Safely (Query + Visualization + Verification)

Lessons from real card surgery on this Metabase instance (2026-08). Every rule
below was learned the hard way - the API accepts the change silently and the
chart quietly renders the wrong thing.

## The Core Rule

**Changing a card's `dataset_query` does NOT update its `visualization_settings`.
Metabase never re-derives chart mappings from the new query.** Any viz setting
that references a column by name (metric, dimension, slice, series) silently
dangles after the query changes, and the chart falls back to a wrong column.

Real example: replacing #784's query (old output: `sku`, `avg`) with a pooled
query (new output: `sku`, `Purchases`, `Return Quantity`, `return_rate`) left
`pie.metric: "avg"` in place. The pie then showed **return quantity** instead of
return rate - no error anywhere, just a wrong chart.

## Safe Card-Modification Workflow

When editing an existing card's query via `PUT /api/card/{id}`:

1. **Backup first**: `GET /api/card/{id}` -> save the full response to
   `/tmp/card{id}_backup.json`. This is your revert path.
2. **Dry-run the new query** before saving: `POST /api/dataset` with the new
   `dataset_query` at the top level of the body (not nested). Confirm columns
   and row counts are what you expect.
3. **PUT the query**: `PUT /api/card/{id}` with `{"dataset_query": ...}` (plus
   `description` if it changed).
4. **Re-assert `visualization_settings` in the SAME or a follow-up PUT**,
   rebuilt against the NEW query's output columns. The PUT replaces
   `visualization_settings` wholesale, so send the complete object:

   | display | Settings that reference column names |
   | --- | --- |
   | `pie` | `pie.metric` (agg column name), `pie.dimension` (breakout field names) |
   | `line` / `bar` / `row` / `area` / `combo` | `graph.metrics`, `graph.dimensions` |
   | `table` | `column_settings` keys (`["name","<col>"]`) and `table.columns` |

   Notes:
   - `pie.metric` / `graph.metrics` reference the aggregation's **`name`**
     (e.g. `"return_rate"`), not its display name.
   - Keep chart-level extras the user set (slice colors in `pie.rows`, axis
     titles, `pie.percent_visibility`) - carry them over from the backup unless
     they reference removed columns.
   - Number formatting lives in `column_settings` keyed by column name; a rate
     column stored as a fraction (0.103) needs
     `'["name","return_rate"]': {"number_style": "percent"}` to display 10.3%.
5. **Verify the saved state**: re-`GET` the card and check every viz reference
   resolves to a column the query actually outputs. Then run
   `POST /api/card/{id}/query -d '{}'` and sanity-check numbers against a
   ground truth computed independently (ad-hoc query or SQL).

A cheap audit for any card: list viz refs (`pie.metric`, `pie.dimension`,
`graph.metrics`, `graph.dimensions`, `column_settings` keys) next to the
query's actual output column names - every ref must match one of them.

## Creating New Cards

- `POST /api/card` **requires** `collection_id` (403 without it) and a
  non-null `visualization_settings` (use `{}` minimum - omitting the key gives
  400 "Value must be a map", and `display` must be set).
- Set the viz settings correctly **at creation time** with names matching the
  query's output columns - then no follow-up repair is needed.
- Verify with `POST /api/card/{id}/query -d '{}'` before declaring done.

## Return Rate Cards: The Pooled Method

How return rates must be calculated on this instance (fixed #784, #1060,
#1133 on 2026-08-26; #1001 was already the reference implementation).

**Correct: pooled ratio-of-sums at the group level**

```
return_rate = Σ(returned units) / Σ(purchased units)   -- per family/size/sku
```

- Numerator + denominator from **one shared-grain model**: the reference
  architecture is the cohort model chain
  **#1135 "Return Quantity By Order Model"** (returns aggregated per
  sku+order-id - join-safe grain) ->
  **#1134 "Purchases & Returns By SKU By Day Model"** (orders #776 excl.
  Cancelled, with their eventual returns attached via order-id, both keyed to
  sku x store x marketplace x **purchase date**).
- Rate cards (#784 by SKU, #1060 by size, #1133 by family) then source #1134
  alone, join wps_product for grouping, and compute `Σreturn_qty / Σpurchase_qty`.
  Every filter (date, store, marketplace, SKU, family) hits the model's own
  fields - numerator and denominator can never diverge.

**Wrong patterns observed:**

1. **Averaging per-SKU ratios** (`avg(return_qty/purchase_qty)` per group).
   A SKU with 3 sales and 1 return (33%) weighs as much as a 500-sale SKU at
   5%. Skews every family where volume is uneven - which is all of them.
2. **Return counting via order-id join in the rate card**: attaching returns
   to orders by `sku + amazon-order-id` and summing the joined quantity. It
   captures 100% of the returns report on this instance, but it only works at
   order grain and tempts avg-of-ratios rollups. Keep the join inside a
   model, never in the presentation card.
3. **Two-sided ratio with a date filter on one side only.** If the numerator
   model has no date grain (e.g. returns aggregated per SKU over all time)
   while the denominator is date-filtered, you get lifetime returns ÷
   windowed purchases - rates **over 100%**. Rule: a ratio card is only
   safely filterable when BOTH sides live in one model sharing the filter's
   field grain. This also applies to store/marketplace filters, not just dates.

**Join-grain traps hit while building this:**

- **Never join at row grain onto an aggregate** - each base row carries the
  joined total, so summing multiplies it. Aggregate the base to the join key
  first, or route through a pre-aggregated model.
- **Joining returns on `purchase-date = return-date` is wrong** - returns lag
  purchases, so the equality only matches returns that landed on a day the
  same SKU also sold (lost ~47% of returns in testing). Attribute returns to
  their order's purchase date via order-id instead (cohort view).
- **Cohort caveat**: a window's rate counts returns *of purchases in that
  window*, so recent windows understate the eventual rate (returns haven't
  happened yet). Lifetime views converge to the true rate.
- **Multi-line orders double-count joined aggregates**: aggregate BOTH sides
  to (sku, order-id) grain before joining, or a 2-line order × 1 return row
  counts the return twice.

**Two valid definitions - do not mix them up:**

| Source | Measures | Use for |
| --- | --- | --- |
| Returns report (#733/#1134) | physical return shipments | packaging / logistics decisions |
| Seller Economics `units_refunded` (#1093) | all refunded units incl. refunds without a return shipment | financial view |

The report-based rate runs ~2pp lower than the Seller Economics rate for the
same family (e.g. QS001-DI: 10.3% vs 12.7%). Both are correct; pick per
decision. For the packaging upgrade program use the returns-report rate.

**Time-series variants:** returns by *return date* vs purchases by *purchase
date* requires an as-of join (LATERAL) - only expressible in native SQL
(see #1001 "Overall Refund Rate Over Time by Return Date"). Purchase-cohort
views (returns attributed to the order's purchase date, #781) can stay MBQL.

## MBQL5 Gotchas Encountered While Doing This

- **Never reuse a Python object for two MBQL subtrees.** Using the same
  `["sum", {...}, field]` list in both the aggregation array and inside a
  custom expression duplicates every `lib/uuid` inside it ->
  `Invalid query: Duplicate :lib/uuid`. Build a fresh subtree (fresh uuid4 per
  node) for each usage site.
- **NULL poisons arithmetic**: `sum(case when group = X then amt end)` is NULL
  for groups with no matching rows, and `NULL + x = NULL` in SQL. Wrap every
  conditional sum in `["coalesce", {...}, <sum>, 0]` before combining.
- Aggregating a joined field at row grain **multiplies** it (each base row
  carries the joined total). Aggregate the base to the join grain first
  (e.g. per-SKU), THEN join the per-SKU model. A pre-aggregated intermediate
  **model** card joined at matching grain is the clean pattern.
- Conditional sum pattern (SQL `SUM(CASE WHEN ...)`):
  `["sum", {}, ["case", {}, [[predicate, value]]]]` - predicate and value are
  independent subtrees, no default clause.

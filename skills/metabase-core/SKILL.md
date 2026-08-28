---
name: metabase-core
description: >
  Generic, instance-agnostic skill for safely creating and modifying Metabase
  cards via the API: dataset_query + visualization_settings coupling, MBQL5
  query syntax gotchas, join-grain traps, and the full API manual
  (API-GUIDE.md, same folder). Trigger keywords: create card, modify card,
  Metabase API, MBQL, visualization settings, dashboard, PUT /api/card.
  Portable: this folder has no dependencies on any specific project - copy it
  wholesale into any project that talks to a Metabase instance.
version: 1.0.0
metadata:
  language: en
  tags: [Metabase, BI, API, MBQL, cards]
  requires:
    env: [METABASE_API_BASE_URL, METABASE_API_KEY]
    optional_env: [METABASE_DB_ID, METABASE_ALLOW_SELF_SIGNED_CERT]
---

# Modifying Metabase Cards Safely (Query + Visualization + Verification)

Lessons from real card surgery on production Metabase instances. Every rule
below was learned the hard way - the API accepts the change silently and the
chart quietly renders the wrong thing.

The full endpoint manual (auth, rate limits, ad-hoc queries, dataset_query
syntax) lives in [`API-GUIDE.md`](API-GUIDE.md) in this same folder. This
skill covers the card-surgery workflow; read API-GUIDE for everything else.

## The Core Rule

**Changing a card's `dataset_query` does NOT update its `visualization_settings`.
Metabase never re-derives chart mappings from the new query.** Any viz setting
that references a column by name (metric, dimension, slice, series) silently
dangles after the query changes, and the chart falls back to a wrong column.

Real failure mode: replacing a query whose output was `(sku, avg)` with a
pooled query outputting `(sku, purchases, returns, return_rate)` left
`pie.metric: "avg"` in place. The pie then showed the *raw count* instead of
the rate - no error anywhere, just a wrong chart.

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
   - Conditional formatting (row/cell highlight rules) lives in
     `visualization_settings["table.column_formatting"]` - see
     [`scripts/add-column-formatting.mjs`](scripts/add-column-formatting.mjs)
     for the rule schema and a ready-made tool.
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

## MBQL5 Gotchas

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
  (e.g. per-SKU), THEN join the per-entity model. A pre-aggregated intermediate
  **model** card joined at matching grain is the clean pattern.
- Conditional sum pattern (SQL `SUM(CASE WHEN ...)`):
  `["sum", {}, ["case", {}, [[predicate, value]]]]` - predicate and value are
  independent subtrees, no default clause.
- **Ratio cards (rates) must have both sides in one model.** A rate card whose
  numerator and denominator come from different models breaks under any filter
  that only one side shares - e.g. a date filter on purchases but a lifetime
  numerator gives rates **over 100%**. Build one model at the filter's grain
  (e.g. entity x day) holding both measures, then the rate card divides the
  two sums from that single source. Prefer **pooled ratio-of-sums**
  (`Σnum/Σden` per group) over `avg(per-row ratio)` - averaging small
  denominators lets a 3-row group outweigh a 500-row group.

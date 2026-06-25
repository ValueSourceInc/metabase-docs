# Metabase Knowledge Base

Generated at: 2026-06-24T10:26:56.784Z

This folder is generated from Metabase metadata. It provides navigation and business context for AI-assisted Metabase work.

## Reading Strategy (for AI)

| File | When to Read | Approx Size |
| --- | --- | --- |
| `_index.json` | **Always first** — discover cards by name, domain, type | ~50KB |
| `_deps.json` | Follow upstream/downstream dependencies | ~15KB |
| `cards/{id}.md` | Read a specific card's full field metadata | ~1KB each |
| `collections.md` | Understand collection hierarchy | ~5KB |
| `domains/{domain}.md` | Browse all cards in a domain | varies |
| `glossary.md` | Look up business terms | ~17KB |
| `cards.md` | Master table of all cards (human browsing) | ~30KB |

## Summary

- Database filter: 4
- Collections: 84
- Cards / questions / models: 219
- Active cards: 219
- Dashboards: 20

## Documents

- [_index.json](_index.json) — Compact machine-readable index
- [_deps.json](_deps.json) — Dependency graph
- [Collections](collections.md)
- [Cards and models](cards.md)
- [Individual card details](cards/_README.md)
- [Dashboards](dashboards.md)
- [Dependencies](dependencies.md)
- [Glossary](glossary.md)
- [Finance domain](domains/finance.md)
- [Inventory domain](domains/inventory.md)
- [Replenishment domain](domains/replenishment.md)
- [Production domain](domains/production.md)
- [Logistics domain](domains/logistics.md)
- [Returns domain](domains/returns.md)
- [Advertising domain](domains/advertising.md)
- [Sales domain](domains/sales.md)

## Domain Counts

| Domain | Cards |
| --- | --- |
| sales | 172 |
| finance | 86 |
| advertising | 60 |
| replenishment | 46 |
| logistics | 40 |
| production | 39 |
| returns | 29 |
| inventory | 27 |
| uncategorized | 25 |

## Highest Priority Cleanup Candidates

These cards have multiple documentation or dependency risks and are worth reviewing first.

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #318 | 关键词搜索趋势视图 | 4 | 关键词分析 | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #325 | averange_frequency&competiton | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #327 | search frequency&competion by week | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #328 | averange_frequency&competiton summary | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #330 | averange_frequency&competiton summary_1 | 4 | Cui Liu's Personal Collection | native question | sales | area |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #332 | latest_amaozn_keywords_rank | 4 | Cui Liu's Personal Collection | native question | uncategorized | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #382 | Keyword Performance Table active | 4 | Hanson Li's Personal Collection | question | advertising, sales | table | #370 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | question | advertising | table | #402 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |

## Refreshing These Docs

Run:

```bash
pnpm gen
```

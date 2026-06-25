# Metabase Knowledge Base

Generated at: 2026-06-25T03:02:29.267Z

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
- Cards / questions / models: 226
- Active cards: 226
- Dashboards: 21

## Key Source Models

Most-reused source models and table models. Changing these affects the most downstream cards and dashboards.

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877 |  | high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904, #914 |  | high reuse / change carefully; missing description |
| #853 | Exchange Rates | 4 | Base | source model | sales | table |  | #403, #411, #424, #425, #703, #704, #742, #776, #803, #805 |  | high reuse / change carefully; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #402 | List SP Campaign Model | 4 | Ads SP Models | source model | advertising | table |  | #398, #403, #703, #704 |  | generic aggregation field names; missing description |

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
| sales | 179 |
| finance | 89 |
| advertising | 62 |
| replenishment | 49 |
| logistics | 43 |
| production | 41 |
| returns | 31 |
| inventory | 28 |
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
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | model | advertising | table | #402 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
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

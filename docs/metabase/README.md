# Metabase Knowledge Base

This folder is generated from Metabase metadata. It provides navigation and business context for AI-assisted Metabase work.

## Reading Strategy (for AI)

| File | When to Read | Approx Size |
| --- | --- | --- |
| `_catalog.md` | **Always first** — one line per card; read IN FULL to discover by name/domain/collection/id | ~18KB |
| `_index.json` | Grep ONLY (don't read in full) — when you need upstream/downstream/risks for specific cards | ~126KB |
| `_deps.json` | Follow upstream/downstream dependencies — grep for card IDs | ~23KB |
| `cards/{id}.md` | Read a specific card's full field metadata | ~1KB each |
| `collections.md` | Understand collection hierarchy | ~5KB |
| `domains/{domain}.md` | ⚠️ Source models + dashboard components only. For full domain browse, grep `_catalog.md` instead (100× cheaper) | varies |
| `glossary.md` | Look up business terminology | ~1KB |
| `field-risks.md` | Cards with ambiguous aggregation field names | ~10KB |
| `cards.md` | ❌ Master table of all cards — human browsing ONLY, never read in full | ~30KB |

## Summary

- Database filter: 4
- Collections: 49
- Cards / questions / models: 184
- Active cards: 184
- Dashboards: 18

## Key Source Models

Most-reused source models and table models. Changing these affects the most downstream cards and dashboards.

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877, #920 |  | high reuse / change carefully; missing description |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789, #928 |  | high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #853 | Exchange Rates | 4 | Base | source model | sales | table |  | #403, #411, #424, #425, #703, #704, #742, #776, #803, #805 |  | high reuse / change carefully; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #904, #914 |  | high reuse / change carefully; missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912, #928 |  | high reuse / change carefully; many upstream dependencies |
| #928 | 按SKU全摊薄已售经营表现底表 | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #733, #806, #904 | #929, #932, #933, #935, #938, #939, #940 |  | high reuse / change carefully |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #402 | List SP Campaign Model | 4 | Ads SP Models | source model | advertising | table |  | #398, #403, #703, #704 |  | generic aggregation field names; missing description |

## Documents

- [_catalog.md](_catalog.md) — Compact one-line-per-card catalog (primary discovery file)
- [_index.json](_index.json) — Full machine-readable index (grep only)
- [_deps.json](_deps.json) — Dependency graph (grep for card IDs)
- [Collections](collections.md)
- [Cards and models](cards.md) — ⚠️ Human browsing only, do not read in full
- [Individual card details](cards/_README.md)
- [Dashboards](dashboards.md)
- [Dependencies](dependencies.md) — ⚠️ Human browsing only, prefer _deps.json
- [Glossary](glossary.md)
- [Field risks](field-risks.md) — Cards with ambiguous aggregation field names
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
| sales | 162 |
| finance | 85 |
| advertising | 60 |
| replenishment | 54 |
| logistics | 43 |
| production | 37 |
| returns | 31 |
| inventory | 30 |
| uncategorized | 3 |

## Highest Priority Cleanup Candidates

These cards have multiple documentation or dependency risks and are worth reviewing first.

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #318 | 关键词搜索趋势视图 | 4 | 关键词分析 | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | model | advertising | table | #402 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #568 | DH Amazon Parent SKU 销售比例 - Modified | 4 | DCMS 开发测试 | question | sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #573 | Production Cost Per SKU Pie | 4 | Production Costs | question | finance, production, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #574 | Production Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #575 | Production Unit Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |

## Refreshing These Docs

Run:

```bash
pnpm gen
```

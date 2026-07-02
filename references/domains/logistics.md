# Logistics Domain

Cards classified into this domain: 45

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #752, #888, #893 |  | generic aggregation field names; many upstream dependencies; missing description |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877, #920, #954, #958, #959, #966 |  | high reuse / change carefully; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #870, #954 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 备货发货 Forecast WOS Summary | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, returns, sales | table | #876, #877, #899, #900 | #873, #921, #960 |  | many upstream dependencies; missing description; native SQL without business description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #906, #928 |  | many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 |  |  | not referenced by dashboards or downstream cards |
| #928 | 按SKU全摊薄已售经营表现底表 | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #733, #806, #904 | #929, #932, #933, #935, #938, #939, #940, #942, #943, #969 |  | high reuse / change carefully |
| #933 | Allocated Cost Structure Source (按SKU已分摊成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #934, #936, #937 |  |  |
| #943 | Monthly Cost-to-Sales Ratio Source (月度成本占销售额比率底表) | 4 | Base | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #949 |  |  |
| #969 | Cost & Net Profit Structure Source (成本与净利润结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #948, #970, #971, #972 |  |  |
| #972 | Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表) | 4 | Finance | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |  |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #313 | Purchase Quantity Distribution by State | 4 | 前期用户画像市场分析 | dashboard component | logistics | map |  |  | 亚马逊用户肖像分布 |
| #802 | 店铺 实际销量 | 4 | Sales | dashboard component | logistics, sales | scalar | #776 |  | Store Monitor Dashboard |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Settlement & Inventory Investment (实时结算与库存投入看板） |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  | Cost (成本看板) |
| #935 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | area | #928 |  | Cost (成本看板) |
| #937 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #933 |  | Cost (成本看板) |
| #949 | Cost Pivot Table by Store & Marketplace (按店铺成本透视表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #943 |  | Cost (成本看板) |
| #972 | Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表) | 4 | Finance | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | logistics | ' _catalog.md`

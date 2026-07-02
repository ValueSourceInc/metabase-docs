# Returns Domain

Cards classified into this domain: 38

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789, #928, #961 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #752, #888, #893 |  | generic aggregation field names; many upstream dependencies; missing description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877, #928 | 补货面板 | missing description |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |  |
| #878 | 备货发货 Forecast WOS Summary | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, returns, sales | table | #876, #877, #899, #900 | #873, #921, #960 |  | many upstream dependencies; missing description; native SQL without business description |
| #901 | 工厂补货表2.0 | 4 | Inventory | table model | inventory, production, replenishment, returns, sales | table | #873 | #960 | 补货面板 | generic aggregation field names; missing description |
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
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns |
| #782 | Return Reason is Color By Product | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | #733, #776 |  | Returns |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | #733 |  | Returns |
| #788 | Returns Reason Pivot | 4 | Returns | dashboard component | returns, sales | pivot | #733 |  | Returns |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877, #928 | 补货面板 |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Settlement & Inventory Investment (实时结算与库存投入看板） |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  | Cost (成本看板) |
| #901 | 工厂补货表2.0 | 4 | Inventory | table model | inventory, production, replenishment, returns, sales | table | #873 | #960 | 补货面板 |
| #929 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, inventory, returns, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #935 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | area | #928 |  | Cost (成本看板) |
| #937 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #933 |  | Cost (成本看板) |
| #949 | Cost Pivot Table by Store & Marketplace (按店铺成本透视表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #943 |  | Cost (成本看板) |
| #961 | Return By Color By Product | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #972 | Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表) | 4 | Finance | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | returns | ' _catalog.md`

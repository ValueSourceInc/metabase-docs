# Inventory Domain

Cards classified into this domain: 30

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877, #928 | 补货面板 | missing description |
| #807 | 30 Days Sales | 4 | Inventory | table model | inventory, sales | table | #776 | #811, #877 |  | generic aggregation field names; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901, #930, #931 | 补货面板 |  |
| #876 | Wps Sales Forecast By Day | 4 | Sales Forecast | model | inventory, sales | table |  | #878, #879 |  |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873, #921 |  | many upstream dependencies; missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912, #928 |  | high reuse / change carefully; many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |
| #928 | 按SKU全摊薄已售经营表现底表 | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #733, #806, #904 | #929, #932, #933, #935 |  |  |
| #933 | Allocated Cost Structure Source (按SKU已分摊成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #934, #936, #937 |  |  |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877, #928 | 补货面板 |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Settlement & Inventory Investment (实时结算与库存投入看板） |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901, #930, #931 | 补货面板 |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  | Cost (成本看板) |
| #901 | 工厂补货表2.0 | 4 | Inventory | dashboard component | inventory, production, replenishment, sales | table | #873 |  | 补货面板 |
| #905 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #904 |  | Cost (成本看板) |
| #909 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #906 |  | Cost (成本看板) |
| #929 | Cumulative Sold Operating Performance by SKU (按SKU累计已售经营表现) | 4 | Finance | dashboard component | finance, inventory, returns, sales | line | #928 |  | Sold Contribution Profit Dashboard BY SKU (按SKU已售贡献利润看板)  |
| #935 | Cumulative Cost Structure by SKU (按SKU累计成本结构) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #928 |  | Sold Contribution Profit Dashboard BY SKU (按SKU已售贡献利润看板)  |
| #937 | Monthly Cost MoM Growth Trend by SKU (按SKU月度成本环比增幅趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #933 |  | Sold Contribution Profit Dashboard BY SKU (按SKU已售贡献利润看板)  |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | inventory | ' _catalog.md`

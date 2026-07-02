# Production Domain

Cards classified into this domain: 39

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #584 | Production Cost Over Time | 4 | Production Costs | model | finance, production, sales | table |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #752, #888, #893 |  | generic aggregation field names; many upstream dependencies; missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #870, #954 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 备货发货 Forecast WOS Summary | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, returns, sales | table | #876, #877, #899, #900 | #873, #921, #960 |  | many upstream dependencies; missing description; native SQL without business description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #901 | 工厂补货表2.0 | 4 | Inventory | table model | inventory, production, replenishment, returns, sales | table | #873 | #960 | 补货面板 | generic aggregation field names; missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #906, #928 |  | many upstream dependencies |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 |
| #782 | Return Reason is Color By Product | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Settlement & Inventory Investment (实时结算与库存投入看板） |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |
| #901 | 工厂补货表2.0 | 4 | Inventory | table model | inventory, production, replenishment, returns, sales | table | #873 | #960 | 补货面板 |
| #961 | Return By Color By Product | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | production | ' _catalog.md`

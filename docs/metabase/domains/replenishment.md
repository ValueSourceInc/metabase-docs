# Replenishment Domain

Cards classified into this domain: 48

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #904, #914 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873, #921 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #700 |  | DHM 箱单 |
| #755 | DH 船务小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #836 |  | DHM 合同 |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 |
| #837 | VS 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #835 |  | VS 箱单 |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |
| #901 | 工厂补货表2.0 | 4 | Inventory | dashboard component | inventory, production, replenishment, sales | table | #873 |  | 补货面板 |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | replenishment | ' _catalog.md`

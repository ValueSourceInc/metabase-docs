# Replenishment Domain

Cards classified into this domain: 49

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904, #914 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873 |  | many upstream dependencies; missing description; native SQL without business description |
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

## Cleanup / Review Candidates

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #594 | Shipment Finder | 4 | 运营数据 | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 | generic aggregation field names; missing description |
| #683 | Shipment Pricing Model (Old) | 4 | 订单/船务数据 (Cynthia) | native question | production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 | generic aggregation field names; missing description |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #700 |  | DHM 箱单 | generic aggregation field names; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904, #914 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #755 | DH 船务小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #836 |  | DHM 合同 | missing description |
| #756 | Shipping Cost Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #757 | Shipping Cost Sum Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | table | #585 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #783 | Return Parent ASIN Pie | 4 | Returns | question | production, replenishment, returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #792 | DH 工厂补货表 - 16 sku | 4 | DCMS 开发测试 | question | finance, inventory, production, replenishment, sales | table | #553, #554 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #811 | 补货 Fulfillable Inventory Chart | 4 | Inventory | question | finance, inventory, production, replenishment, sales | table | #776, #806, #807 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #831 | FBA Shipment 表 Imperial Unit (US) - Duplicate | 4 | todd li's Personal Collection | native question | finance, inventory, logistics, production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #837 | VS 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #835 |  | VS 箱单 | generic aggregation field names; missing description |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) | generic aggregation field names; mixed finance and inventory timing |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #885 | Shipping Cost Over Time By Sku | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #893, #902 |  | generic aggregation field names; missing description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |

## All Cards

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #594 | Shipment Finder | 4 | 运营数据 | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 | generic aggregation field names; missing description |
| #683 | Shipment Pricing Model (Old) | 4 | 订单/船务数据 (Cynthia) | native question | production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 | generic aggregation field names; missing description |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #700 |  | DHM 箱单 | generic aggregation field names; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904, #914 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #755 | DH 船务小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #836 |  | DHM 合同 | missing description |
| #756 | Shipping Cost Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #757 | Shipping Cost Sum Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | table | #585 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #783 | Return Parent ASIN Pie | 4 | Returns | question | production, replenishment, returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #792 | DH 工厂补货表 - 16 sku | 4 | DCMS 开发测试 | question | finance, inventory, production, replenishment, sales | table | #553, #554 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #811 | 补货 Fulfillable Inventory Chart | 4 | Inventory | question | finance, inventory, production, replenishment, sales | table | #776, #806, #807 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #831 | FBA Shipment 表 Imperial Unit (US) - Duplicate | 4 | todd li's Personal Collection | native question | finance, inventory, logistics, production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #837 | VS 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #835 |  | VS 箱单 | generic aggregation field names; missing description |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) | generic aggregation field names; mixed finance and inventory timing |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #885 | Shipping Cost Over Time By Sku | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #893, #902 |  | generic aggregation field names; missing description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #901 | 工厂补货表2.0 | 4 | Inventory | dashboard component | inventory, production, replenishment, sales | table | #873 |  | 补货面板 | generic aggregation field names; missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #905 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |
| #909 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #906 |  |  | missing description; not referenced by dashboards or downstream cards |
| #915 | 箱单 Items | 4 | VIP | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #916 | PO Items | 4 | VIP | question | production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #918 | Amazon Settlement | 4 | VIP | question | advertising, finance, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |

# Sales Domain

Cards classified into this domain: 153

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #584 | Production Cost Over Time | 4 | Production Costs | model | finance, production, sales | table |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #904, #914 |  | high reuse / change carefully; missing description |
| #743 | Quantity Purchased By Order ID X SKU | 4 | Base | table model | sales | table | #742 | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #761 | List SP Keywords Model DISTINCT | 4 | Ads SP Models | model | advertising, sales | table |  | #703, #704 |  | missing description; native SQL without business description |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877, #920 |  | high reuse / change carefully; missing description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 | missing description |
| #807 | 30 Days Sales | 4 | Inventory | table model | inventory, sales | table | #776 | #811, #877 |  | generic aggregation field names; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #853 | Exchange Rates | 4 | Base | source model | sales | table |  | #403, #411, #424, #425, #703, #704, #742, #776, #803, #805 |  | high reuse / change carefully; missing description |
| #870 | SKU First Sale Date | 4 | Sales Forecast | table model | sales | table | #776 | #877 |  | generic aggregation field names; missing description |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |  |
| #875 | Wps Sales Forecast | 4 | Sales Forecast | model | sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #876 | Wps Sales Forecast By Day | 4 | Sales Forecast | model | inventory, sales | table |  | #878, #879 |  |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873, #921 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #893 | ROI Per Sku Base Model | 4 | Base | table model | advertising, finance, logistics, production, sales | table | #745, #885, #886 | #887, #895 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | #411 |  | SB Ads Monitoring |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #700 |  | DHM 箱单 |
| #712 | Campaign ACOS | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring |
| #713 | Campaign ACOS Pie | 4 | SP Ads | dashboard component | advertising, finance, sales | pie | #403 |  | SP Ads Monitoring |
| #714 | Campaign ACOS Summarized Trend Line | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring |
| #715 | SearchTerm Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #703 |  | SP Ads Monitoring |
| #718 | Targeting Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring |
| #726 | SB Campaign ACOS | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring |
| #727 | SB Campaign ACOS Summarized Trend Line | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring |
| #728 | SB Campaign ACOS Pie | 4 | SB Ads | dashboard component | advertising, finance, sales | pie | #411 |  | SB Ads Monitoring |
| #729 | SB SearchTerm Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #424 |  | SB Ads Monitoring |
| #730 | SB Targeting Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring |
| #731 | Targeting Negative Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring |
| #732 | SB Targeting Negative Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring |
| #747 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, sales | line | #904 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) BY SKU |
| #749 | SKU-Level Cumulative Contribution Profit by SKU (SKU累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) BY SKU |
| #750 | Parent ASIN-Level Cumulative Contribution Profit (Parent ASIN累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) BY SKU |
| #755 | DH 船务小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #836 |  | DHM 合同 |
| #778 | Bar - Natural sales | 4 | Natural Sales | dashboard component | advertising, sales | bar | #777 |  | Natural Sales |
| #779 | Combo - Natural Sales Daily Over Time | 4 | Natural Sales | dashboard component | sales | line | #777 |  | Natural Sales |
| #780 | Line - Natural Sales Daily By Parent SKU | 4 | Natural Sales | dashboard component | sales | line | #777 |  | Natural Sales |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | #733, #776 |  | Returns |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | #733 |  | Returns |
| #788 | Returns Reason Pivot | 4 | Returns | dashboard component | returns, sales | pivot | #733 |  | Returns |
| #793 | Sales U By Product Over Time | 4 | Sales | dashboard component | sales | line | #776 |  | Store Monitor Dashboard |
| #795 | 出售地区 US | 4 | Sales | dashboard component | sales | map | #776 |  | Store Monitor Dashboard |
| #796 | 产品订单SKU分布 Pie (NO VINE) | 4 | Sales | dashboard component | sales | pie | #776 |  | Store Monitor Dashboard |
| #797 | 产品订单曲线 (NO VINE) Sales Line | 4 | Sales | dashboard component | sales | line | #776 |  | Store Monitor Dashboard |
| #800 | 实时产品销售曲线 (每小时更新) | 4 | Sales | dashboard component | sales | bar | #776 |  | Store Monitor Dashboard |
| #801 | 店铺 实际销售总金额 | 4 | Sales | dashboard component | finance, sales | scalar | #742 |  | Store Monitor Dashboard |
| #802 | 店铺 实际销量 | 4 | Sales | dashboard component | logistics, sales | scalar | #776 |  | Store Monitor Dashboard |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 |
| #837 | VS 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #835 |  | VS 箱单 |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard |
| #846 | 店铺 总用户访问次数 | 4 | Sales | dashboard component | sales | scalar | #803 |  | Store Monitor Dashboard |
| #847 | 店铺 用户量 | 4 | Sales | dashboard component | sales | area | #803 |  | Store Monitor Dashboard |
| #848 | 店铺 访问次数 | 4 | Sales | dashboard component | sales | area | #803 |  | Store Monitor Dashboard |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard |
| #852 | 出售地区 CA | 4 | Sales | dashboard component | sales | map | #776 |  | Store Monitor Dashboard |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |
| #874 | 产品订单曲线 Per SKU (NO VINE) | 4 | Sales | dashboard component | sales | line | #776 |  | 补货面板 |
| #901 | 工厂补货表2.0 | 4 | Inventory | dashboard component | inventory, production, replenishment, sales | table | #873 |  | 补货面板 |
| #919 | Sales QTY & Dollar | 4 | VIP | dashboard component | sales | line |  |  | VIP专属数据面板 |
| #920 | 产品订单曲线 Cum Sales QTY Per SKU (NO VINE) | 4 | Sales | dashboard component | sales | line | #776 |  | 补货面板 |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | sales | ' _catalog.md`

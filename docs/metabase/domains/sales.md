# Sales Domain

Cards classified into this domain: 172

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #441 | Us Demographics Simple Quarter 2025 06 30 | 4 | Admin VS's Personal Collection | table model | sales | table |  | #442, #443 |  | missing description |
| #444 | Us Demographics Simple Quarter 2025 06 30 | 4 | Serene Xuan's Personal Collection | source model | sales | table |  | #445, #446, #447, #448 |  | missing description |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | table model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #644 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #645 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections - Modified | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #683 | Shipment Pricing Model (Old) | 4 | 订单/船务数据 (Cynthia) | source model | production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904 |  | high reuse / change carefully; missing description |
| #743 | Quantity Purchased By Order ID X SKU | 4 | Base | table model | sales | table | #742 | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #761 | List SP Keywords Model DISTINCT | 4 | Ads SP Models | source model | advertising, sales | table |  | #703, #704 |  | missing description; native SQL without business description |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877 |  | high reuse / change carefully; missing description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | source model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 | missing description |
| #807 | 30 Days Sales | 4 | Inventory | table model | inventory, sales | table | #776 | #811, #877 |  | generic aggregation field names; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | source model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | source model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #845 | SalesAndTrafficByDate Model, Sum of TrafficByDate.sessions | 4 | Sales | source model | sales | scalar | #803 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #853 | Exchange Rates | 4 | Base | source model | sales | table |  | #403, #411, #424, #425, #703, #704, #742, #776, #803, #805 |  | high reuse / change carefully; missing description |
| #870 | SKU First Sale Date | 4 | Sales Forecast | table model | sales | table | #776 | #877 |  | generic aggregation field names; missing description |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |  |
| #876 | Wps Sales Forecast By Day | 4 | Sales Forecast | table model | inventory, sales | table |  | #878, #879 |  |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | source model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #893 | ROI Per Sku Base Model | 4 | Base | source model | advertising, finance, logistics, production, sales | table | #745, #885, #886 | #887, #895 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | source model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | source model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #902 | SKU Controllable Cost Source (SKU可控成本分析底表) | 4 | Lim Wang's Personal Collection | source model | advertising, finance, inventory, logistics, production, returns, sales | table | #742, #745, #885, #886 | #898 |  | many upstream dependencies; missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #307 | Purchase Amount Distribution by Category | 4 | user_profile_demo | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 |
| #310 | Order Distribution by Gender&Age | 4 | user_profile_demo | dashboard component | sales | bar |  |  | 亚马逊用户肖像分布 |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line |  |  | 亚马逊用户肖像分布 |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 |
| #329 | Amazon Keywords Ranking and Related Statistical Indicators | 4 | Cui Liu's Personal Collection | dashboard component | sales | table | #324 |  | Amazon Keywords Search Ranking |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | #411 |  | SB Ads Monitoring |
| #609 | Top Weighted Score By Movie | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_list (XXX By ___ X ____ X _____  (Over Time) |
| #614 | Top Average Weighted Score By Genre | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_list (XXX By ___ X ____ X _____  (Over Time) |
| #617 | Top Average Box Office (USD) By Genre | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_list (XXX By ___ X ____ X _____  (Over Time), eric_movie_recommendations_for_users_and_investors |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 |
| #627 | Weighted Score By Movie - Score 8 Or Above | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_recommendations_for_users_and_investors |
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
| #747 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, sales | line | #904 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #749 | SKU-Level Cumulative Contribution Profit by SKU (SKU累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #750 | Parent ASIN-Level Cumulative Contribution Profit (Parent ASIN累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
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

## Cleanup / Review Candidates

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #307 | Purchase Amount Distribution by Category | 4 | user_profile_demo | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | missing description; native SQL without business description |
| #310 | Order Distribution by Gender&Age | 4 | user_profile_demo | dashboard component | sales | bar |  |  | 亚马逊用户肖像分布 | missing description |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #318 | 关键词搜索趋势视图 | 4 | 关键词分析 | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #325 | averange_frequency&competiton | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #327 | search frequency&competion by week | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #328 | averange_frequency&competiton summary | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #329 | Amazon Keywords Ranking and Related Statistical Indicators | 4 | Cui Liu's Personal Collection | dashboard component | sales | table | #324 |  | Amazon Keywords Search Ranking | generic aggregation field names; missing description |
| #330 | averange_frequency&competiton summary_1 | 4 | Cui Liu's Personal Collection | native question | sales | area |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #382 | Keyword Performance Table active | 4 | Hanson Li's Personal Collection | question | advertising, sales | table | #370 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #441 | Us Demographics Simple Quarter 2025 06 30 | 4 | Admin VS's Personal Collection | table model | sales | table |  | #442, #443 |  | missing description |
| #444 | Us Demographics Simple Quarter 2025 06 30 | 4 | Serene Xuan's Personal Collection | source model | sales | table |  | #445, #446, #447, #448 |  | missing description |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #560 | DH Canada 库存表 DH-BT-BRAID-BG-TH | 4 | Serene Xuan's Personal Collection | question | inventory, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #566 | Graph 1 | 4 | Admin VS's Personal Collection | question | returns, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #568 | DH Amazon Parent SKU 销售比例 - Modified | 4 | DCMS 开发测试 | question | sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #573 | Production Cost Per SKU Pie | 4 | Production Costs | question | finance, production, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #574 | Production Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #575 | Production Unit Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #577 | Production Cost Sum Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #584 | Production Cost Over Time | 4 | Production Costs | question | finance, production, sales | table |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | table model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #594 | Shipment Finder | 4 | 运营数据 | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #604 | Wps Eric Movie List, Max of Year, Grouped by Genre, Sorted by Max of Year descending - Modified | 4 | Eric Zeng's Personal Collection | question | sales | row |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |

## All Cards

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #307 | Purchase Amount Distribution by Category | 4 | user_profile_demo | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | missing description; native SQL without business description |
| #310 | Order Distribution by Gender&Age | 4 | user_profile_demo | dashboard component | sales | bar |  |  | 亚马逊用户肖像分布 | missing description |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #318 | 关键词搜索趋势视图 | 4 | 关键词分析 | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #325 | averange_frequency&competiton | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #327 | search frequency&competion by week | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #328 | averange_frequency&competiton summary | 4 | Cui Liu's Personal Collection | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #329 | Amazon Keywords Ranking and Related Statistical Indicators | 4 | Cui Liu's Personal Collection | dashboard component | sales | table | #324 |  | Amazon Keywords Search Ranking | generic aggregation field names; missing description |
| #330 | averange_frequency&competiton summary_1 | 4 | Cui Liu's Personal Collection | native question | sales | area |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #382 | Keyword Performance Table active | 4 | Hanson Li's Personal Collection | question | advertising, sales | table | #370 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #441 | Us Demographics Simple Quarter 2025 06 30 | 4 | Admin VS's Personal Collection | table model | sales | table |  | #442, #443 |  | missing description |
| #444 | Us Demographics Simple Quarter 2025 06 30 | 4 | Serene Xuan's Personal Collection | source model | sales | table |  | #445, #446, #447, #448 |  | missing description |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #560 | DH Canada 库存表 DH-BT-BRAID-BG-TH | 4 | Serene Xuan's Personal Collection | question | inventory, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #566 | Graph 1 | 4 | Admin VS's Personal Collection | question | returns, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #568 | DH Amazon Parent SKU 销售比例 - Modified | 4 | DCMS 开发测试 | question | sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #573 | Production Cost Per SKU Pie | 4 | Production Costs | question | finance, production, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #574 | Production Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #575 | Production Unit Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #577 | Production Cost Sum Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #584 | Production Cost Over Time | 4 | Production Costs | question | finance, production, sales | table |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | table model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #594 | Shipment Finder | 4 | 运营数据 | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #604 | Wps Eric Movie List, Max of Year, Grouped by Genre, Sorted by Max of Year descending - Modified | 4 | Eric Zeng's Personal Collection | question | sales | row |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #609 | Top Weighted Score By Movie | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_list (XXX By ___ X ____ X _____  (Over Time) | generic aggregation field names; missing description |
| #614 | Top Average Weighted Score By Genre | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_list (XXX By ___ X ____ X _____  (Over Time) | generic aggregation field names; missing description |
| #617 | Top Average Box Office (USD) By Genre | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_list (XXX By ___ X ____ X _____  (Over Time), eric_movie_recommendations_for_users_and_investors | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #627 | Weighted Score By Movie - Score 8 Or Above | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row |  |  | eric_movie_recommendations_for_users_and_investors | generic aggregation field names; missing description |
| #641 | Funny movies based on reviews - Modified | 4 | Eric Zeng's Personal Collection | question | sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #644 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #645 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections - Modified | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #649 | DH Amazon Parent SKU 销售比例 - 复制测试 | 4 | DCMS 开发测试 | question | sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 | generic aggregation field names; missing description |
| #683 | Shipment Pricing Model (Old) | 4 | 订单/船务数据 (Cynthia) | source model | production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 | generic aggregation field names; missing description |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #700 |  | DHM 箱单 | generic aggregation field names; missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #712 | Campaign ACOS | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #713 | Campaign ACOS Pie | 4 | SP Ads | dashboard component | advertising, finance, sales | pie | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #714 | Campaign ACOS Summarized Trend Line | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #715 | SearchTerm Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #703 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #718 | Targeting Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #726 | SB Campaign ACOS | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #727 | SB Campaign ACOS Summarized Trend Line | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #728 | SB Campaign ACOS Pie | 4 | SB Ads | dashboard component | advertising, finance, sales | pie | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #729 | SB SearchTerm Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #424 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #730 | SB Targeting Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #731 | Targeting Negative Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #732 | SB Targeting Negative Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904 |  | high reuse / change carefully; missing description |
| #743 | Quantity Purchased By Order ID X SKU | 4 | Base | table model | sales | table | #742 | #745, #904 |  | generic aggregation field names; missing description |
| #744 | Sellable Quantity from Returns By SKU X Order | 4 | Base | question | returns, sales | line | #733 | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #746 | Platform Advertisement Cost Over Time | 4 | Base | question | advertising, finance, sales | table | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #747 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, sales | line | #904 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | missing description |
| #749 | SKU-Level Cumulative Contribution Profit by SKU (SKU累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | generic aggregation field names; missing description |
| #750 | Parent ASIN-Level Cumulative Contribution Profit (Parent ASIN累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | generic aggregation field names; missing description |
| #751 | Profit X Cost Analysis SKU Pivot | 4 | Base | question | finance, sales | pivot | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #752 | Store Profit Over Time New | 4 | Store Revenue | question | finance, sales | line | #745 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #754 | Production Cost Over Time New | 4 | Production Costs | question | finance, production, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #755 | DH 船务小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #836 |  | DHM 合同 | missing description |
| #756 | Shipping Cost Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #757 | Shipping Cost Sum Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | table | #585 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #758 | Production Cost Over Sum Time New | 4 | Production Costs | native question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #761 | List SP Keywords Model DISTINCT | 4 | Ads SP Models | source model | advertising, sales | table |  | #703, #704 |  | missing description; native SQL without business description |
| #763 | Targeting Performance Table Test Check | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #704 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877 |  | high reuse / change carefully; missing description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #778 | Bar - Natural sales | 4 | Natural Sales | dashboard component | advertising, sales | bar | #777 |  | Natural Sales | generic aggregation field names; missing description |
| #779 | Combo - Natural Sales Daily Over Time | 4 | Natural Sales | dashboard component | sales | line | #777 |  | Natural Sales | generic aggregation field names; missing description |
| #780 | Line - Natural Sales Daily By Parent SKU | 4 | Natural Sales | dashboard component | sales | line | #777 |  | Natural Sales | generic aggregation field names; missing description |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #783 | Return Parent ASIN Pie | 4 | Returns | question | production, replenishment, returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | #733 |  | Returns | generic aggregation field names; missing description |
| #787 | Return SKU Pie | 4 | Returns | question | returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #788 | Returns Reason Pivot | 4 | Returns | dashboard component | returns, sales | pivot | #733 |  | Returns | generic aggregation field names; missing description |
| #789 | Sellable Quantity from Returns By SKU X Order | 4 | Returns | question | returns, sales | line | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #791 | Sales $ By Product Over Time | 4 | Sales | question | logistics, sales | line | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #792 | DH 工厂补货表 - 16 sku | 4 | DCMS 开发测试 | question | finance, inventory, production, replenishment, sales | table | #553, #554 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #793 | Sales U By Product Over Time | 4 | Sales | dashboard component | sales | line | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #795 | 出售地区 US | 4 | Sales | dashboard component | sales | map | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #796 | 产品订单SKU分布 Pie (NO VINE) | 4 | Sales | dashboard component | sales | pie | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #797 | 产品订单曲线 (NO VINE) Sales Line | 4 | Sales | dashboard component | sales | line | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #798 | 产品订单曲线 Per SKU | 4 | Sales | question | sales | line | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #799 | 产品销售曲线 By Day | 4 | Sales | question | sales | line | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #800 | 实时产品销售曲线 (每小时更新) | 4 | Sales | dashboard component | sales | bar | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #801 | 店铺 实际销售总金额 | 4 | Sales | dashboard component | finance, sales | scalar | #742 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #802 | 店铺 实际销量 | 4 | Sales | dashboard component | logistics, sales | scalar | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | source model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 | missing description |
| #807 | 30 Days Sales | 4 | Inventory | table model | inventory, sales | table | #776 | #811, #877 |  | generic aggregation field names; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | source model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #811 | 补货 Fulfillable Inventory Chart | 4 | Inventory | question | finance, inventory, production, replenishment, sales | table | #776, #806, #807 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #814 | Todd_Test_DH 合同 | 4 | todd li's Personal Collection | question | production, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #831 | FBA Shipment 表 Imperial Unit (US) - Duplicate | 4 | todd li's Personal Collection | native question | finance, inventory, logistics, production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #832 | Todd_Test_箱单/出货 | 4 | todd li's Personal Collection | question | production, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | source model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #837 | VS 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #835 |  | VS 箱单 | generic aggregation field names; missing description |
| #838 | 缺Pricing 的 SKU | 4 | 订单/船务数据 (Cynthia) | native question | production, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #841 | Amazon Parent SKU 销售比例 | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #842 | Amazon 产品销售比例 | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #843 | Amazon 产品销售比例 Pie By Parent Asin X Color X Size | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #844 | Amazon 产品销售比例 Pie By Parent Asin X Size X Color | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #845 | SalesAndTrafficByDate Model, Sum of TrafficByDate.sessions | 4 | Sales | source model | sales | scalar | #803 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #846 | 店铺 总用户访问次数 | 4 | Sales | dashboard component | sales | scalar | #803 |  | Store Monitor Dashboard | generic aggregation field names |
| #847 | 店铺 用户量 | 4 | Sales | dashboard component | sales | area | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #848 | 店铺 访问次数 | 4 | Sales | dashboard component | sales | area | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #851 | 7 Days Sales | 4 | Inventory | question | inventory, sales | table | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #852 | 出售地区 CA | 4 | Sales | dashboard component | sales | map | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #853 | Exchange Rates | 4 | Base | source model | sales | table |  | #403, #411, #424, #425, #703, #704, #742, #776, #803, #805 |  | high reuse / change carefully; missing description |
| #866 | test | 4 | Unfiled / Unknown | question | logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #870 | SKU First Sale Date | 4 | Sales Forecast | table model | sales | table | #776 | #877 |  | generic aggregation field names; missing description |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) | generic aggregation field names; mixed finance and inventory timing |
| #873 | 发货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, sales | table | #878 | #901 | 补货面板 |  |
| #874 | 产品订单曲线 Per SKU (NO VINE) | 4 | Sales | dashboard component | sales | line | #776 |  | 补货面板 | generic aggregation field names; missing description |
| #875 | Wps Sales Forecast | 4 | Sales Forecast | question | sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #876 | Wps Sales Forecast By Day | 4 | Sales Forecast | table model | inventory, sales | table |  | #878, #879 |  |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #807, #870 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 发货 Forecast WOS Summary | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #876, #877, #899, #900 | #873 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | source model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #880 | 未来日销趋势 | 4 | Sales Forecast | question | sales | line | #879 |  |  | missing description; not referenced by dashboards or downstream cards |
| #885 | Shipping Cost Over Time By Sku | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #893, #902 |  | generic aggregation field names; missing description |
| #886 | Production Cost Over Time By Sku | 4 | Production Costs | question | finance, production, sales | line |  | #893, #902 |  | generic aggregation field names; missing description |
| #887 | SKU-Level Monthly ROI and Expense Structure (SKU月度ROI与成本结构) | 4 | Finance | question | advertising, finance, logistics, production, sales | line | #893 |  |  | missing description; not referenced by dashboards or downstream cards |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #893 | ROI Per Sku Base Model | 4 | Base | source model | advertising, finance, logistics, production, sales | table | #745, #885, #886 | #887, #895 |  | missing description; native SQL without business description |
| #895 | SKU-Level Cumulative ROI and Expense Structure (SKU累计ROI与成本结构趋势) | 4 | Finance | question | advertising, finance, logistics, production, sales | line | #893 |  |  | missing description; not referenced by dashboards or downstream cards |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | question | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  |  | generic aggregation field names; not referenced by dashboards or downstream cards |
| #897 | SKU Expense Mix Trend (SKU费用结构趋势) | 4 | Lim Wang's Personal Collection | question | finance, inventory, sales | line | #742 |  |  | missing description; not referenced by dashboards or downstream cards |
| #898 | SKU Controllable Expense-to-Sales Ratio Trend (SKU可控费用销售占比趋势) | 4 | Lim Wang's Personal Collection | question | advertising, finance, inventory, logistics, production, returns, sales | line | #902 |  |  | missing description; not referenced by dashboards or downstream cards |
| #899 | Wps Shipment Model | 4 | Sales Forecast | source model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | source model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #901 | 工厂补货表2.0 | 4 | Inventory | dashboard component | inventory, production, replenishment, sales | table | #873 |  | 补货面板 | generic aggregation field names; missing description |
| #902 | SKU Controllable Cost Source (SKU可控成本分析底表) | 4 | Lim Wang's Personal Collection | source model | advertising, finance, inventory, logistics, production, returns, sales | table | #742, #745, #885, #886 | #898 |  | many upstream dependencies; missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #905 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |
| #907 | Monthly Cost Mix Trend (月度成本占比趋势) | 4 | Finance | question | finance, sales | area | #906 |  |  | missing description; not referenced by dashboards or downstream cards |
| #908 | Total Cost Mix (总成本占比) | 4 | Finance | question | finance, sales | pie | #906 |  |  | missing description; not referenced by dashboards or downstream cards |
| #909 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #906 |  |  | missing description; not referenced by dashboards or downstream cards |
| #910 | Cumulative Sold Operating ROI Trend (累计已售经营ROI趋势) | 4 | Finance | question | finance, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |
| #911 | Monthly Sold Operating ROI Trend (月度已售经营ROI趋势) | 4 | Finance | question | finance, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |
| #912 | Monthly Sold Operating ROI MoM Change (月度已售经营ROI环比变化) | 4 | Finance | question | finance, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |

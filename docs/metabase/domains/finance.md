# Finance Domain

Cards classified into this domain: 86

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table |  | #411, #424, #425 |  | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | table model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #644 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #645 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections - Modified | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | source model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
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
| #306 | Purchase Amount Distribution by State | 4 | user_profile_demo | dashboard component | finance, logistics | map |  |  | 亚马逊用户肖像分布 |
| #307 | Purchase Amount Distribution by Category | 4 | user_profile_demo | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 |
| #309 | Purchase Amount and Quantity Distribution by Gender | 4 | user_profile_demo | dashboard component | finance | bar |  |  | 亚马逊用户肖像分布 |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line |  |  | 亚马逊用户肖像分布 |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 |
| #639 | Genre Performance by average box office, average ratings, amount | 4 | Eric Zeng's Personal Collection | dashboard component | finance | bar |  |  | eric_movie_recommendations_for_users_and_investors |
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
| #801 | 店铺 实际销售总金额 | 4 | Sales | dashboard component | finance, sales | scalar | #742 |  | Store Monitor Dashboard |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) |

## Cleanup / Review Candidates

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #306 | Purchase Amount Distribution by State | 4 | user_profile_demo | dashboard component | finance, logistics | map |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #307 | Purchase Amount Distribution by Category | 4 | user_profile_demo | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | missing description; native SQL without business description |
| #309 | Purchase Amount and Quantity Distribution by Gender | 4 | user_profile_demo | dashboard component | finance | bar |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table |  | #411, #424, #425 |  | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
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
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #639 | Genre Performance by average box office, average ratings, amount | 4 | Eric Zeng's Personal Collection | dashboard component | finance | bar |  |  | eric_movie_recommendations_for_users_and_investors | generic aggregation field names; missing description |
| #644 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #645 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections - Modified | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
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

## All Cards

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #306 | Purchase Amount Distribution by State | 4 | user_profile_demo | dashboard component | finance, logistics | map |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #307 | Purchase Amount Distribution by Category | 4 | user_profile_demo | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | missing description; native SQL without business description |
| #309 | Purchase Amount and Quantity Distribution by Gender | 4 | user_profile_demo | dashboard component | finance | bar |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table |  | #411, #424, #425 |  | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
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
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #639 | Genre Performance by average box office, average ratings, amount | 4 | Eric Zeng's Personal Collection | dashboard component | finance | bar |  |  | eric_movie_recommendations_for_users_and_investors | generic aggregation field names; missing description |
| #644 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #645 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections - Modified | 4 | Admin VS's Personal Collection | source model | finance, sales | line | #640 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
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
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #897, #902, #904 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #746 | Platform Advertisement Cost Over Time | 4 | Base | question | advertising, finance, sales | table | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #747 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, sales | line | #904 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | missing description |
| #749 | SKU-Level Cumulative Contribution Profit by SKU (SKU累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | generic aggregation field names; missing description |
| #750 | Parent ASIN-Level Cumulative Contribution Profit (Parent ASIN累计贡献利润) | 4 | Finance | dashboard component | finance, sales | line | #745 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | generic aggregation field names; missing description |
| #751 | Profit X Cost Analysis SKU Pivot | 4 | Base | question | finance, sales | pivot | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #752 | Store Profit Over Time New | 4 | Store Revenue | question | finance, sales | line | #745 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #754 | Production Cost Over Time New | 4 | Production Costs | question | finance, production, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #756 | Shipping Cost Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #757 | Shipping Cost Sum Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | table | #585 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #758 | Production Cost Over Sum Time New | 4 | Production Costs | native question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #763 | Targeting Performance Table Test Check | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #704 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #792 | DH 工厂补货表 - 16 sku | 4 | DCMS 开发测试 | question | finance, inventory, production, replenishment, sales | table | #553, #554 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #801 | 店铺 实际销售总金额 | 4 | Sales | dashboard component | finance, sales | scalar | #742 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | source model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #811 | 补货 Fulfillable Inventory Chart | 4 | Inventory | question | finance, inventory, production, replenishment, sales | table | #776, #806, #807 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #831 | FBA Shipment 表 Imperial Unit (US) - Duplicate | 4 | todd li's Personal Collection | native question | finance, inventory, logistics, production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) | generic aggregation field names; mixed finance and inventory timing |
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

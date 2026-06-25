# Metabase Business Glossary

This glossary captures recurring business terms and common interpretation traps.

| Term | Business Meaning | Warning |
| --- | --- | --- |
| Product Sales | 商品销售本金，通常表示商品售价本身，不扣平台费用、广告、产品成本或物流成本。 | 不要和 Settlement Net Amount 混用。 |
| Settlement Net Amount | 销售结算净额，可能已经包含退款、促销折扣、平台佣金、FBA fee、补偿款等正负项。 | 它不是纯商品销售额。 |
| Net Profit | 已售经营净利润，应按已售商品收入和已售商品相关成本匹配计算。 | 不要和库存投入视角里的 Net Investment Position 混用。 |
| Inventory Investment | 库存相关投入，通常包含生产/采购投入和物流/头程投入，可能包含未售库存。 |  |
| Production Investment Cost | 按采购或预计付款节奏计入的生产/采购投入。 | 不等同于已售商品成本。 |
| Shipping Investment Cost | 按物流付款节奏计入的物流/头程投入。 | 不等同于已售订单分摊物流成本。 |
| Total Cost | 需要结合具体图表口径理解；在已售经营表中通常表示已售收入和净利润之间的成本差额。 |  |
| ROI | 通常为 Net Profit / Total Cost 或 Net Profit / Total Spend。 | 不同图表可能使用不同成本范围，必须查看 description。 |
| WOS | Weeks of Stock，库存可支撑的周数。 |  |

## Cards With Generic Aggregation Fields

These cards contain fields like `sum`, `sum_2`, `avg`, or `max`. They need chart descriptions or visualization titles to avoid ambiguity.

| ID | Name | DB | Collection | Type | Domains | Display | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #306 | Purchase Amount Distribution by State | 4 | user_profile_demo | dashboard component | finance, logistics | map | generic aggregation field names; missing description |
| #309 | Purchase Amount and Quantity Distribution by Gender | 4 | user_profile_demo | dashboard component | finance | bar | generic aggregation field names; missing description |
| #311 | User Average Purchase Amount by Month | 4 | user_profile_demo | dashboard component | finance, sales | line | generic aggregation field names; missing description |
| #313 | Purchase Quantity Distribution by State | 4 | 前期用户画像市场分析 | dashboard component | logistics | map | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row | generic aggregation field names; missing description |
| #329 | Amazon Keywords Ranking and Related Statistical Indicators | 4 | Cui Liu's Personal Collection | dashboard component | sales | table | generic aggregation field names; missing description |
| #382 | Keyword Performance Table active | 4 | Hanson Li's Personal Collection | question | advertising, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #388 | Campaign CTR | 4 | SP Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | question | advertising | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #402 | List SP Campaign Model | 4 | Ads SP Models | source model | advertising | table | generic aggregation field names; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | generic aggregation field names; missing description |
| #442 | Downhome 客户群体年龄 第二季度 | 4 | Admin VS's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #443 | Downhome 客户群体教育背景 第二季度 | 4 | Admin VS's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #445 | Us Demographics Q2-AGE GROUP | 4 | Serene Xuan's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #446 | Us Demographics Simple Q2 -Marital Status | 4 | Serene Xuan's Personal Collection | dashboard component | uncategorized | pie | generic aggregation field names; missing description |
| #447 | Us Demographics Simple Quarter 2 - household_income | 4 | Serene Xuan's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #448 | Us Demographics Simple Quarter 2 - education | 4 | Serene Xuan's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | generic aggregation field names; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #566 | Graph 1 | 4 | Admin VS's Personal Collection | question | returns, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #568 | DH Amazon Parent SKU 销售比例 - Modified | 4 | DCMS 开发测试 | question | sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #573 | Production Cost Per SKU Pie | 4 | Production Costs | question | finance, production, sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #574 | Production Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #575 | Production Unit Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #577 | Production Cost Sum Over Time | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #584 | Production Cost Over Time | 4 | Production Costs | question | finance, production, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | table model | finance, logistics, replenishment, sales | table | generic aggregation field names; missing description |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #604 | Wps Eric Movie List, Max of Year, Grouped by Genre, Sorted by Max of Year descending - Modified | 4 | Eric Zeng's Personal Collection | question | sales | row | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #609 | Top Weighted Score By Movie | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row | generic aggregation field names; missing description |
| #610 | Weighted Score By Movie With Reviewer Type Comparison | 4 | Eric Zeng's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #611 | Average Rating By Reviewer Type | 4 | Eric Zeng's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #614 | Top Average Weighted Score By Genre | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row | generic aggregation field names; missing description |
| #617 | Top Average Box Office (USD) By Genre | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row | generic aggregation field names; missing description |
| #618 | Total Box Office Over Time | 4 | Eric Zeng's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table | generic aggregation field names; missing description |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table | generic aggregation field names; missing description |
| #627 | Weighted Score By Movie - Score 8 Or Above | 4 | Eric Zeng's Personal Collection | dashboard component | sales | row | generic aggregation field names; missing description |
| #630 | Sum of Box Office Group By Weighted Score | 4 | Eric Zeng's Personal Collection | dashboard component | uncategorized | bar | generic aggregation field names; missing description |
| #639 | Genre Performance by average box office, average ratings, amount | 4 | Eric Zeng's Personal Collection | dashboard component | finance | bar | generic aggregation field names; missing description |
| #644 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections | 4 | Admin VS's Personal Collection | source model | finance, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #645 | Store Profit By SKU X Order Model, Cumulative sum of Sum of profit, Grouped by order_date: Day, Filtered by Marketplace Name is Amazon.ca and sku is not 3 selections - Modified | 4 | Admin VS's Personal Collection | source model | finance, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #649 | DH Amazon Parent SKU 销售比例 - 复制测试 | 4 | DCMS 开发测试 | question | sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | generic aggregation field names; missing description |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | generic aggregation field names; missing description |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table | generic aggregation field names; missing description |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | generic aggregation field names; missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | generic aggregation field names; missing description |
| #705 | Campaign CTR Summarized Trend Line | 4 | SP Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #708 | Campaign CTR Pie | 4 | SP Ads | dashboard component | advertising | pie | generic aggregation field names; missing description |
| #709 | Campaign CVR | 4 | SP Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #710 | Campaign CVR Summarized Trend Line | 4 | SP Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #711 | Campaign CVR Pie | 4 | SP Ads | dashboard component | advertising | pie | generic aggregation field names; missing description |
| #712 | Campaign ACOS | 4 | SP Ads | dashboard component | advertising, finance, sales | line | generic aggregation field names; missing description |
| #713 | Campaign ACOS Pie | 4 | SP Ads | dashboard component | advertising, finance, sales | pie | generic aggregation field names; missing description |
| #714 | Campaign ACOS Summarized Trend Line | 4 | SP Ads | dashboard component | advertising, finance, sales | line | generic aggregation field names; missing description |
| #715 | SearchTerm Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | generic aggregation field names; missing description |
| #718 | Targeting Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | generic aggregation field names; missing description |
| #720 | SB Campaign CTR | 4 | SB Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #721 | SB Campaign CTR Summarized Trend Line | 4 | SB Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #722 | SB Campaign CTR Pie | 4 | SB Ads | dashboard component | advertising | pie | generic aggregation field names; missing description |
| #723 | SB Campaign CVR | 4 | SB Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #724 | SB Campaign CVR Summarized Trend Line | 4 | SB Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #725 | SB Campaign CVR Pie | 4 | SB Ads | dashboard component | advertising | pie | generic aggregation field names; missing description |
| #726 | SB Campaign ACOS | 4 | SB Ads | dashboard component | advertising, finance, sales | line | generic aggregation field names; missing description |
| #727 | SB Campaign ACOS Summarized Trend Line | 4 | SB Ads | dashboard component | advertising, finance, sales | line | generic aggregation field names; missing description |
| #728 | SB Campaign ACOS Pie | 4 | SB Ads | dashboard component | advertising, finance, sales | pie | generic aggregation field names; missing description |
| #729 | SB SearchTerm Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | generic aggregation field names; missing description |

_Only first 80 of 142 cards shown._

# Cards With Generic Aggregation Fields

These cards contain fields like `sum`, `sum_2`, `avg`, or `max`. They need chart descriptions or visualization titles to avoid ambiguity.

| ID | Name | DB | Collection | Type | Domains | Display | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #313 | Purchase Quantity Distribution by State | 4 | 前期用户画像市场分析 | dashboard component | logistics | map | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row | generic aggregation field names; missing description |
| #388 | Campaign CTR | 4 | SP Ads | dashboard component | advertising | line | generic aggregation field names; missing description |
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | model | advertising | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #402 | List SP Campaign Model | 4 | Ads SP Models | source model | advertising | table | generic aggregation field names; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | model | advertising, finance, sales | table | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | model | advertising, finance, sales | table | generic aggregation field names; missing description |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | generic aggregation field names; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #568 | DH Amazon Parent SKU 销售比例 - Modified | 4 | DCMS 开发测试 | question | sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #573 | Production Cost Per SKU Pie | 4 | Production Costs | question | finance, production, sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #574 | Production Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #575 | Production Unit Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #577 | Production Cost Sum Over Time | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #584 | Production Cost Over Time | 4 | Production Costs | model | finance, production, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table | generic aggregation field names; missing description |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table | generic aggregation field names; missing description |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table | generic aggregation field names; missing description |
| #649 | DH Amazon Parent SKU 销售比例 - 复制测试 | 4 | DCMS 开发测试 | question | sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | generic aggregation field names; missing description |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | generic aggregation field names; missing description |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table | generic aggregation field names; missing description |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | generic aggregation field names; missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | model | advertising, finance, sales | table | generic aggregation field names; missing description |
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
| #730 | SB Targeting Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | generic aggregation field names; missing description |
| #731 | Targeting Negative Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | generic aggregation field names; missing description |
| #732 | SB Targeting Negative Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | generic aggregation field names; missing description |
| #743 | Quantity Purchased By Order ID X SKU | 4 | Base | table model | sales | table | generic aggregation field names; missing description |
| #744 | Sellable Quantity from Returns By SKU X Order | 4 | Base | question | returns, sales | line | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | generic aggregation field names; many upstream dependencies; missing description |
| #746 | Platform Advertisement Cost Over Time | 4 | Base | question | advertising, finance, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #751 | Profit X Cost Analysis SKU Pivot | 4 | Base | question | finance, sales | pivot | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #752 | Store Profit Over Time New | 4 | Store Revenue | question | finance, sales | line | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #754 | Production Cost Over Time New | 4 | Production Costs | question | finance, production, sales | line | generic aggregation field names; missing description |
| #756 | Shipping Cost Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line | generic aggregation field names; missing description |
| #757 | Shipping Cost Sum Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #758 | Production Cost Over Sum Time New | 4 | Production Costs | native question | finance, production, sales | line | generic aggregation field names; missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #763 | Targeting Performance Table Test Check | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #778 | Bar - Natural sales | 4 | Natural Sales | dashboard component | advertising, sales | bar | generic aggregation field names; missing description |
| #779 | Combo - Natural Sales Daily Over Time | 4 | Natural Sales | dashboard component | sales | line | generic aggregation field names; missing description |
| #780 | Line - Natural Sales Daily By Parent SKU | 4 | Natural Sales | dashboard component | sales | line | generic aggregation field names; missing description |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | generic aggregation field names; missing description |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | generic aggregation field names; missing description |
| #783 | Return Parent ASIN Pie | 4 | Returns | question | production, replenishment, returns, sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | generic aggregation field names; missing description |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | generic aggregation field names; missing description |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | generic aggregation field names; missing description |
| #787 | Return SKU Pie | 4 | Returns | question | returns, sales | pie | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |

_Only first 80 of 121 cards shown._

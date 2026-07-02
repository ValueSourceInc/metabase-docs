# Metabase Cards and Models

Total: 192 cards (192 active, 0 archived).

For field-level detail, see individual card files in [cards/](cards/_README.md).
For programmatic access, use [_index.json](_index.json).

## By Type

| Type | Count |
| --- | --- |
| dashboard component | 78 |
| question | 56 |
| model | 25 |
| source model | 15 |
| table model | 12 |
| native question | 6 |

## All Cards

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #302 | Pillow Search Volume Xiyou | 4 | 前期用户画像市场分析 | model | advertising | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #303 | Pillow User Search Keywords | 4 | 前期用户画像市场分析 | model | uncategorized | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #304 | Pillow Word Segmentation | 4 | 前期用户画像市场分析 | model | uncategorized | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #313 | Purchase Quantity Distribution by State | 4 | 前期用户画像市场分析 | dashboard component | logistics | map |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 | generic aggregation field names; missing description |
| #318 | 关键词搜索趋势视图 | 4 | 关键词分析 | native question | sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #319 | 关键词竞争情况视图 | 4 | 关键词分析 | native question | uncategorized | table |  |  |  | not referenced by dashboards or downstream cards |
| #388 | Campaign CTR | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | model | advertising | table | #402 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #402 | List SP Campaign Model | 4 | Ads SP Models | source model | advertising | table |  | #398, #403, #703, #704 |  | generic aggregation field names; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #409 | Dify 测试空数据 | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #404 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table |  | #411, #424, #425 |  | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #465 | VS 产品销售曲线Alert Test | 4 | DCMS 开发测试 | question | sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #476 | SKU订单预警 | 4 | Alerts | question | sales | bar | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #504 | Shipping Cost Actual Payment Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #505 | Shipping Cost Payment Per SKU  Pie | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #568 | DH Amazon Parent SKU 销售比例 - Modified | 4 | DCMS 开发测试 | question | sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #571 | Shipping Cost Estimated Payment (By Pickup Date) Per SKU | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | bar |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #572 | Shipment Cost Per Item Per SKU Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #573 | Production Cost Per SKU Pie | 4 | Production Costs | question | finance, production, sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #574 | Production Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #575 | Production Unit Cost Per SKU Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #577 | Production Cost Sum Over Time | 4 | Production Costs | question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #578 | Shipping Cost Sum Over Time | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #584 | Production Cost Over Time | 4 | Production Costs | model | finance, production, sales | table |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #594 | Shipment Finder | 4 | 运营数据 | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #595 | Production Cost Over Time Per Parent ASIN | 4 | Production Costs | question | finance, logistics, production, replenishment, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #625 | FBA Shipment 表 Metric Unit (CA) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #649 | DH Amazon Parent SKU 销售比例 - 复制测试 | 4 | DCMS 开发测试 | question | sales | pie |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #676 | 工厂大合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table |  |  | VS工厂合同 | generic aggregation field names; missing description |
| #683 | Shipment Pricing Model (Old) | 4 | 订单/船务数据 (Cynthia) | native question | production, replenishment, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #685 | 工厂小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | production, replenishment, sales | table | #836 |  | VS工厂合同 | generic aggregation field names; missing description |
| #686 | FBA Shipment 表 Imperial Unit (US) | 4 | 订单/船务数据 (Cynthia) | dashboard component | inventory, replenishment, sales | table |  |  | FBA 模板 | generic aggregation field names; missing description |
| #700 | DHM 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #701 | DHM 箱单 | missing description |
| #701 | DHM 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #700 |  | DHM 箱单 | generic aggregation field names; missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #705 | Campaign CTR Summarized Trend Line | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #707 | List SP Keywords Model | 4 | Ads SP Models | model | advertising | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #708 | Campaign CTR Pie | 4 | SP Ads | dashboard component | advertising | pie | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #709 | Campaign CVR | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #710 | Campaign CVR Summarized Trend Line | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #711 | Campaign CVR Pie | 4 | SP Ads | dashboard component | advertising | pie | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #712 | Campaign ACOS | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #713 | Campaign ACOS Pie | 4 | SP Ads | dashboard component | advertising, finance, sales | pie | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #714 | Campaign ACOS Summarized Trend Line | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #715 | SearchTerm Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #703 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #718 | Targeting Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #719 | List SB Keywords Model | 4 | Ads SB Models | model | advertising | table |  | #424 |  | missing description |
| #720 | SB Campaign CTR | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #721 | SB Campaign CTR Summarized Trend Line | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #722 | SB Campaign CTR Pie | 4 | SB Ads | dashboard component | advertising | pie | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #723 | SB Campaign CVR | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #724 | SB Campaign CVR Summarized Trend Line | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #725 | SB Campaign CVR Pie | 4 | SB Ads | dashboard component | advertising | pie | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #726 | SB Campaign ACOS | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #727 | SB Campaign ACOS Summarized Trend Line | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #728 | SB Campaign ACOS Pie | 4 | SB Ads | dashboard component | advertising, finance, sales | pie | #411 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #729 | SB SearchTerm Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #424 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #730 | SB Targeting Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #731 | Targeting Negative Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring | generic aggregation field names; missing description |
| #732 | SB Targeting Negative Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring | generic aggregation field names; missing description |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789, #928, #961 |  | high reuse / change carefully; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #904, #914, #967, #968 |  | high reuse / change carefully; missing description |
| #743 | Quantity Purchased By Order ID X SKU | 4 | Base | table model | sales | table | #742 | #745, #904 |  | generic aggregation field names; missing description |
| #744 | Sellable Quantity from Returns By SKU X Order | 4 | Base | question | returns, sales | line | #733 | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #752, #888, #893 |  | generic aggregation field names; many upstream dependencies; missing description |
| #746 | Platform Advertisement Cost Over Time | 4 | Base | question | advertising, finance, sales | table | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #751 | Profit X Cost Analysis SKU Pivot | 4 | Base | question | finance, sales | pivot | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #752 | Store Profit Over Time New | 4 | Store Revenue | question | finance, sales | line | #745 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #754 | Production Cost Over Time New | 4 | Production Costs | question | finance, production, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #755 | DH 船务小合同 | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #836 |  | DHM 合同 | missing description |
| #756 | Shipping Cost Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #888 |  | generic aggregation field names; missing description |
| #757 | Shipping Cost Sum Over Time New | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | table | #585 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #758 | Production Cost Over Sum Time New | 4 | Production Costs | native question | finance, production, sales | line |  |  |  | generic aggregation field names; missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #761 | List SP Keywords Model DISTINCT | 4 | Ads SP Models | model | advertising, sales | table |  | #703, #704 |  | missing description; native SQL without business description |
| #763 | Targeting Performance Table Test Check | 4 | DCMS 开发测试 | question | advertising, finance, sales | table | #704 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #776 | Reports Flat File All Orders Data By Order Date General Hourly Model | 4 | Sales | source model | logistics, sales | table | #853 | #476, #781, #784, #791, #793, #795, #796, #797, #798, #799, #800, #802, #807, #811, #841, #842, #843, #844, #851, #852, #870, #874, #877, #920, #954, #958, #959, #966 |  | high reuse / change carefully; missing description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #778 | Bar - Natural sales | 4 | Natural Sales | dashboard component | advertising, sales | bar | #777 |  | Natural Sales | generic aggregation field names; missing description |
| #779 | Combo - Natural Sales Daily Over Time | 4 | Natural Sales | dashboard component | sales | line | #777 |  | Natural Sales | generic aggregation field names; missing description |
| #780 | Line - Natural Sales Daily By Parent SKU | 4 | Natural Sales | dashboard component | sales | line | #777 |  | Natural Sales | generic aggregation field names; missing description |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #782 | Return Reason is Color By Product | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
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
| #795 | 出售地区 US | 4 | Sales | dashboard component | sales | map | #776 |  | Sales Dashboard, Store Monitor Dashboard | generic aggregation field names; missing description |
| #796 | 产品订单SKU分布 Pie (NO VINE) | 4 | Sales | dashboard component | sales | pie | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #797 | 产品订单曲线 (NO VINE) Sales Line | 4 | Sales | dashboard component | sales | line | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #798 | 产品订单曲线 Per SKU | 4 | Sales | question | sales | line | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #799 | 产品销售曲线 By Day | 4 | Sales | question | sales | line | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #800 | 实时产品销售曲线 (每小时更新) | 4 | Sales | dashboard component | sales | bar | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #801 | 店铺 实际销售总金额 | 4 | Sales | dashboard component | finance, sales | scalar | #742 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #802 | 店铺 实际销量 | 4 | Sales | dashboard component | logistics, sales | scalar | #776 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877, #928 | 补货面板 | missing description |
| #807 | 30 Days Sales | 4 | Inventory | table model | inventory, sales | table | #776 | #811 |  | generic aggregation field names; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #811 | 补货 Fulfillable Inventory Chart | 4 | Inventory | question | finance, inventory, production, replenishment, sales | table | #776, #806, #807 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #835 | VS 箱单 By SKU | 4 | 订单/船务数据 (Cynthia) | table model | replenishment, sales | table | #836 | #837 | VS 箱单 | missing description |
| #836 | Shipment Pricing Model (UI) | 4 | 订单/船务数据 (Cynthia) | table model | production, replenishment, sales | table |  | #685, #700, #755, #835 |  | missing description |
| #837 | VS 箱单 By Product Group | 4 | 订单/船务数据 (Cynthia) | dashboard component | replenishment, sales | table | #835 |  | VS 箱单 | generic aggregation field names; missing description |
| #838 | 缺Pricing 的 SKU | 4 | 订单/船务数据 (Cynthia) | native question | production, sales | table |  |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #841 | Amazon Parent SKU 销售比例 | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #842 | Amazon 产品销售比例 | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #843 | Amazon 产品销售比例 Pie By Parent Asin X Color X Size | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #844 | Amazon 产品销售比例 Pie By Parent Asin X Size X Color | 4 | Sales | question | sales | pie | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #845 | SalesAndTrafficByDate Model, Sum of TrafficByDate.sessions | 4 | Sales | question | sales | scalar | #803 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #846 | 店铺 总用户访问次数 | 4 | Sales | dashboard component | sales | scalar | #803 |  | Store Monitor Dashboard | generic aggregation field names |
| #847 | 店铺 用户量 | 4 | Sales | dashboard component | sales | area | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #848 | 店铺 访问次数 | 4 | Sales | dashboard component | sales | area | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #851 | 7 Days Sales | 4 | Inventory | question | inventory, sales | table | #776 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #852 | 出售地区 CA | 4 | Sales | dashboard component | sales | map | #776 |  | Sales Dashboard, Store Monitor Dashboard | generic aggregation field names; missing description |
| #853 | Exchange Rates | 4 | Base | source model | sales | table |  | #403, #411, #424, #425, #703, #704, #742, #776, #803, #805 |  | high reuse / change carefully; missing description |
| #870 | SKU First Sale Date | 4 | Sales Forecast | table model | sales | table | #776 | #877 |  | generic aggregation field names; missing description |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Settlement & Inventory Investment (实时结算与库存投入看板） | generic aggregation field names; mixed finance and inventory timing |
| #873 | 补货 FBA Total Inventory Chart 2.0 | 4 | Inventory | table model | inventory, logistics, production, replenishment, returns, sales | table | #878 | #901, #930, #931 | 补货面板 |  |
| #874 | 产品订单曲线 Per SKU (NO VINE) | 4 | Sales | dashboard component | sales | line | #776 |  | Sales Dashboard, 补货面板 | generic aggregation field names; missing description |
| #875 | Wps Sales Forecast | 4 | Sales Forecast | model | sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #876 | Wps Sales Forecast By Day | 4 | Sales Forecast | model | inventory, sales | table |  | #878, #879 |  |  |
| #877 | 发货基础表 | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, sales | table | #776, #806, #870, #954 | #878, #879 |  | generic aggregation field names; many upstream dependencies; missing description |
| #878 | 备货发货 Forecast WOS Summary | 4 | Sales Forecast | table model | inventory, logistics, production, replenishment, returns, sales | table | #876, #877, #899, #900 | #873, #921, #960 |  | many upstream dependencies; missing description; native SQL without business description |
| #879 | 未来有效日销model | 4 | Sales Forecast | model | replenishment, sales | table | #876, #877 | #880 |  | missing description; native SQL without business description |
| #880 | 未来日销趋势 | 4 | Sales Forecast | question | sales | line | #879 |  |  | missing description; not referenced by dashboards or downstream cards |
| #885 | Shipping Cost Over Time By Sku | 4 | Shipment Costs | question | finance, logistics, replenishment, sales | line |  | #893 |  | generic aggregation field names; missing description |
| #886 | Production Cost Over Time By Sku | 4 | Production Costs | question | finance, production, sales | line |  | #893 |  | generic aggregation field names; missing description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #893 | ROI Per Sku Base Model | 4 | Base | native question | advertising, finance, logistics, production, sales | table | #745, #885, #886 |  |  | missing description; native SQL without business description; not referenced by dashboards or downstream cards |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  | Cost (成本看板) | generic aggregation field names |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #901 | 工厂补货表2.0 | 4 | Inventory | table model | inventory, production, replenishment, returns, sales | table | #873 | #960 | 补货面板 | generic aggregation field names; missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #906, #928 |  | many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 |  |  | not referenced by dashboards or downstream cards |
| #913 | 订单 Sales 原始表 | 4 | VIP | question | logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #914 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | VIP | question | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  |  | not referenced by dashboards or downstream cards |
| #915 | 箱单 Items | 4 | VIP | question | finance, logistics, production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #916 | PO Items | 4 | VIP | question | production, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #917 | Reports Customer Returns Data | 4 | VIP | question | returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #918 | Amazon Settlement | 4 | VIP | question | advertising, finance, replenishment, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #919 | Sales QTY & Dollar | 4 | VIP | dashboard component | sales | line |  |  | VIP专属数据面板 | generic aggregation field names; missing description |
| #920 | 产品订单曲线 Cum Sales QTY Per SKU (NO VINE) | 4 | Sales | dashboard component | sales | line | #776 |  | Sales Dashboard, 补货面板 | generic aggregation field names; missing description |
| #921 | 清仓表 | 4 | Inventory | question | inventory, logistics, production, replenishment, sales | table | #878 |  |  | missing description; not referenced by dashboards or downstream cards |
| #928 | 按SKU全摊薄已售经营表现底表 | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #733, #806, #904 | #929, #932, #933, #935, #938, #939, #940, #942, #943, #969 |  | high reuse / change carefully |
| #929 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, inventory, returns, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |  |
| #930 | 订单 + 发货 + 库存 | 4 | VIP | question | finance, inventory, logistics, production, replenishment, sales | table | #873 |  |  | missing description; not referenced by dashboards or downstream cards |
| #931 | 订单 + 发货 + 库存  透视表 | 4 | VIP | question | inventory, logistics, production, replenishment, sales | pivot | #873 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #932 | Cumulative Sold Operating ROI Trend (累计已售经营ROI趋势) | 4 | Finance | dashboard component | finance, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |  |
| #933 | Allocated Cost Structure Source (按SKU已分摊成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #934, #936, #937 |  |  |
| #934 | Monthly Cost Mix Trend (月度成本占比趋势) | 4 | Finance | dashboard component | finance, sales | area | #933 |  | Cost (成本看板) |  |
| #935 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | area | #928 |  | Cost (成本看板) | generic aggregation field names |
| #936 | Total Cost Mix (总成本占比) | 4 | Finance | dashboard component | finance, sales | pie | #933 |  | Cost (成本看板) |  |
| #937 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #933 |  | Cost (成本看板) |  |
| #938 | Monthly Sold Operating ROI Trend (月度已售经营ROI趋势) | 4 | Finance | dashboard component | finance, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |  |
| #939 | Monthly Sold Operating ROI MoM Change (月度已售经营ROI环比变化) | 4 | Finance | dashboard component | finance, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |  |
| #940 | Cumulative Net Profit Ranking (累计净利排行) | 4 | Finance | dashboard component | finance, sales | row | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) | missing description |
| #942 | 透视图例子111 | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | pivot | #928 |  |  | missing description; not referenced by dashboards or downstream cards |
| #943 | Monthly Cost-to-Sales Ratio Source (月度成本占销售额比率底表) | 4 | Base | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #949 |  |  |
| #948 | Monthly Cost-to-Sales Ratio (月度成本和净利占销售额比率曲线) | 4 | Finance | dashboard component | finance, sales | line | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |  |
| #949 | Cost Pivot Table by Store & Marketplace (按店铺成本透视表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #943 |  | Cost (成本看板) |  |
| #950 | 下单量 | 4 | Inventory | dashboard component | inventory, sales | pivot |  |  | 补货面板 | generic aggregation field names; missing description |
| #954 | 30 Days Sales (IQR Denoised) | 4 | Inventory | model | inventory, sales | table | #776 | #877 |  |  |
| #958 | Quantity Sold By Color | 4 | Sales | dashboard component | sales | pie | #776 |  | Sales Dashboard | generic aggregation field names; missing description |
| #959 | Quantity Sold By Sizes | 4 | Sales | dashboard component | sales | pie | #776 |  | Sales Dashboard | generic aggregation field names; missing description |
| #960 | 工厂下单 Color Size Sales Weighted Mix | 4 | Inventory | question | inventory, production, replenishment, sales | table | #878, #901 |  |  | missing description; not referenced by dashboards or downstream cards |
| #961 | Return By Color By Product | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #966 | Quantity Sold By SKU X Marketplace | 4 | Sales | dashboard component | sales | table | #776 |  | Sales Dashboard | generic aggregation field names; missing description |
| #967 | V Settlement Model, Filtered by Sub Category is promotion_deal_fees | 4 | Temp | question | advertising, finance, replenishment, sales | table | #742 |  |  | missing description; not referenced by dashboards or downstream cards |
| #968 | V Settlement Model, Filtered by Sub Category is promotion_deal_fees line graph | 4 | Temp | question | advertising, finance, replenishment, sales | line | #742 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #969 | Cost & Net Profit Structure Source (成本与净利润结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #948, #970, #971, #972 |  |  |
| #970 | Monthly Cost-to-Sales Ratio (月度成本和净利占销售额比率柱状图) | 4 | Finance | dashboard component | finance, sales | bar | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |  |
| #971 | Cost & Net Profit Pie (成本与净利润饼图) | 4 | Finance | question | finance | pie | #969 |  |  | not referenced by dashboards or downstream cards |
| #972 | Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表) | 4 | Finance | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |  |

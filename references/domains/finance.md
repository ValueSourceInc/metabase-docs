# Finance Domain

Cards classified into this domain: 86

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table |  | #411, #424, #425 |  | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #584 | Production Cost Over Time | 4 | Production Costs | model | finance, production, sales | table |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #585 | Shipping Cost Over Time | 4 | Shipment Costs | model | finance, logistics, replenishment, sales | table |  | #757 |  | generic aggregation field names; missing description |
| #621 | AVG Production & Shipment Cost By SKU | 4 | Cost | table model | finance, logistics, production, replenishment, sales | table |  | #745, #904 |  | generic aggregation field names; missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #904, #914, #967, #968 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #752, #888, #893 |  | generic aggregation field names; many upstream dependencies; missing description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #809 | Reports Merchant Listings All Data Model | 4 | Inventory | model | finance, inventory, logistics, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #899 | Wps Shipment Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #900 | Wps Shipment Items Model | 4 | Sales Forecast | model | finance, logistics, production, replenishment, sales | table |  | #878 |  | missing description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #906, #928 |  | many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 |  |  | not referenced by dashboards or downstream cards |
| #928 | 按SKU全摊薄已售经营表现底表 | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #733, #806, #904 | #929, #932, #933, #935, #938, #939, #940, #942, #943, #969 |  | high reuse / change carefully |
| #933 | Allocated Cost Structure Source (按SKU已分摊成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #934, #936, #937 |  |  |
| #943 | Monthly Cost-to-Sales Ratio Source (月度成本占销售额比率底表) | 4 | Base | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #949 |  |  |
| #969 | Cost & Net Profit Structure Source (成本与净利润结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #928 | #948, #970, #972 |  |  |
| #972 | Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表) | 4 | Finance | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |  |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #314 | Purchase Amount and Quantity Distribution by Race | 4 | 前期用户画像市场分析 | dashboard component | finance, sales | row |  |  | 亚马逊用户肖像分布 |
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
| #801 | 店铺 实际销售总金额 | 4 | Sales | dashboard component | finance, sales | scalar | #742 |  | Store Monitor Dashboard |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Settlement & Inventory Investment (实时结算与库存投入看板） |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  | Cost (成本看板) |
| #929 | Cumulative Sold Operating Performance (累计已售经营表现) | 4 | Finance | dashboard component | finance, inventory, returns, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #932 | Cumulative Sold Operating ROI Trend (累计已售经营ROI趋势) | 4 | Finance | dashboard component | finance, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #934 | Monthly Cost Mix Trend (月度成本占比趋势) | 4 | Finance | dashboard component | finance, sales | area | #933 |  | Cost (成本看板) |
| #935 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | area | #928 |  | Cost (成本看板) |
| #936 | Total Cost Mix (总成本占比) | 4 | Finance | dashboard component | finance, sales | pie | #933 |  | Cost (成本看板) |
| #937 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #933 |  | Cost (成本看板) |
| #938 | Monthly Sold Operating ROI Trend (月度已售经营ROI趋势) | 4 | Finance | dashboard component | finance, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #939 | Monthly Sold Operating ROI MoM Change (月度已售经营ROI环比变化) | 4 | Finance | dashboard component | finance, sales | line | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #940 | Cumulative Net Profit Ranking (累计净利排行) | 4 | Finance | dashboard component | finance, sales | row | #928 |  | Sold Contribution Profit Dashboard (已售贡献利润看板) |
| #948 | Monthly Cost-to-Sales Ratio (月度成本和净利占销售额比率曲线) | 4 | Finance | dashboard component | finance, sales | line | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |
| #949 | Cost Pivot Table by Store & Marketplace (按店铺成本透视表) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #943 |  | Cost (成本看板) |
| #970 | Monthly Cost-to-Sales Ratio (月度成本和净利占销售额比率柱状图) | 4 | Finance | dashboard component | finance, sales | bar | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |
| #972 | Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表) | 4 | Finance | model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #969 |  | Cost & Net Profit Dashboard (成本与净利润看板) |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | finance | ' _catalog.md`

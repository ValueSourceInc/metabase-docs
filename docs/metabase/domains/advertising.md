# Advertising Domain

Cards classified into this domain: 58

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #302 | Pillow Search Volume Xiyou | 4 | 前期用户画像市场分析 | model | advertising | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #398 | Ads SP Gross And Invalids | 4 | Ads SP Models | model | advertising | table | #402 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #402 | List SP Campaign Model | 4 | Ads SP Models | source model | advertising | table |  | #398, #403, #703, #704 |  | generic aggregation field names; missing description |
| #403 | Ads SP Campaign Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #853 | #388, #705, #708, #709, #710, #711, #712, #713, #714 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #411 | SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance, sales | table | #413, #853 | #458, #720, #721, #722, #723, #724, #725, #726, #727, #728 |  | generic aggregation field names; high reuse / change carefully; missing description |
| #413 | List SB Campaign Model | 4 | Ads SB Models | source model | advertising, finance | table |  | #411, #424, #425 |  | generic aggregation field names; missing description |
| #424 | SB SearchTerm Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #719, #853 | #729 |  | generic aggregation field names; missing description |
| #425 | SB Targeting Model | 4 | Ads SB Models | model | advertising, finance, sales | table | #413, #853 | #730, #732 |  | generic aggregation field names; missing description |
| #703 | Ads Sp Searchterm Model | 4 | Ads SP Models | model | advertising, finance, sales | table | #402, #761, #853 | #715 |  | generic aggregation field names; missing description |
| #704 | Ads Sp Targeting Model | 4 | Ads SP Models | source model | advertising, finance, sales | table | #402, #761, #853 | #718, #731, #763 |  | generic aggregation field names; missing description |
| #707 | List SP Keywords Model | 4 | Ads SP Models | model | advertising | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #719 | List SB Keywords Model | 4 | Ads SB Models | model | advertising | table |  | #424 |  | missing description |
| #742 | V Settlement Model | 4 | Base | source model | advertising, finance, replenishment, sales | table | #853 | #743, #745, #746, #751, #801, #896, #904, #914 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #761 | List SP Keywords Model DISTINCT | 4 | Ads SP Models | model | advertising, sales | table |  | #703, #704 |  | missing description; native SQL without business description |
| #777 | Parent SKU Natural Sales Daily Model | 4 | Natural Sales | source model | advertising, finance, sales | table |  | #778, #779, #780 |  | missing description; native SQL without business description |
| #888 | Actual Store Revenue X Production & Shipment Costs Over Time Model | 4 | Base | model | advertising, finance, logistics, production, replenishment, sales | table | #745, #754, #756 | #871 |  | missing description; native SQL without business description |
| #893 | ROI Per Sku Base Model | 4 | Base | table model | advertising, finance, logistics, production, sales | table | #745, #885, #886 | #887, #895 |  | missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #388 | Campaign CTR | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring |
| #458 | SB Campaign Video Metrics | 4 | SB Ads | dashboard component | advertising, sales | combo | #411 |  | SB Ads Monitoring |
| #705 | Campaign CTR Summarized Trend Line | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring |
| #708 | Campaign CTR Pie | 4 | SP Ads | dashboard component | advertising | pie | #403 |  | SP Ads Monitoring |
| #709 | Campaign CVR | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring |
| #710 | Campaign CVR Summarized Trend Line | 4 | SP Ads | dashboard component | advertising | line | #403 |  | SP Ads Monitoring |
| #711 | Campaign CVR Pie | 4 | SP Ads | dashboard component | advertising | pie | #403 |  | SP Ads Monitoring |
| #712 | Campaign ACOS | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring |
| #713 | Campaign ACOS Pie | 4 | SP Ads | dashboard component | advertising, finance, sales | pie | #403 |  | SP Ads Monitoring |
| #714 | Campaign ACOS Summarized Trend Line | 4 | SP Ads | dashboard component | advertising, finance, sales | line | #403 |  | SP Ads Monitoring |
| #715 | SearchTerm Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #703 |  | SP Ads Monitoring |
| #718 | Targeting Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring |
| #720 | SB Campaign CTR | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring |
| #721 | SB Campaign CTR Summarized Trend Line | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring |
| #722 | SB Campaign CTR Pie | 4 | SB Ads | dashboard component | advertising | pie | #411 |  | SB Ads Monitoring |
| #723 | SB Campaign CVR | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring |
| #724 | SB Campaign CVR Summarized Trend Line | 4 | SB Ads | dashboard component | advertising | line | #411 |  | SB Ads Monitoring |
| #725 | SB Campaign CVR Pie | 4 | SB Ads | dashboard component | advertising | pie | #411 |  | SB Ads Monitoring |
| #726 | SB Campaign ACOS | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring |
| #727 | SB Campaign ACOS Summarized Trend Line | 4 | SB Ads | dashboard component | advertising, finance, sales | line | #411 |  | SB Ads Monitoring |
| #728 | SB Campaign ACOS Pie | 4 | SB Ads | dashboard component | advertising, finance, sales | pie | #411 |  | SB Ads Monitoring |
| #729 | SB SearchTerm Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #424 |  | SB Ads Monitoring |
| #730 | SB Targeting Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring |
| #731 | Targeting Negative Performance Table | 4 | SP Ads | dashboard component | advertising, finance, sales | table | #704 |  | SP Ads Monitoring |
| #732 | SB Targeting Negative Performance Table | 4 | SB Ads | dashboard component | advertising, finance, sales | table | #425 |  | SB Ads Monitoring |
| #778 | Bar - Natural sales | 4 | Natural Sales | dashboard component | advertising, sales | bar | #777 |  | Natural Sales |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) |

> For the full card list in this domain, grep `_catalog.md`: `grep ' | advertising | ' _catalog.md`

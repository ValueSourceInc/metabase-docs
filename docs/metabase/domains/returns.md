# Returns Domain

Cards classified into this domain: 31

## Likely Source Models

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 | missing description |
| #902 | SKU Controllable Cost Source (SKU可控成本分析底表) | 4 | Lim Wang's Personal Collection | table model | advertising, finance, inventory, logistics, production, returns, sales | table | #742, #745, #885, #886 | #898 |  | many upstream dependencies; missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |

## Dashboard Components

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | #733, #776 |  | Returns |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | #733 |  | Returns |
| #788 | Returns Reason Pivot | 4 | Returns | dashboard component | returns, sales | pivot | #733 |  | Returns |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) |

## Cleanup / Review Candidates

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #560 | DH Canada 库存表 DH-BT-BRAID-BG-TH | 4 | Serene Xuan's Personal Collection | question | inventory, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #566 | Graph 1 | 4 | Admin VS's Personal Collection | question | returns, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #744 | Sellable Quantity from Returns By SKU X Order | 4 | Base | question | returns, sales | line | #733 | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #783 | Return Parent ASIN Pie | 4 | Returns | question | production, replenishment, returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | #733 |  | Returns | generic aggregation field names; missing description |
| #787 | Return SKU Pie | 4 | Returns | question | returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #788 | Returns Reason Pivot | 4 | Returns | dashboard component | returns, sales | pivot | #733 |  | Returns | generic aggregation field names; missing description |
| #789 | Sellable Quantity from Returns By SKU X Order | 4 | Returns | question | returns, sales | line | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 | missing description |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) | generic aggregation field names; mixed finance and inventory timing |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | question | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  |  | generic aggregation field names; not referenced by dashboards or downstream cards |
| #898 | SKU Controllable Expense-to-Sales Ratio Trend (SKU可控费用销售占比趋势) | 4 | Lim Wang's Personal Collection | question | advertising, finance, inventory, logistics, production, returns, sales | line | #902 |  |  | missing description; not referenced by dashboards or downstream cards |
| #902 | SKU Controllable Cost Source (SKU可控成本分析底表) | 4 | Lim Wang's Personal Collection | table model | advertising, finance, inventory, logistics, production, returns, sales | table | #742, #745, #885, #886 | #898 |  | many upstream dependencies; missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #905 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |
| #909 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #906 |  |  | missing description; not referenced by dashboards or downstream cards |
| #914 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | VIP | question | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  |  | not referenced by dashboards or downstream cards |
| #917 | Reports Customer Returns Data | 4 | VIP | question | returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |

## All Cards

| ID | Name | DB | Collection | Type | Domains | Display | Upstream | Downstream | Dashboards | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #488 | Payment report | 4 | DCMS 开发测试 | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #489 | Payment report - Duplicate | 4 | Serene Xuan's Personal Collection | question | advertising, finance, inventory, logistics, replenishment, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #560 | DH Canada 库存表 DH-BT-BRAID-BG-TH | 4 | Serene Xuan's Personal Collection | question | inventory, returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |
| #566 | Graph 1 | 4 | Admin VS's Personal Collection | question | returns, sales | line |  |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #733 | Reports Customer Returns Data Model | 4 | Returns | source model | returns, sales | table |  | #744, #781, #782, #783, #784, #785, #786, #787, #788, #789 |  | high reuse / change carefully; missing description |
| #744 | Sellable Quantity from Returns By SKU X Order | 4 | Base | question | returns, sales | line | #733 | #745, #904 |  | generic aggregation field names; missing description |
| #745 | Store Profit By SKU X Order Model | 4 | Base | source model | advertising, finance, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #749, #750, #752, #888, #893, #902 |  | generic aggregation field names; high reuse / change carefully; many upstream dependencies; missing description |
| #781 | Overall Refund Rate Over Time | 4 | Returns | dashboard component | returns, sales | line | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #782 | Color Returns | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #783 | Return Parent ASIN Pie | 4 | Returns | question | production, replenishment, returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #784 | Return Rate By SKU | 4 | Returns | dashboard component | returns, sales | pie | #733, #776 |  | Returns | generic aggregation field names; missing description |
| #785 | Return Reason Pie | 4 | Returns | dashboard component | production, replenishment, returns, sales | pie | #733 |  | Returns | generic aggregation field names; missing description |
| #786 | Returns By Disposition Type | 4 | Returns | dashboard component | returns, sales | line | #733 |  | Returns | generic aggregation field names; missing description |
| #787 | Return SKU Pie | 4 | Returns | question | returns, sales | pie | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #788 | Returns Reason Pivot | 4 | Returns | dashboard component | returns, sales | pivot | #733 |  | Returns | generic aggregation field names; missing description |
| #789 | Sellable Quantity from Returns By SKU X Order | 4 | Returns | question | returns, sales | line | #733 |  |  | generic aggregation field names; missing description; not referenced by dashboards or downstream cards |
| #803 | SalesAndTrafficByDate Model | 4 | Sales | source model | finance, returns, sales | table | #853 | #840, #845, #846, #847, #848, #849 |  | high reuse / change carefully; missing description |
| #805 | Reports Get Fba Myi All Inventory Model | 4 | Inventory | model | inventory, returns, sales | table | #853 | #806 |  | missing description |
| #806 | 库存表 | 4 | Inventory | table model | inventory, returns, sales | table | #805 | #811, #877 | 补货面板 | missing description |
| #840 | 产品页流量+销售转化率 Over Time | 4 | Sales | dashboard component | returns, sales | line | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #849 | 店铺 访问/购买 率 | 4 | Sales | dashboard component | returns, sales | scalar | #803 |  | Store Monitor Dashboard | generic aggregation field names; missing description |
| #871 | Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势) | 4 | Finance | dashboard component | advertising, finance, inventory, logistics, production, replenishment, returns, sales | line | #888 |  | Operating Performance and ROI Dashboard (经营表现与ROI看板) | generic aggregation field names; mixed finance and inventory timing |
| #896 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | Finance | question | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  |  | generic aggregation field names; not referenced by dashboards or downstream cards |
| #898 | SKU Controllable Expense-to-Sales Ratio Trend (SKU可控费用销售占比趋势) | 4 | Lim Wang's Personal Collection | question | advertising, finance, inventory, logistics, production, returns, sales | line | #902 |  |  | missing description; not referenced by dashboards or downstream cards |
| #902 | SKU Controllable Cost Source (SKU可控成本分析底表) | 4 | Lim Wang's Personal Collection | table model | advertising, finance, inventory, logistics, production, returns, sales | table | #742, #745, #885, #886 | #898 |  | many upstream dependencies; missing description; native SQL without business description |
| #904 | Sold Operating Performance Source (已售经营表现底表) | 4 | Base | source model | advertising, finance, inventory, logistics, production, replenishment, returns, sales | table | #621, #742, #743, #744 | #747, #905, #906, #910, #911, #912 |  | high reuse / change carefully; many upstream dependencies |
| #905 | Cumulative Cost Structure (累计成本结构) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #904 |  |  | missing description; not referenced by dashboards or downstream cards |
| #906 | Cost Structure Source (成本结构底表) | 4 | Base | source model | advertising, finance, inventory, logistics, replenishment, returns, sales | table | #904 | #907, #908, #909 |  | missing description; native SQL without business description |
| #909 | Monthly Cost MoM Growth Trend (月度成本环比增幅趋势) | 4 | Finance | question | advertising, finance, inventory, logistics, replenishment, returns, sales | line | #906 |  |  | missing description; not referenced by dashboards or downstream cards |
| #914 | Amazon Settlement Cost Breakdown (亚马逊结算成本分析表) | 4 | VIP | question | advertising, finance, inventory, logistics, returns, sales | pivot | #742 |  |  | not referenced by dashboards or downstream cards |
| #917 | Reports Customer Returns Data | 4 | VIP | question | returns, sales | table |  |  |  | missing description; not referenced by dashboards or downstream cards |

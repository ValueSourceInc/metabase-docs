# Individual Card Details

192 cards documented. Each file contains full field metadata, description, upstream/downstream dependencies, and risk flags.

Use `_catalog.md` for discovery (one line per card); read individual files when you need field-level detail.

## Quick Start

- Known card ID: Read `cards/{id}.md` directly. Example: `cards/747.md`.
- Need full upstream/downstream/dashboard references: `grep '"<id>"' _deps.json`.
- Need to find a card by name, domain, or collection first: use `_catalog.md`.
- Do **not** scan the full card-detail directory for dependencies; that repeats data already in `_deps.json`.

## Cards by Collection

### Ads SB Models (5 cards)

- [#411 SB Campaign Model](411.md)
- [#413 List SB Campaign Model](413.md)
- [#424 SB SearchTerm Model](424.md)
- [#425 SB Targeting Model](425.md)
- [#719 List SB Keywords Model](719.md)

### Ads SP Models (7 cards)

- [#398 Ads SP Gross And Invalids](398.md)
- [#402 List SP Campaign Model](402.md)
- [#403 Ads SP Campaign Model](403.md)
- [#703 Ads Sp Searchterm Model](703.md)
- [#704 Ads Sp Targeting Model](704.md)
- [#707 List SP Keywords Model](707.md)
- [#761 List SP Keywords Model DISTINCT](761.md)

### Alerts (1 cards)

- [#476 SKU订单预警](476.md)

### Base (15 cards)

- [#742 V Settlement Model](742.md)
- [#743 Quantity Purchased By Order ID X SKU](743.md)
- [#744 Sellable Quantity from Returns By SKU X Order](744.md)
- [#745 Store Profit By SKU X Order Model](745.md)
- [#746 Platform Advertisement Cost Over Time](746.md)
- [#751 Profit X Cost Analysis SKU Pivot](751.md)
- [#853 Exchange Rates](853.md)
- [#888 Actual Store Revenue X Production & Shipment Costs Over Time Model](888.md)
- [#893 ROI Per Sku Base Model](893.md)
- [#904 Sold Operating Performance Source (已售经营表现底表)](904.md)
- [#906 Cost Structure Source (成本结构底表)](906.md)
- [#928 按SKU全摊薄已售经营表现底表](928.md)
- [#933 Allocated Cost Structure Source (按SKU已分摊成本结构底表)](933.md)
- [#943 Monthly Cost-to-Sales Ratio Source (月度成本占销售额比率底表)](943.md)
- [#969 Cost & Net Profit Structure Source (成本与净利润结构底表)](969.md)

### Cost (1 cards)

- [#621 AVG Production & Shipment Cost By SKU](621.md)

### DCMS 开发测试 (8 cards)

- [#409 Dify 测试空数据](409.md)
- [#465 VS 产品销售曲线Alert Test](465.md)
- [#488 Payment report](488.md)
- [#568 DH Amazon Parent SKU 销售比例 - Modified](568.md)
- [#649 DH Amazon Parent SKU 销售比例 - 复制测试](649.md)
- [#763 Targeting Performance Table Test Check](763.md)
- [#792 DH 工厂补货表 - 16 sku](792.md)
- [#942 透视图例子111](942.md)

### Finance (16 cards)

- [#871 Cumulative Settlement & Inventory Investment Trend (累计结算与库存投入趋势)](871.md)
- [#896 Amazon Settlement Cost Breakdown (亚马逊结算成本分析表)](896.md)
- [#929 Cumulative Sold Operating Performance (累计已售经营表现)](929.md)
- [#932 Cumulative Sold Operating ROI Trend (累计已售经营ROI趋势)](932.md)
- [#934 Monthly Cost Mix Trend (月度成本占比趋势)](934.md)
- [#935 Cumulative Cost Structure (累计成本结构)](935.md)
- [#936 Total Cost Mix (总成本占比)](936.md)
- [#937 Monthly Cost MoM Growth Trend (月度成本环比增幅趋势)](937.md)
- [#938 Monthly Sold Operating ROI Trend (月度已售经营ROI趋势)](938.md)
- [#939 Monthly Sold Operating ROI MoM Change (月度已售经营ROI环比变化)](939.md)
- [#940 Cumulative Net Profit Ranking (累计净利排行)](940.md)
- [#948 Monthly Cost-to-Sales Ratio (月度成本和净利占销售额比率曲线)](948.md)
- [#949 Cost Pivot Table by Store & Marketplace (按店铺成本透视表)](949.md)
- [#970 Monthly Cost-to-Sales Ratio (月度成本和净利占销售额比率柱状图)](970.md)
- [#971 Cost & Net Profit Pie (成本与净利润饼图)](971.md)
- [#972 Cost & Net Profit % of Sales Pivot (成本与净利占销售额比透视表)](972.md)

### Inventory (12 cards)

- [#805 Reports Get Fba Myi All Inventory Model](805.md)
- [#806 库存表](806.md)
- [#807 30 Days Sales](807.md)
- [#809 Reports Merchant Listings All Data Model](809.md)
- [#811 补货 Fulfillable Inventory Chart](811.md)
- [#851 7 Days Sales](851.md)
- [#873 补货 FBA Total Inventory Chart 2.0](873.md)
- [#901 工厂补货表2.0](901.md)
- [#921 清仓表](921.md)
- [#950 下单量](950.md)
- [#954 30 Days Sales (IQR Denoised)](954.md)
- [#960 工厂下单 Color Size Sales Weighted Mix](960.md)

### Natural Sales (4 cards)

- [#777 Parent SKU Natural Sales Daily Model](777.md)
- [#778 Bar - Natural sales](778.md)
- [#779 Combo - Natural Sales Daily Over Time](779.md)
- [#780 Line - Natural Sales Daily By Parent SKU](780.md)

### Production Costs (9 cards)

- [#573 Production Cost Per SKU Pie](573.md)
- [#574 Production Cost Per SKU Over Time](574.md)
- [#575 Production Unit Cost Per SKU Over Time](575.md)
- [#577 Production Cost Sum Over Time](577.md)
- [#584 Production Cost Over Time](584.md)
- [#595 Production Cost Over Time Per Parent ASIN](595.md)
- [#754 Production Cost Over Time New](754.md)
- [#758 Production Cost Over Sum Time New](758.md)
- [#886 Production Cost Over Time By Sku](886.md)

### Returns (11 cards)

- [#733 Reports Customer Returns Data Model](733.md)
- [#781 Overall Refund Rate Over Time](781.md)
- [#782 Return Reason is Color By Product](782.md)
- [#783 Return Parent ASIN Pie](783.md)
- [#784 Return Rate By SKU](784.md)
- [#785 Return Reason Pie](785.md)
- [#786 Returns By Disposition Type](786.md)
- [#787 Return SKU Pie](787.md)
- [#788 Returns Reason Pivot](788.md)
- [#789 Sellable Quantity from Returns By SKU X Order](789.md)
- [#961 Return By Color By Product](961.md)

### Sales (28 cards)

- [#776 Reports Flat File All Orders Data By Order Date General Hourly Model](776.md)
- [#791 Sales $ By Product Over Time](791.md)
- [#793 Sales U By Product Over Time](793.md)
- [#795 出售地区 US](795.md)
- [#796 产品订单SKU分布 Pie (NO VINE)](796.md)
- [#797 产品订单曲线 (NO VINE) Sales Line](797.md)
- [#798 产品订单曲线 Per SKU](798.md)
- [#799 产品销售曲线 By Day](799.md)
- [#800 实时产品销售曲线 (每小时更新)](800.md)
- [#801 店铺 实际销售总金额](801.md)
- [#802 店铺 实际销量](802.md)
- [#803 SalesAndTrafficByDate Model](803.md)
- [#840 产品页流量+销售转化率 Over Time](840.md)
- [#841 Amazon Parent SKU 销售比例](841.md)
- [#842 Amazon 产品销售比例](842.md)
- [#843 Amazon 产品销售比例 Pie By Parent Asin X Color X Size](843.md)
- [#844 Amazon 产品销售比例 Pie By Parent Asin X Size X Color](844.md)
- [#845 SalesAndTrafficByDate Model, Sum of TrafficByDate.sessions](845.md)
- [#846 店铺 总用户访问次数](846.md)
- [#847 店铺 用户量](847.md)
- [#848 店铺 访问次数](848.md)
- [#849 店铺 访问/购买 率](849.md)
- [#852 出售地区 CA](852.md)
- [#874 产品订单曲线 Per SKU (NO VINE)](874.md)
- [#920 产品订单曲线 Cum Sales QTY Per SKU (NO VINE)](920.md)
- [#958 Quantity Sold By Color](958.md)
- [#959 Quantity Sold By Sizes](959.md)
- [#966 Quantity Sold By SKU X Marketplace](966.md)

### Sales Forecast (9 cards)

- [#870 SKU First Sale Date](870.md)
- [#875 Wps Sales Forecast](875.md)
- [#876 Wps Sales Forecast By Day](876.md)
- [#877 发货基础表](877.md)
- [#878 备货发货 Forecast WOS Summary](878.md)
- [#879 未来有效日销model](879.md)
- [#880 未来日销趋势](880.md)
- [#899 Wps Shipment Model](899.md)
- [#900 Wps Shipment Items Model](900.md)

### SB Ads (13 cards)

- [#458 SB Campaign Video Metrics](458.md)
- [#720 SB Campaign CTR](720.md)
- [#721 SB Campaign CTR Summarized Trend Line](721.md)
- [#722 SB Campaign CTR Pie](722.md)
- [#723 SB Campaign CVR](723.md)
- [#724 SB Campaign CVR Summarized Trend Line](724.md)
- [#725 SB Campaign CVR Pie](725.md)
- [#726 SB Campaign ACOS](726.md)
- [#727 SB Campaign ACOS Summarized Trend Line](727.md)
- [#728 SB Campaign ACOS Pie](728.md)
- [#729 SB SearchTerm Performance Table](729.md)
- [#730 SB Targeting Performance Table](730.md)
- [#732 SB Targeting Negative Performance Table](732.md)

### Shipment Costs (9 cards)

- [#504 Shipping Cost Actual Payment Per SKU Over Time](504.md)
- [#505 Shipping Cost Payment Per SKU  Pie](505.md)
- [#571 Shipping Cost Estimated Payment (By Pickup Date) Per SKU](571.md)
- [#572 Shipment Cost Per Item Per SKU Over Time](572.md)
- [#578 Shipping Cost Sum Over Time](578.md)
- [#585 Shipping Cost Over Time](585.md)
- [#756 Shipping Cost Over Time New](756.md)
- [#757 Shipping Cost Sum Over Time New](757.md)
- [#885 Shipping Cost Over Time By Sku](885.md)

### SP Ads (12 cards)

- [#388 Campaign CTR](388.md)
- [#705 Campaign CTR Summarized Trend Line](705.md)
- [#708 Campaign CTR Pie](708.md)
- [#709 Campaign CVR](709.md)
- [#710 Campaign CVR Summarized Trend Line](710.md)
- [#711 Campaign CVR Pie](711.md)
- [#712 Campaign ACOS](712.md)
- [#713 Campaign ACOS Pie](713.md)
- [#714 Campaign ACOS Summarized Trend Line](714.md)
- [#715 SearchTerm Performance Table](715.md)
- [#718 Targeting Performance Table](718.md)
- [#731 Targeting Negative Performance Table](731.md)

### Store Revenue (1 cards)

- [#752 Store Profit Over Time New](752.md)

### Temp (2 cards)

- [#967 V Settlement Model, Filtered by Sub Category is promotion\_deal\_fees](967.md)
- [#968 V Settlement Model, Filtered by Sub Category is promotion\_deal\_fees line graph](968.md)

### VIP (9 cards)

- [#913 订单 Sales 原始表](913.md)
- [#914 Amazon Settlement Cost Breakdown (亚马逊结算成本分析表)](914.md)
- [#915 箱单 Items](915.md)
- [#916 PO Items](916.md)
- [#917 Reports Customer Returns Data](917.md)
- [#918 Amazon Settlement](918.md)
- [#919 Sales QTY & Dollar](919.md)
- [#930 订单 + 发货 + 库存](930.md)
- [#931 订单 + 发货 + 库存  透视表](931.md)

### 关键词分析 (2 cards)

- [#318 关键词搜索趋势视图](318.md)
- [#319 关键词竞争情况视图](319.md)

### 前期用户画像市场分析 (5 cards)

- [#302 Pillow Search Volume Xiyou](302.md)
- [#303 Pillow User Search Keywords](303.md)
- [#304 Pillow Word Segmentation](304.md)
- [#313 Purchase Quantity Distribution by State](313.md)
- [#314 Purchase Amount and Quantity Distribution by Race](314.md)

### 订单/船务数据 (Cynthia) (12 cards)

- [#625 FBA Shipment 表 Metric Unit (CA)](625.md)
- [#676 工厂大合同](676.md)
- [#683 Shipment Pricing Model (Old)](683.md)
- [#685 工厂小合同](685.md)
- [#686 FBA Shipment 表 Imperial Unit (US)](686.md)
- [#700 DHM 箱单 By SKU](700.md)
- [#701 DHM 箱单 By Product Group](701.md)
- [#755 DH 船务小合同](755.md)
- [#835 VS 箱单 By SKU](835.md)
- [#836 Shipment Pricing Model (UI)](836.md)
- [#837 VS 箱单 By Product Group](837.md)
- [#838 缺Pricing 的 SKU](838.md)

### 运营数据 (1 cards)

- [#594 Shipment Finder](594.md)

WITH v_led AS (
  SELECT DISTINCT ON (l.custom_store, l."MSKU", l."Date")
         l.custom_store AS store, l."MSKU" AS sku, l."Ending Warehouse Balance"::int AS e
  FROM reports__get_ledger_summary_main l
  JOIN (SELECT custom_store, "MSKU", max("Date") AS d
        FROM reports__get_ledger_summary_main
        WHERE "Location"='CA' AND "Disposition"='SELLABLE'
        GROUP BY 1,2) mx
    ON mx.custom_store=l.custom_store AND mx."MSKU"=l."MSKU" AND mx.d=l."Date"
  JOIN (SELECT custom_store, max("Date") AS gd
        FROM reports__get_ledger_summary_main
        WHERE "Location"='CA' AND "Disposition"='SELLABLE'
        GROUP BY 1) gm
    ON gm.custom_store=l.custom_store AND mx.d >= gm.gd - 1
  WHERE l."Location"='CA' AND l."Disposition"='SELLABLE'
  ORDER BY l.custom_store, l."MSKU", l."Date", l."Ending Warehouse Balance" DESC
),
v_us AS (
  SELECT pm.store, m2.sku,
         m2."afn-warehouse-quantity"::int AS whq, m2."afn-fulfillable-quantity"::int AS ffq,
         m2."afn-unsellable-quantity"::int AS usq, m2."afn-reserved-quantity"::int AS rsq,
         m2."afn-researching-quantity"::int AS rsrch,
         m2."afn-fc-transfer-quantity"::int AS fct, m2."afn-onhand-buyable-quantity"::int AS ohb,
         m2."afn-reserved-future-supply"::int AS rfs, m2."afn-future-supply-buyable"::int AS fsb
  FROM reports__get_fba_myi_all_inventory__main m2
  JOIN profile_mapping pm ON pm.custom_profile_id = m2.custom_profile_id AND pm.scope = 'US'
),
-- remote 表三组重名列(Offer status/_2/_3)的 marketplace 含义按店不同(报表由 Amazon 按账号决定列序,
-- 导入器按位置加后缀),这里不写死店名,按内容自动定位:有本地 CA 库存(ledger 结存>0)的 SKU,
-- Amazon 必然在 CA 那组写 "local FBA" 互斥文本。无信号时 ca_group=0 -> st=NULL -> 全部不修(失败安全)。
v_narf_raw AS (
  SELECT custom_store, "Merchant SKU" AS sku,
         "Offer status" AS os1, "More Details" AS md1,
         "Offer status_2" AS os2, "More Details_2" AS md2,
         "Offer status_3" AS os3, "More Details_3" AS md3
  FROM {{#1108}}
),
v_grp AS (
  SELECT n.custom_store,
         CASE WHEN c1 > 0 AND c1 >= c2 AND c1 >= c3 THEN 1
              WHEN c2 > 0 AND c2 >= c3 THEN 2
              WHEN c3 > 0 THEN 3
              ELSE 0 END AS ca_group
  FROM (SELECT n.custom_store,
               count(*) FILTER (WHERE n.md1 LIKE '%local FBA%') AS c1,
               count(*) FILTER (WHERE n.md2 LIKE '%local FBA%') AS c2,
               count(*) FILTER (WHERE n.md3 LIKE '%local FBA%') AS c3
        FROM v_narf_raw n
        JOIN v_led l ON l.store = n.custom_store AND l.sku = n.sku AND l.e > 0
        WHERE n.sku NOT LIKE 'amzn%'
        GROUP BY 1) n
),
v_narf AS (
  SELECT n.custom_store, n.sku,
         CASE g.ca_group WHEN 1 THEN n.os1 WHEN 2 THEN n.os2 WHEN 3 THEN n.os3 ELSE NULL END AS st
  FROM v_narf_raw n
  JOIN v_grp g ON g.custom_store = n.custom_store
),
j AS (
  SELECT m.id,
    CASE WHEN p.scope <> 'CA' THEN 'US_MARKETPLACE'
         WHEN m.sku LIKE 'amzn%' THEN 'EXCLUDED_AMZN'
         WHEN u.sku IS NULL THEN 'NO_US_ROW'
         WHEN COALESCE(n.st,'') IN ('Enabled','Action required') THEN
           CASE WHEN COALESCE(l.e,0) > 0 THEN 'LOCAL_STOCK'
                WHEN m."afn-warehouse-quantity"::int = u.whq THEN 'MIRROR'
                ELSE 'MIRROR_LAG' END
         WHEN m."afn-fulfillable-quantity"::int = u.ffq AND m."afn-fulfillable-quantity"::int > 0 THEN 'FFQ_EQ_COINCIDENCE'
         ELSE 'NOT_WHITELISTED' END AS flag,
    l.e AS lede,
    m."afn-warehouse-quantity"::int AS cwhq, m."afn-fulfillable-quantity"::int AS cffq,
    m."afn-unsellable-quantity"::int AS cusq, m."afn-reserved-quantity"::int AS crsq,
    m."afn-researching-quantity"::int AS crsrch,
    m."afn-inbound-working-quantity"::int AS cibw, m."afn-inbound-shipped-quantity"::int AS cibs,
    m."afn-inbound-receiving-quantity"::int AS cibr,
    m."afn-fc-transfer-quantity"::int AS cfct, m."afn-onhand-buyable-quantity"::int AS cohb,
    m."afn-reserved-future-supply"::int AS crfs, m."afn-future-supply-buyable"::int AS cfsb,
    u.whq AS uwhq, u.ffq AS uffq, u.usq AS uusq, u.rsq AS ursq, u.rsrch AS ursrch,
    u.fct AS ufct, u.ohb AS uohb, u.rfs AS urfs, u.fsb AS ufsb
  FROM reports__get_fba_myi_all_inventory__main m
  JOIN profile_mapping p ON p.custom_profile_id = m.custom_profile_id
  LEFT JOIN v_us u ON u.sku = m.sku AND u.store = p.store
  LEFT JOIN v_narf n ON n.sku = m.sku AND n.custom_store = p.store
  LEFT JOIN v_led l ON l.sku = m.sku AND l.store = p.store
),
dec AS (
  SELECT id, flag, lede,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(cwhq-uwhq,0)
         WHEN flag='LOCAL_STOCK' THEN LEAST(cwhq,lede) ELSE cwhq END AS a_whq,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(cffq-uffq,0)
         WHEN flag='LOCAL_STOCK' THEN LEAST(cffq,lede) ELSE cffq END AS a_ffq,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(cusq-uusq,0) ELSE cusq END AS a_usq,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(crsq-ursq,0) ELSE crsq END AS a_rsq,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(crsrch-ursrch,0) ELSE crsrch END AS a_rsrch,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN 0 ELSE cibw END AS a_ibw,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN 0 ELSE cibs END AS a_ibs,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN 0 ELSE cibr END AS a_ibr,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(cfct-ufct,0) ELSE cfct END AS a_fct,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(cohb-uohb,0) ELSE cohb END AS a_ohb,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(crfs-urfs,0) ELSE crfs END AS a_rfs,
    CASE WHEN flag IN ('MIRROR','MIRROR_LAG') THEN GREATEST(cfsb-ufsb,0) ELSE cfsb END AS a_fsb
  FROM j
)
SELECT
  m.id, m.created_at, m.updated_at, m.sku, m.fnsku, m.asin, m."product-name", m.condition, m."your-price",
  m."mfn-listing-exists", m."mfn-fulfillable-quantity", m."afn-listing-exists", m."afn-warehouse-quantity",
  m."afn-fulfillable-quantity", m."afn-unsellable-quantity", m."afn-reserved-quantity", m."afn-total-quantity",
  m."per-unit-volume", m."afn-inbound-working-quantity", m."afn-inbound-shipped-quantity", m."afn-inbound-receiving-quantity",
  m."afn-researching-quantity", m."afn-reserved-future-supply", m."afn-future-supply-buyable", m.store, m.custom_profile_id,
  m."afn-fc-transfer-quantity", m."afn-onhand-buyable-quantity",
  m."your-price" * COALESCE(e.rate, 1) AS price_usd,
  dec.a_whq + dec.a_ibs + dec.a_ibw + dec.a_ibr AS shipped_total,
  dec.a_whq + dec.a_ibs + dec.a_ibw + dec.a_ibr - dec.a_rsq - dec.a_rsrch - dec.a_usq AS sellable_shipped_total,
  p.custom_profile_id AS custom_profile_id_2, p.scope, p.store AS store_2, p.custom_marketplace_id,
  e.from_currency, e.to_currency, e.rate, e.updated_at AS updated_at_2, e.marketplace,
  w.color, w.size, w.type, w.product_description, w.parent_asin_code,
  dec.a_whq AS adjusted_afn_warehouse_quantity,
  dec.a_ffq AS adjusted_afn_fulfillable_quantity,
  dec.a_usq AS adjusted_afn_unsellable_quantity,
  dec.a_rsq AS adjusted_afn_reserved_quantity,
  dec.a_rsrch AS adjusted_afn_researching_quantity,
  dec.a_ibw AS adjusted_afn_inbound_working_quantity,
  dec.a_ibs AS adjusted_afn_inbound_shipped_quantity,
  dec.a_ibr AS adjusted_afn_inbound_receiving_quantity,
  dec.a_whq + dec.a_ibw + dec.a_ibs + dec.a_ibr AS adjusted_afn_total_quantity,
  CASE WHEN dec.flag = 'US_MARKETPLACE' THEN NULL ELSE dec.lede END AS adjusted_ledger_balance,
  dec.flag AS mirror_flag,
  dec.a_fct AS adjusted_afn_fc_transfer_quantity,
  dec.a_ohb AS adjusted_afn_onhand_buyable_quantity,
  dec.a_rfs AS adjusted_afn_reserved_future_supply,
  dec.a_fsb AS adjusted_afn_future_supply_buyable,
  p.scope AS "Profile Mapping - Custom Profile__scope",
  p.store AS "Profile Mapping - Custom Profile__store"
FROM reports__get_fba_myi_all_inventory__main m
JOIN profile_mapping p ON p.custom_profile_id = m.custom_profile_id
LEFT JOIN exchange_rates e ON e.marketplace = p.scope
LEFT JOIN wps.wps_product w ON w.sku = m.sku
LEFT JOIN dec ON dec.id = m.id
WHERE m."afn-total-quantity" > 0
ORDER BY m."afn-fulfillable-quantity" DESC

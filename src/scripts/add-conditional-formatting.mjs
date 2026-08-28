#!/usr/bin/env node
/**
 * Add conditional formatting + percent formats to card 1149 (Campaign Budget Problems)
 * and its dashcard on dashboard 98.
 *
 * Rule schema (extracted from this instance's frontend bundle, Metabase 0.62):
 *   visualization_settings["table.column_formatting"] = [
 *     { columns: ["<col>"], type: "single", operator: ">"|"="|"contains"|"is-null"...,
 *       value: "<string>", color: "#hex", highlight_row: false }, ...
 *   ]
 * Column ref key for column_settings: JSON.stringify(["name","<col>"]) (matches legacy cards).
 * Top rule wins on conflicts.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')];
    })
);
if (env.METABASE_ALLOW_SELF_SIGNED_CERT === 'true') process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const BASE = env.METABASE_API_BASE_URL;
const KEY = env.METABASE_API_KEY;

const CARD_ID = 1149;
const DASH_ID = 98;

const RED = '#EF8C8C';
const ORANGE = '#F2A86F';
const YELLOW = '#F9D45C';
const BLUE = '#509EE3';

async function api(path, method = 'GET', body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'x-api-key': KEY, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(120000),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 300) }; }
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${JSON.stringify(json).slice(0, 800)}`);
  return json;
}
const log = (...a) => console.log(...a);
const rule = (columns, operator, value, color) => ({ columns, type: 'single', operator, value, color, highlight_row: false });

// visualization_settings is a FLAT map - "table.column_formatting" is a top-level key,
// never nested under a "table" object (that was the v1 bug: renderer ignores it silently)
const viz = {
  'table.column_formatting': [
      // utilization % (decimal 0-1) - top rule wins, so 0.95 before 0.7
      rule(['utilization'], '>', '0.95', RED),
      rule(['utilization'], '>', '0.7', YELLOW),
      // ACOS (decimal 0-1)
      rule(['acos'], '>', '0.5', YELLOW),
      // flag verdicts (string equality)
      rule(['flag'], '=', 'NO SALES', RED),
      rule(['flag'], '=', 'CAPPED', ORANGE),
      rule(['flag'], '=', 'HIGH ACOS', YELLOW),
      rule(['flag'], '=', 'UNDER-SPEND', BLUE),
  ],
};

// percent display for the ratio columns (column_settings key = JSON.stringify(["name", col]))
const colKey = (c) => JSON.stringify(['name', c]);
viz.column_settings = {
  [colKey('utilization')]: { number_style: 'percent' },
  [colKey('acos')]: { number_style: 'percent' },
};

// --- 1. card-level: backup, then PUT visualization_settings (gotcha #22: wholesale replace) ---
const card = await api(`/card/${CARD_ID}`);
writeFileSync(`/tmp/card${CARD_ID}_viz_backup.json`, JSON.stringify(card.visualization_settings, null, 2));
log(`backed up card ${CARD_ID} viz settings -> /tmp/card${CARD_ID}_viz_backup.json`);

await api(`/card/${CARD_ID}`, 'PUT', { visualization_settings: viz });
const after = await api(`/card/${CARD_ID}`);
const persisted = after.visualization_settings?.['table.column_formatting']?.length;
log(`card ${CARD_ID}: ${persisted} formatting rules persisted`);
if (persisted !== 7) throw new Error('card-level rules did not persist');

// --- 2. dashcard-level: re-send ALL dashcards (gotcha #40: PUT replaces), rules on 1149's dashcard ---
const dash = await api(`/dashboard/${DASH_ID}`);
writeFileSync(`/tmp/dash${DASH_ID}_backup.json`, JSON.stringify({ parameters: dash.parameters, dashcards: dash.dashcards }, null, 2));
log(`backed up dashboard ${DASH_ID} -> /tmp/dash${DASH_ID}_backup.json`);

const cardsPayload = dash.dashcards.map((dc) => ({
  id: dc.id,
  card_id: dc.card_id,
  dashboard_id: DASH_ID,
  row: dc.row,
  col: dc.col,
  size_x: dc.size_x,
  size_y: dc.size_y,
  visualization_settings: dc.card_id === CARD_ID ? viz : dc.visualization_settings ?? {},
  parameter_mappings: dc.parameter_mappings ?? [],
}));
await api(`/dashboard/${DASH_ID}/cards`, 'PUT', { cards: cardsPayload });
log(`re-sent ${cardsPayload.length} dashcards (1149 dashcard carries the rules)`);

// gotcha #43: /cards PUT can rewrite parameters - re-assert them
await api(`/dashboard/${DASH_ID}`, 'PUT', { parameters: dash.parameters });

// --- 3. verify ---
const check = await api(`/dashboard/${DASH_ID}`);
const params = check.parameters.map((p) => `${p.name}:${p.type}`).join(', ');
const target = check.dashcards.find((dc) => dc.card_id === CARD_ID);
const dcRules = target?.visualization_settings?.['table.column_formatting']?.length;
log(`verify: params=[${params}]`);
log(`verify: dashcard for 1149 has ${dcRules} rules, mappings=${target?.parameter_mappings?.length}`);
if (dcRules !== 7 || target.parameter_mappings?.length !== 4) throw new Error('dashcard-level verification failed');

// query still runs fine with the new settings
const q = await api(`/dashboard/${DASH_ID}/dashcard/${target.id}/card/${CARD_ID}/query`, 'POST', {
  parameters: [{ id: check.parameters.find((p) => p.type === 'date/all-options').id, type: 'date/all-options', value: '2026-07-29~2026-08-27' }],
});
if (q.error) throw new Error(`query failed after formatting: ${JSON.stringify(q.error).slice(0, 300)}`);
log(`verify: dashboard-filtered query still returns ${q.data?.rows?.length} rows`);
log('\nDone.');

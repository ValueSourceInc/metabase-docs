#!/usr/bin/env node
/**
 * Add conditional formatting rules (and optional percent formats) to a
 * Metabase table card, and optionally propagate them to the card's dashcard
 * on a dashboard. Generic tool - works against any Metabase instance.
 *
 * Rule schema (extracted from a Metabase 0.5x/0.62 frontend bundle):
 *   visualization_settings["table.column_formatting"] = [
 *     { columns: ["<col>"], type: "single", operator: ">"|"="|"contains"|"is-null"...,
 *       value: "<string>", color: "#hex", highlight_row: false }, ...
 *   ]
 * Column ref key for column_settings: JSON.stringify(["name","<col>"]) (matches legacy cards).
 * Top rule wins on conflicts.
 *
 * Usage (run from a directory containing .env, or pass env vars directly):
 *   node add-column-formatting.mjs <card-id> \
 *     --rules '[{"columns":["utilization"],"operator":">","value":"0.95","color":"#EF8C8C"},
 *               {"columns":["flag"],"operator":"=","value":"CAPPED","color":"#F2A86F"}]' \
 *     [--percent-cols utilization,acos] \
 *     [--dash <dashboard-id>]
 *
 * Env: METABASE_API_BASE_URL, METABASE_API_KEY, optional
 * METABASE_ALLOW_SELF_SIGNED_CERT=true.
 */
import { readFileSync, writeFileSync } from 'node:fs';

// --- args ---
const args = process.argv.slice(2);
const cardId = Number(args[0]);
if (!cardId) {
  console.error('usage: add-column-formatting.mjs <card-id> --rules <JSON> [--percent-cols a,b] [--dash <id>]');
  process.exit(1);
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dashId = flag('--dash') ? Number(flag('--dash')) : undefined;
let rules;
try {
  rules = JSON.parse(flag('--rules'));
} catch (e) {
  console.error(`--rules must be valid JSON: ${e.message}`);
  process.exit(1);
}
if (!Array.isArray(rules) || rules.length === 0) {
  console.error('--rules must be a non-empty JSON array of rule objects');
  process.exit(1);
}
const percentCols = flag('--percent-cols') ? flag('--percent-cols').split(',').map((s) => s.trim()) : [];

// --- env (reads .env from cwd if present) ---
let env = { ...process.env };
try {
  const fileEnv = Object.fromEntries(
    readFileSync('.env', 'utf8')
      .split('\n')
      .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
      .map((l) => {
        const i = l.indexOf('=');
        return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')];
      })
  );
  env = { ...fileEnv, ...process.env };
} catch { /* no .env - rely on real env vars */ }
if (env.METABASE_ALLOW_SELF_SIGNED_CERT === 'true') process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const BASE = env.METABASE_API_BASE_URL;
const KEY = env.METABASE_API_KEY;
if (!BASE || !KEY) {
  console.error('missing METABASE_API_BASE_URL / METABASE_API_KEY (env or .env)');
  process.exit(1);
}

const log = (...a) => console.log(...a);
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

// --- build the settings patch ---
// visualization_settings is a FLAT map - "table.column_formatting" is a top-level key,
// never nested under a "table" object (the renderer silently ignores the nested form).
const normalizedRules = rules.map((r) => ({
  type: 'single',
  highlight_row: false,
  ...r,
}));
const colKey = (c) => JSON.stringify(['name', c]);
const patch = { 'table.column_formatting': normalizedRules };
for (const c of percentCols) {
  patch.column_settings = patch.column_settings || {};
  patch.column_settings[colKey(c)] = { number_style: 'percent' };
}

// --- 1. card-level: backup, then merge the patch into existing viz settings ---
// (merge, not replace: a wholesale PUT of only the patch would drop the card's
// other viz settings - same gotcha as query changes, see SKILL.md)
const card = await api(`/card/${cardId}`);
const mergedViz = { ...(card.visualization_settings ?? {}), ...patch };
if (percentCols.length) {
  mergedViz.column_settings = { ...(card.visualization_settings?.column_settings ?? {}), ...patch.column_settings };
}
writeFileSync(`/tmp/card${cardId}_viz_backup.json`, JSON.stringify(card.visualization_settings, null, 2));
log(`backed up card ${cardId} viz settings -> /tmp/card${cardId}_viz_backup.json`);

await api(`/card/${cardId}`, 'PUT', { visualization_settings: mergedViz });
const after = await api(`/card/${cardId}`);
const persisted = after.visualization_settings?.['table.column_formatting']?.length;
log(`card ${cardId}: ${persisted} formatting rules persisted`);
if (persisted !== normalizedRules.length) throw new Error('card-level rules did not persist');

// --- 2. dashcard-level (only with --dash): re-send ALL dashcards (PUT replaces
// the whole array), patching only this card's dashcard ---
if (dashId) {
  const dash = await api(`/dashboard/${dashId}`);
  writeFileSync(`/tmp/dash${dashId}_backup.json`, JSON.stringify({ parameters: dash.parameters ?? [], dashcards: dash.dashcards }, null, 2));
  log(`backed up dashboard ${dashId} -> /tmp/dash${dashId}_backup.json`);

  const target = dash.dashcards.find((dc) => dc.card_id === cardId);
  if (!target) throw new Error(`card ${cardId} is not on dashboard ${dashId}`);
  const dashViz = { ...(target.visualization_settings ?? {}), ...patch };

  const cardsPayload = dash.dashcards.map((dc) => ({
    id: dc.id,
    card_id: dc.card_id,
    dashboard_id: dashId,
    row: dc.row,
    col: dc.col,
    size_x: dc.size_x,
    size_y: dc.size_y,
    visualization_settings: dc.card_id === cardId ? dashViz : dc.visualization_settings ?? {},
    parameter_mappings: dc.parameter_mappings ?? [],
  }));
  await api(`/dashboard/${dashId}/cards`, 'PUT', { cards: cardsPayload });
  log(`re-sent ${cardsPayload.length} dashcards (card ${cardId}'s dashcard carries the rules)`);

  // /cards PUT can rewrite parameters - re-assert them
  // (dashboard API returns `parameters` (plural) - gotcha #43 in API-GUIDE)
  await api(`/dashboard/${dashId}`, 'PUT', { parameters: dash.parameters ?? [] });

  // --- 3. verify dashcard state ---
  const check = await api(`/dashboard/${dashId}`);
  const dcAfter = check.dashcards.find((dc) => dc.card_id === cardId);
  const dcRules = dcAfter?.visualization_settings?.['table.column_formatting']?.length;
  const paramCount = dash.parameters?.length ?? 0;
  const paramCountAfter = check.parameters?.length ?? 0;
  log(`verify: dashcard has ${dcRules} rules, mappings=${dcAfter?.parameter_mappings?.length}, params ${paramCountAfter}/${paramCount}`);
  if (dcRules !== normalizedRules.length || paramCountAfter !== paramCount) throw new Error('dashcard-level verification failed');
}

// --- 4. query still runs fine with the new settings ---
const q = await api(`/card/${cardId}/query`, 'POST', {});
if (q.error) throw new Error(`query failed after formatting: ${JSON.stringify(q.error).slice(0, 300)}`);
log(`verify: card query still returns ${q.data?.rows?.length} rows`);
log('\nDone.');

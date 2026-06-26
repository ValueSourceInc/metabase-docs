# CLAUDE.md

This file tells Claude how to use this knowledge base when working on Metabase tasks.
It contains NO specific data — only reading strategies. All data lives in the generated docs.

## Setup (first-time check)

If `.env` doesn't exist at the project root, tell the user to copy `.env.example`
and fill in real values. Without it, `pnpm gen` and API calls won't work.

## What This Project Is

A generated documentation library of our Metabase instance. Run `pnpm gen` to refresh from the Metabase API. For current stats, read the first 10 lines of `_index.json` (the `.summary` block at the top).

These docs are **metadata only** (card names, fields, dependencies, descriptions). They do NOT contain raw data or SQL query text.

## API Interaction

When you need to call the Metabase API directly (search, real-time data, schema exploration),
**read `API-GUIDE.md` first.** It covers auth, endpoints, rate limits, concurrency
patterns, and gotchas — everything learned from building and maintaining the doc
generator, plus discoveries from real API sessions.

**Prefer `API-GUIDE.md` over guessing API behavior** — it encodes real-world
trial-and-error.

### Auto-Learning (沉淀机制)

**After every API interaction where you discover something non-obvious,**
append it to `API-GUIDE.md`. Add to the relevant section (endpoint reference,
gotchas, workflows) — wherever it fits best. Don't create new files or
separate logs. One file, one source of truth.

## Reading Strategy (Generated Docs)

**The full reading strategy lives in [`SKILL.md`](SKILL.md)** — loaded on-demand when
the task touches Metabase cards/dashboards/fields/dependencies (skill triggers on
keywords like Metabase, 卡片, card, dashboard, field, SQL). Keeping it in the
on-demand skill instead of here saves ~1000 tokens for non-Metabase sessions in this repo.

When you need to query the generated docs (find a card, trace dependencies, browse a
domain), read [`SKILL.md`](SKILL.md) for the layered access strategy, By Intent lookup
table, and token traps.

## Project Structure

```
src/generate-metabase-docs.ts   ← The generator script. Domain rules, glossary, risk detection live here.
docs/metabase/                   ← Generated output (git-committed for version history)
  ├── _catalog.md                ← One-line-per-card catalog (primary discovery file)
  ├── _index.json                ← Full card index (grep target, never read in full)
  ├── _deps.json                 ← Dependency graph (compressed array format; grep for IDs)
  ├── README.md                  ← Overview + key source models + cleanup candidates
  ├── cards.md                   ← ⚠️ Master card table (human browsing only)
  ├── cards/{id}.md              ← Per-card detail files (deps truncated at 5; use _deps.json for full)
  ├── collections.md             ← Collection tree + flat table
  ├── dashboards.md              ← Dashboard list
  ├── dependencies.md            ← ⚠️ Dependency table (human browsing, prefer _deps.json)
  ├── glossary.md                ← Business term definitions (~1KB)
  ├── field-risks.md             ← Cards with ambiguous aggregation field names
  └── domains/{domain}.md        ← Source models + dashboard components per domain (lean, 2 sections)
```

## Regenerating

```bash
pnpm gen        # Regenerate all docs from Metabase API
pnpm check      # TypeScript type check
```

Requires `.env` with `METABASE_API_BASE_URL`, `METABASE_API_KEY`, `METABASE_DB_ID`.

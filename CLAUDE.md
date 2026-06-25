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

The docs are designed for layered, token-efficient access:

```
_catalog.md     ← Start here — one line per card. Read IN FULL for discovery.
_deps.json      ← Dependency graph lookups (grep for card IDs)
cards/{id}.md   ← Read only when you need field-level detail for a specific card
_index.json     ← Grep ONLY (never read in full) — for upstream/downstream/risks of specific cards
```

**`_catalog.md` is the primary discovery file.** It lists every card as `id | name | domains | collection | type | fields` — small enough to read in full once per session, giving you the complete card universe in one shot. Drill into `cards/{id}.md` only for the card you need.

**Never read `_index.json`, `cards.md`, or `dependencies.md` in full** — `_index.json` is the full card index (grep only); `cards.md` and `dependencies.md` are human-browsing files that duplicate machine-readable sources. Grep `_index.json` only when you need a specific card's upstream/downstream/risks and the catalog line wasn't enough.

**⚠️ Token trap: `domains/{domain}.md`** — Domain files only contain source models + dashboard components (not the full card list). For browsing ALL cards in a domain, grep `_catalog.md` instead (~150 tokens vs thousands).

**⚠️ Token trap: `cards/{id}.md` dependency lists** — When a card has >5 upstream or downstream cards, the detail file truncates to the first 5 with a grep hint. For the full list, use `_deps.json`.

### By Intent

| What you need | How to get it |
|---|---|
| Find card by name | `Read _catalog.md` (or `grep -i '<keyword>' _catalog.md`) |
| Find card by ID | `grep '^<id> |' _catalog.md` |
| See a card's full fields | `Read cards/{id}.md` |
| What does card X depend on? | `grep '"<X>"' _deps.json` (finds all mentions of X) |
| What depends on card X? | `grep '"<X>"' _deps.json` (same pattern — hits both up/down arrays) |
| Browse a business domain | `grep ' | <domain> |' _catalog.md`. ⚠️ Do NOT read `domains/{domain}.md` for browsing — it only has source models + dashboard components |
| Browse domain source models | `Read domains/{domain}.md` (lean file — 2 sections only) |
| Browse collection hierarchy | `Read collections.md` |
| Look up business terminology | `Read glossary.md` (business terms only, ~1KB) |
| Find cards with ambiguous fields | `Read field-risks.md` (aggregation field name risks) |
| Find key source models | `grep ' | model |' _catalog.md`, then check downstream size in `_index.json` |
| Find orphan/incomplete cards | `grep '"risks":\[[^]]' _index.json` (non-empty risks) |
| See what dashboards a card is on | `grep '"<id>"' _deps.json` — last two array elements are dash IDs and names |

### General Rules

1. **Read `_catalog.md` first** — it tells you which card IDs, names, domains, and collections exist. Only then drill into detail files.
2. **When you need a card's fields, read `cards/{id}.md`** — not `cards.md` or domain files. Note: dependency lists are truncated at 5 items; use `_deps.json` for the full list.
3. **When you need dependencies, grep `_deps.json`** — `grep '"<id>"' _deps.json` shows all references to a card ID. Format: `"id": [[upIds], [downIds], [dashIds], [dashNames]]`. Prefer this over `dependencies.md`.
4. **When you need to understand what a card does, read its `description` in `cards/{id}.md`** — `_index.json` descriptions are truncated to 300 chars; the catalog has none.
5. **Prefer `mcp__metabase__search` for name lookup when the MCP is available** — server-side search costs zero local tokens; fall back to `_catalog.md` only when MCP is unavailable or you need the full domain/collection view.
6. **Never read `cards.md` or `dependencies.md` in full** — they're human-browsing files. Use `_catalog.md` + `_deps.json` instead.
7. **Never read `domains/{domain}.md` for full domain browsing** — domain files only have source models and dashboard components. Grep `_catalog.md` for the full card list.
8. **`glossary.md` is business terms only (~1KB)** — ambiguous aggregation fields moved to `field-risks.md`.
9. **Never memorize card counts, collection names, or any specific data from these docs** — they change. Re-read the relevant file each time.

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

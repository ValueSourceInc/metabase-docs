# CLAUDE.md

This file tells Claude how to use this knowledge base when working on Metabase tasks.
It contains NO specific data — only reading strategies. All data lives in the generated docs.

## What This Project Is

A generated documentation library of our Metabase instance. Run `pnpm gen` to refresh from the Metabase API. For current stats, see `_index.json` → `.summary`.

These docs are **metadata only** (card names, fields, dependencies, descriptions). They do NOT contain raw data or SQL query text.

## Reading Strategy

The docs are designed for layered, token-efficient access:

```
_catalog.md     ← Start here — one line per card (~15KB). Read IN FULL for discovery.
_deps.json      ← Dependency graph lookups
cards/{id}.md   ← Read only when you need field-level detail for a specific card
_index.json     ← Grep ONLY (never read in full) — for upstream/downstream/risks of specific cards
```

**`_catalog.md` is the primary discovery file.** It lists every card as `id | name | domains | collection | type | fields` — small enough (~4K tokens) to read in full once per session, giving you the complete card universe in one shot. Drill into `cards/{id}.md` only for the card you need.

**Never read `_index.json` or `cards.md` in full** — `_index.json` is ~170KB (19 verbose fields per card); `cards.md` is a ~50KB human-browsing file. Grep `_index.json` only when you need a specific card's upstream/downstream/risks and the catalog line wasn't enough.

### By Intent

| What you need | How to get it |
|---|---|
| Find card by name | `Read _catalog.md` (or `grep -i '<keyword>' _catalog.md`) |
| Find card by ID | `grep '^<id> |' _catalog.md` |
| See a card's full fields | `Read cards/{id}.md` |
| What does card X depend on? | `grep -A3 '"X"' _deps.json` |
| What depends on card X? | `grep '"down":\[.*X' _deps.json` |
| Browse a business domain | `grep ' | <domain> |' _catalog.md` (or `Read domains/{domain}.md`) |
| Browse collection hierarchy | `Read collections.md` |
| Look up business terminology | `Read glossary.md` |
| Find key source models | `grep ' | model |' _catalog.md`, then check `downstream` size in `_index.json` |
| Find orphan/incomplete cards | `grep '"risks":\[[^]]' _index.json` (non-empty risks) |

### General Rules

1. **Read `_catalog.md` first** — it tells you which card IDs, names, domains, and collections exist. Only then drill into detail files.
2. **When you need a card's fields, read `cards/{id}.md`** — not `cards.md` or domain files
3. **When you need dependencies, grep `_deps.json`** — it's faster than `dependencies.md`
4. **When you need to understand what a card does, read its `description` in `cards/{id}.md`** — `_index.json` descriptions are truncated to 300 chars; the catalog has none
5. **Prefer `mcp__metabase__search` for name lookup when the MCP is available** — server-side search costs zero local tokens; fall back to `_catalog.md` only when MCP is unavailable or you need the full domain/collection view.
6. **Never memorize card counts, collection names, or any specific data from these docs** — they change. Re-read the relevant file each time.

## Project Structure

```
src/generate-metabase-docs.ts   ← The generator script. Domain rules, glossary, risk detection live here.
docs/metabase/                   ← Generated output (git-committed for version history)
  ├── _catalog.md                ← One-line-per-card catalog (primary discovery file)
  ├── _index.json                ← Full card index (grep target, never read in full)
  ├── _deps.json                 ← Dependency graph
  ├── README.md                  ← Overview + cleanup candidates
  ├── cards.md                   ← Master card table (human browsing)
  ├── cards/{id}.md              ← Per-card detail files
  ├── collections.md             ← Collection tree + flat table
  ├── dashboards.md              ← Dashboard list
  ├── dependencies.md            ← Dependency table (human browsing)
  ├── glossary.md                ← Business term definitions
  └── domains/{domain}.md        ← Cards by business domain
```

## Regenerating

```bash
pnpm gen        # Regenerate all docs from Metabase API
pnpm check      # TypeScript type check
```

Requires `.env` with `METABASE_API_BASE_URL`, `METABASE_API_KEY`, `METABASE_DB_ID`.

# CLAUDE.md

This file tells Claude how to use this knowledge base when working on Metabase tasks.
It contains NO specific data — only reading strategies. All data lives in the generated docs.

## What This Project Is

A generated documentation library of our Metabase instance. Run `pnpm gen` to refresh from the Metabase API. For current stats, see `_index.json` → `.summary`.

These docs are **metadata only** (card names, fields, dependencies, descriptions). They do NOT contain raw data or SQL query text.

## Reading Strategy

The docs are designed for layered, token-efficient access:

```
_index.json    ← Start here for discovery (grep, don't read whole file)
_deps.json     ← Dependency graph lookups  
cards/{id}.md  ← Read only when you need field-level detail for a specific card
```

**Never read `cards.md` to find a card** — it's a human-browsing file at ~50KB. Use `_index.json` instead (~168KB but you grep it, never read in full unless unavoidable).

### By Intent

| What you need | How to get it |
|---|---|
| Find card by name | `grep -i '<keyword>' _index.json` |
| Find card by ID | `grep '"<id>"' _index.json` |
| See a card's full fields | `Read cards/{id}.md` |
| What does card X depend on? | `grep -A3 '"X"' _deps.json` |
| What depends on card X? | `grep '"down":\[.*X' _deps.json` |
| Browse a business domain | `Read domains/{domain}.md` |
| Browse collection hierarchy | `Read collections.md` |
| Look up business terminology | `Read glossary.md` |
| Find key source models | In `_index.json`, cards with `type: "source model"` and large `downstream` arrays are the important ones |
| Find orphan/incomplete cards | In `_index.json`, cards with non-empty `risks` array need attention |

### General Rules

1. **Always grep `_index.json` before reading any markdown file** — the index tells you which card IDs and domains to look at
2. **When you need a card's fields, read `cards/{id}.md`** — not `cards.md` or domain files
3. **When you need dependencies, grep `_deps.json`** — it's faster than `dependencies.md`
4. **When you need to understand what a card does, read its `description` field** — descriptions in `_index.json` are truncated to 300 chars; read `cards/{id}.md` for the full text
5. **Never memorize card counts, collection names, or any specific data from these docs** — they change. Re-read the relevant file each time.

## Project Structure

```
src/generate-metabase-docs.ts   ← The generator script. Domain rules, glossary, risk detection live here.
docs/metabase/                   ← Generated output (git-committed for version history)
  ├── _index.json                ← Compact card index (grep target)
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

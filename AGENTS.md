# AGENTS.md

> **This file is a pointer.** The canonical agent instructions for this project
> live in [`CLAUDE.md`](CLAUDE.md). Read that file - it contains the full reading
> strategy, API interaction guide, auto-learning rules, and setup instructions.
> This file exists only so that tools that don't recognize `CLAUDE.md` still find
> something. All edits should go to `CLAUDE.md`, never here.

Read [`CLAUDE.md`](CLAUDE.md).

## Skills (universal)

Skills are NOT under `.claude/` - they live in [`skills/`](skills/) so every AI
CLI tool can use them:

- [`skills/metabase-core/SKILL.md`](skills/metabase-core/SKILL.md) - generic,
  portable Metabase skill: safe card create/modify workflow, viz-settings
  rules, MBQL5 gotchas. Full API manual: [`skills/metabase-core/API-GUIDE.md`](skills/metabase-core/API-GUIDE.md).
- [`skills/project-ops/SKILL.md`](skills/project-ops/SKILL.md) - this project's
  workflows: post-change checklist (`pnpm gen`, business doc sync), auto-learning
  rules, skill maintenance.

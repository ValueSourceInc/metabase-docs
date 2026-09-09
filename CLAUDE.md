# CLAUDE.md

Generated docs library of our Metabase instance — **metadata only** (names,
fields, deps, descriptions), no raw data or SQL text. Refresh: `pnpm gen`.
Current stats: first 10 lines of `docs/_index.json` (`.summary` block).

## Setup / Regenerating

Needs `.env` (`METABASE_API_BASE_URL`, `METABASE_API_KEY`, `METABASE_DB_ID`)
— copy `.env.example` if missing; without it `pnpm gen` and API calls fail.
`pnpm gen` regenerates all docs; `pnpm check` runs the TypeScript type check.

## Creating Cards / Reports (报表创建偏好) ⚠️ 高优先级

**优先用 Metabase UI（MBQL）创建报表，不要用 native SQL。** 业务人员需要
能在 UI 里编辑卡片，SQL 卡片他们改不了——这条是硬性偏好，优先级高于
"用 SQL 写更快"。即使用 MBQL 要多绕几步（多建一个中间 model、用 case
表达式等），也优于直接写 SQL。

只有当 MBQL 实在无法表达（复杂 JOIN/CTE/窗口函数/跨数据源等）时才考虑
native SQL，且**必须先调用 `AskUserQuestion` 工具问用户确认**："这个报表
需要用 native SQL，因为（具体原因）。是否允许？" 用户同意后再创建。

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

**API-GUIDE 只写通用 API 技巧，不写业务内容。** 卡片会增删改查，写入具体
card id / 字段名 / 金额 / 业务变更日志会让文档随业务变更无限膨胀。沉淀前问
自己："这条技巧换个 Metabase 实例还成立吗？" 不成立就别写进 API-GUIDE —— 业务知识属于具体 card 的 `description` 字段或业务文档，不是 API 手册。

## Reading Strategy

**Read [`READING-STRATEGY.md`](READING-STRATEGY.md) when the task touches
Metabase cards/dashboards/fields/dependencies** (keywords: Metabase, 卡片,
card, dashboard, field, SQL). It holds the layered access strategy, By Intent
lookup table, and token traps.

## Project Structure

Generator: `src/generate-metabase-docs.ts` (domain rules, glossary, risk
detection live there). Output in `docs/` (git-ignored) — per-file layout and
access strategy in [`READING-STRATEGY.md`](READING-STRATEGY.md).

## Post-Change Automation（改完卡片后自动做）⚠️ 高优先级

**1. 数据结构变了就自动跑 `pnpm gen`。** 凡是本次会话修改过 Metabase 卡片/模型
（SQL/MBQL 改动、字段增删重命名、聚合变化等），任务收尾前主动运行 `pnpm gen`
刷新生成文档，**不要等用户提醒**。

**2. 涉及补货/发货的改动要同步更新 `md/发货与补货计算说明.md`。** 该文档描述
"当前生效逻辑"，逻辑变了必须跟着变。凡涉及 876/877/878/873/985/901（及预测、
库存、发货相关的 model/卡片）的行为变化，把对应章节改到与现状一致，并在文中
标注生效日期（如"2026-08-25 起"）。用户明确要求过：下次不要再让他提醒。

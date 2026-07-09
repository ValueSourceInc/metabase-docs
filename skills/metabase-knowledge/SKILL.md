---
name: metabase-knowledge
description: >
  当用户讨论 Metabase 卡片、模型、dashboard、字段、业务域（如
  advertising/finance/sales/logistics/inventory/replenishment）、卡片依赖关系、
  集合（collection）、风险卡片、上游/下游影响分析，或需要查看具体卡片 ID 的
  字段定义时使用。按需读取知识库（docs/）提供 Metabase 实例的元信息（卡片名、
  字段、依赖、描述），不含原始业务数据。
  触发关键词：Metabase、卡片、card、dashboard、question、model、字段、SQL。
version: 1.0.0
metadata:
  language: zh-CN
  hermes:
    tags: [Metabase, BI, 卡片, dashboard, 知识库]
    category: data/knowledge-base
required_environment_variables:
  - name: METABASE_API_BASE_URL
    prompt: Metabase 实例地址（如 https://metabase.example.com）
    help: Metabase 管理后台可查，无尾斜杠
    required_for: 生成知识库
  - name: METABASE_API_KEY
    prompt: Metabase API Key
    help: Metabase Admin → Settings → Authentication → API Keys 生成
    required_for: 生成知识库
  - name: METABASE_DB_ID
    prompt: Metabase 数据库 ID（数字）
    help: 一般是业务库的 database id
    required_for: 生成知识库
  - name: METABASE_ALLOW_SELF_SIGNED_CERT
    prompt: 是否使用自签证书（设 true 跳过 TLS 校验）
    help: Metabase 用自签证书时（如 https://*.local）必须设 true
    required_for: 自签证书环境下生成知识库
prerequisites:
  commands: [node, pnpm, git]
---

# Metabase 知识库

本组织 Metabase 实例的卡片元信息知识库。知识库 `docs/` 由 metabase-docs
生成器从 Metabase API 实时生成，**不随 skill 静态分发**（卡片会增删改，
静态快照会过期）。本 skill 只含阅读策略与生成入口；`docs/` 在服务器端按需生成。

> 设计说明：metabase-docs 仓库的 `docs/` 是 gitignore 的（生成产物不进 git），
> 所以本 skill 从 GitHub 拉下来时不含知识库，必须先跑一次 `scripts/refresh.sh`
> 生成。

## When to Use

讨论 Metabase 卡片 / model / dashboard / 字段 / 依赖 / 业务域 / 上下游影响时。

## How to Run（首次 + 更新知识库）

`docs/` 不存在、或卡片有变动后，运行：

    bash ${HERMES_SKILL_DIR}/scripts/refresh.sh

该脚本会 clone 或 pull metabase-docs 生成器，写入 `.env`（从环境变量），
执行 `pnpm gen` 生成 `docs/`。完成在 `${HERMES_SKILL_DIR}/metabase-docs/docs/`。

## Reading Strategy

知识库在 `${HERMES_SKILL_DIR}/metabase-docs/docs/`，分层 token-efficient 读取：

```
_catalog.md     ← 先读 - 一行一卡片，发现 ID/名称/domain/collection
_deps.json      ← 依赖图查询（grep card ID）
cards/{id}.md   ← 需要某卡片字段级详情时才读
_index.json     ← 只 grep，绝不全文读（~150KB）
```

**`_catalog.md` 是首要发现文件**，小到一次全读，给完整卡片宇宙。只在需要时
drill 进 `cards/{id}.md`。

**绝不全文读** `_index.json` / `cards.md` / `dependencies.md` — 前者是全索引
(grep only)，后两者是人类浏览文件，重复机器可读源。

### ⚠️ Token 陷阱

- **`domains/{domain}.md`** — 只含 source models + dashboard components，不含
  全域卡片列表。浏览全域卡片 grep `_catalog.md`（~150 tokens vs 数千）。
- **`cards/{id}.md` 依赖列表** — 上下游超 5 个时截断，完整列表用 `_deps.json`。

### By Intent

| 需要 | 怎么取 |
|---|---|
| 按名找 card | 读 `docs/_catalog.md`（或 `grep -i '<kw>' docs/_catalog.md`） |
| 按 ID 找 card | `grep '^<id> |' docs/_catalog.md` |
| 查 card 完整字段 | 读 `docs/cards/{id}.md` |
| 某卡片依赖谁 / 谁依赖它 | `grep '"<id>"' docs/_deps.json`（格式 `[upIds, downIds, dashIds, dashNames]`） |
| 浏览业务域 | `grep ' | <domain> |' docs/_catalog.md`（**别**读 domains 文件浏览） |
| 浏览域 source models | 读 `docs/domains/{domain}.md` |
| 查业务术语 | 读 `docs/glossary.md`（~1KB） |
| 查泛聚合字段风险 | 读 `docs/field-risks.md` |
| 看卡片在哪些 dashboard | `grep '"<id>"' docs/_deps.json`（末两位是 dash ID/name） |

## Pitfalls

- **`docs/` 是 gitignore 的**，不在 skill 仓库里 — 必须先跑 `refresh.sh`。
  如果 `docs/_catalog.md` 不存在，提示用户跑 `refresh.sh`。
- **`_index.json` ~154KB**，绝不全文读，只 grep。
- **`domains/{domain}.md`** 只含 source models + dashboard components，浏览全域
  卡片用 `_catalog.md`。
- 知识库会随 Metabase 卡片增删改而变化 — **不要记忆卡片数量、collection 名等
  具体数据**，每次重新读相关文件。

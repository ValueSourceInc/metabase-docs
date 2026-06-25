---
name: metabase-knowledge
description: >
  当用户讨论 Metabase 卡片、模型、问题（question）、dashboard、数据集（model/metric）、
  字段、业务域（如 advertising/finance/sales/logistics/inventory/replenishment）、
  卡片依赖关系、集合（collection）、风险卡片、上游/下游影响分析、或者需要查看
  具体卡片 ID 的字段定义和 SQL 查询结构时使用。该 Skill 会按需读取本 Skill 下的
  metabase/ 知识库来提供 Metabase 实例的元信息（卡片名称、字段、依赖、描述），
  不包含原始业务数据。
  触发关键词：Metabase、卡片、card、dashboard、question、model、数据集、字段、SQL。
metadata:
  language: zh-CN
  project: metabase_knowledge
---

# Metabase 知识库

一套从 Metabase API 自动生成的文档库，包含该实例下所有卡片（card/question/model/dashboard）的
元信息：名称、字段列表、依赖关系、业务域标签、集合归属和风险标记。

**这些文档仅包含元数据**（卡片名、字段名、依赖关系、描述），不包含原始数据或 SQL 查询文本。

---

## 阅读策略（分层访问，节省 token）

文档设计为分层访问：

```
metabase/_catalog.md     ← 从这里开始，一行一张卡片。完整读取发现全貌。
metabase/_deps.json      ← 依赖图查询（grep 卡片 ID）
metabase/cards/{id}.md   ← 仅在需要某张卡片字段级详情时读取
metabase/_index.json     ← 仅 grep，切勿完整读取——用于查特定卡片的上游/下游/风险
```

**`_catalog.md` 是主要发现文件。** 每条记录格式为 `id | name | domains | collection | type | fields`。
完整读取后你能看到全部 228+ 张卡片，之后按需钻取 `cards/{id}.md`。

**切勿完整读取 `_index.json`、`cards.md`、`dependencies.md`**——`_index.json` 是完整卡片索引（仅 grep）；
`cards.md` 和 `dependencies.md` 是人工浏览文件，用机器可读的替代品更高效。

**⚠️ Token 陷阱：`domains/{domain}.md`** ——域文件仅包含源模型 + dashboard 组件（不是完整卡片列表）。
浏览某个域的所有卡片时，用 grep `_catalog.md` 替代（~150 tokens vs 数千）。

**⚠️ Token 陷阱：`cards/{id}.md` 的依赖列表** ——当一张卡片有超过 5 个上游或下游卡片时，
详情文件截断到前 5 个并附 grep 提示。完整列表用 `_deps.json`。

### 按需查询速查表

| 目标 | 方法 |
|---|---|
| 按名称找卡片 | 读取 `_catalog.md`（或 `grep -i '<关键词>' _catalog.md`） |
| 按 ID 找卡片 | `grep '^<id> |' _catalog.md` |
| 查看卡片字段详情 | 读取 `cards/{id}.md` |
| 卡片 X 依赖谁 / 谁依赖 X？ | `grep '"<X>"' _deps.json`（同时匹配 up 和 down 数组） |
| 浏览业务域 | `grep ' | <domain> |' _catalog.md`（⚠️ 勿读 `domains/{domain}.md` 做浏览） |
| 浏览域内源模型 | 读取 `domains/{domain}.md`（精简文件，仅 2 个章节） |
| 浏览集合层级 | 读取 `collections.md` |
| 查业务术语 | 读取 `glossary.md`（~1KB，仅业务术语） |
| 查字段歧义风险卡片 | 读取 `field-risks.md`（聚合字段名风险） |
| 找关键源模型 | `grep ' | model |' _catalog.md`，再查 `_index.json` 中 downstream 数量 |
| 找孤儿/有风险卡片 | `grep '"risks":\[[^]]' _index.json`（risks 非空） |
| 看卡片属于哪些 dashboard | `grep '"<id>"' _deps.json`——末尾两个数组元素是 dash IDs 和名称 |

### 通用规则

1. **先读 `_catalog.md`**——了解有哪些卡片 ID、名称、域和集合，再钻取细节。
2. **需要卡片字段时读 `cards/{id}.md`**——不要读 `cards.md` 或域文件。注意依赖列表截断到 5 条，
   完整列表用 `_deps.json`。
3. **需要依赖关系时 grep `_deps.json`**——`grep '"<id>"' _deps.json` 显示某卡片 ID 的所有引用。
   格式：`"id": [[upIds], [downIds], [dashIds], [dashNames]]`。优先于 `dependencies.md`。
4. **需要理解卡片业务含义时读 `cards/{id}.md` 的 description**——`_index.json` 的 description
   截断到 300 字符。
5. **切勿记忆卡片数量、集合名称或任何具体数据**——它们会变化，每次重新读取相关文件。

---

## 刷新知识库

数据可能过期时，运行以下命令从 Metabase API 拉取最新数据：

```bash
cd /path/to/metabase-docs && pnpm gen
```

需要项目根目录下 `.env` 文件中配置 `METABASE_API_BASE_URL`、`METABASE_API_KEY`、`METABASE_DB_ID`。

---

## 知识库目录结构

```
metabase/
  ├── _catalog.md                ← 一行一张卡片的目录（主要发现文件）
  ├── _index.json                ← 完整卡片索引（仅 grep，勿完整读取）
  ├── _deps.json                 ← 依赖图（压缩数组格式；grep ID）
  ├── README.md                  ← 概览 + 关键源模型 + 清理候选
  ├── cards.md                   ← ⚠️ 主卡片表（人工浏览用）
  ├── cards/{id}.md              ← 单张卡片详情（依赖截断到 5 条，完整用 _deps.json）
  ├── collections.md             ← 集合树 + 平铺表
  ├── dashboards.md              ← Dashboard 列表
  ├── dependencies.md            ← ⚠️ 依赖表（人工浏览用，优先用 _deps.json）
  ├── glossary.md                ← 业务术语定义（~1KB）
  ├── field-risks.md             ← 聚合字段名有歧义的卡片
  └── domains/{domain}.md        ← 每域的源模型 + dashboard 组件（精简，2 章节）
```

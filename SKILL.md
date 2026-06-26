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

## 如何使用

本 Skill 的完整使用指南（阅读策略、按需查询速查表、token 陷阱、目录结构）维护在项目根目录的
**`CLAUDE.md` → 「Reading Strategy (Generated Docs)」章节**，避免双份维护。请直接参照该章节：

- **读已生成的文档**（找卡片、查依赖、浏览域）→ `CLAUDE.md` 的 Reading Strategy
- **调 Metabase REST API**（auth、端点、并发、gotchas、实战坑）→ `API-GUIDE.md`
- **刷新文档** → `pnpm gen`（需 `.env` 配置 `METABASE_API_BASE_URL` / `METABASE_API_KEY` / `METABASE_DB_ID`）

> SKILL.md 仅作 skill 协议入口（frontmatter + 触发词），策略正文不在此重复。

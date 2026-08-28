---
name: project-ops
description: >
  Project-specific workflows for the metabase-docs repo (ValueSource Metabase
  实例): 什么时候跑 pnpm gen、改完卡片后要同步哪些业务文档、API-GUIDE 沉淀
  规则、skills/ 目录维护与分发（hermes）、报表创建偏好。触发关键词：改卡片、
  生成文档、refresh、skill 更新、沉淀、发货、补货、退货率、CLAUDE.md 自动化。
version: 1.0.0
metadata:
  language: zh-CN
  tags: [project, workflow, metabase-docs]
---

# metabase-docs 项目工作流

本 skill 描述**本项目特有**的操作规则。通用的 Metabase API / 卡片手术知识在
[`skills/metabase-core/`](../metabase-core/SKILL.md)（可移植到任何 Metabase
项目）；本文件只在本项目有效。

## Skills 目录布局（universal，供所有 AI CLI 工具读）

```
skills/
├── metabase-core/       # 通用 Metabase 技能（卡片创建/修改安全规范 + API-GUIDE.md
│                        #   + scripts/add-column-formatting.mjs）。自包含、零项目依赖，
│                        #   可整目录复制到其他 Metabase 项目。
├── metabase-knowledge/  # hermes 分发 skill：读本项目生成的 docs/ 知识库。
│                        #   服务器经 refresh.sh clone 本 repo 生成，见 README「Hermes Skill 分发」。
└── project-ops/         # 本文件。项目工作流。
```

约定：**skill 内容不进 `.claude/`**（那是 Claude Code 专属路径），统一放
`skills/`，各工具经指针文件找到它 - Claude Code 读 `CLAUDE.md`、Codex 等
读 `AGENTS.md`、Cursor 读 `.cursor/rules/`，三者都指向 `skills/`。

## 改完卡片后必做（收尾清单）⚠️ 高优先级

1. **数据结构变了就跑 `pnpm gen`。** 凡本次会话修改过 Metabase 卡片/模型
   （SQL/MBQL 改动、字段增删重命名、聚合变化等），任务收尾前主动运行，
   不要等用户提醒。
2. **同步业务文档。** 业务逻辑变了必须把对应文档改到与现状一致，并标注
   生效日期（如"2026-08-25 起"）：
   - 涉及 876/877/878/873/985/901（及预测、库存、发货相关的 model/卡片）
     → 更新根目录 `发货与补货计算说明.md`
   - 涉及退货率卡片（#784/#1060/#1133/#1134/#1135/#1001）→ 更新根目录
     `退货率计算说明.md`
3. **沉淀 API 新知。** API 交互中发现非显而易见的通用技巧，追加到
   `skills/metabase-core/API-GUIDE.md` 的对应小节（endpoint reference /
   gotchas / workflows）。只写通用技巧，不写业务内容 - 沉淀前问自己：
   "这条技巧换个 Metabase 实例还成立吗？" 不成立就写进对应 card 的
   `description` 字段或业务文档。

## 报表创建偏好（本项目硬性要求）

**优先用 Metabase UI（MBQL）创建报表，不要用 native SQL。** 业务人员需要
能在 UI 里编辑卡片，SQL 卡片他们改不了--这条优先级高于"用 SQL 写更快"。
即使用 MBQL 要多绕几步（多建一个中间 model、用 case 表达式等），也优于
直接写 SQL。

只有当 MBQL 实在无法表达（复杂 JOIN/CTE/窗口函数/跨数据源等）时才考虑
native SQL，且**必须先用 AskUserQuestion 问用户确认**："这个报表需要用
native SQL，因为（具体原因）。是否允许？" 用户同意后再创建。

## Skills 维护（how to update skills）

- `skills/metabase-core/` 是**可移植资产**：改动时保持零项目依赖（不引用
  本 repo 的 docs/、卡片 ID、业务术语）。发现新的通用 API 知识优先沉淀
  到它的 API-GUIDE.md。
- `skills/metabase-knowledge/` 是 hermes 服务器的分发源：**改动必须 commit
  并 push 到 GitHub**，服务器 `hermes skills update` 才能拉到。SKILL.md 里
  的路径、环境变量声明、refresh.sh 的 sparse-checkout 规则三者要同步改。
- `src/generate-metabase-docs.ts` 输出目录结构改动同样必须 push（服务器
  refresh.sh clone 的是 GitHub 上的版本）。
- 新增 skill 放 `skills/<name>/SKILL.md`，带 frontmatter，并更新 CLAUDE.md
  的 skills 指针表。

## 项目文件去向（where to write what)

| 内容 | 位置 |
| --- | --- |
| 通用 Metabase API 技巧 | `skills/metabase-core/API-GUIDE.md` |
| 通用卡片手术/MBQL 知识 | `skills/metabase-core/SKILL.md` |
| 可复用 Metabase 脚本 | `skills/metabase-core/scripts/`（参数化，禁止硬编码 card ID） |
| 一次性实例脚本（跑完即弃，可留档） | `tools/` |
| 业务计算逻辑说明 | 根目录 `发货与补货计算说明.md` / `退货率计算说明.md` |
| 本地分析数据 | `localdata/` |
| 生成产物 | `docs/`（git-ignored，`pnpm gen` 生成） |
| 项目工作流规则 | 本文件 |

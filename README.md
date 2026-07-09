# metabase-docs

Metabase 元数据知识库文档生成器 — 从 Metabase API 拉取所有卡片、集合、仪表板、依赖关系，生成结构化的 markdown 文档，供 AI 辅助 Metabase 开发使用。

## 快速开始

```bash
# 安装依赖
pnpm install

# 生成文档
pnpm gen

# TypeScript 类型检查
pnpm check
```

需要配置 `.env` 文件（参考 `.env.example`）：

```env
METABASE_API_BASE_URL=<Metabase 实例地址>
METABASE_API_KEY=<API Key>
METABASE_DB_ID=<数据库 ID>
```

## 项目结构

```
.
├── src/
│   └── generate-metabase-docs.ts   # 文档生成脚本（领域规则、术语表、风险检测）
├── docs/                     # 生成的文档（git-ignored，pnpm gen 生成）
│   ├── _catalog.md                  # 卡片目录（一行一张，AI 首要发现文件）
│   ├── _index.json                  # 卡片索引（grep 目标，不要全文读取）
│   ├── _deps.json                   # 压缩依赖关系图（按 card ID grep）
│   ├── README.md                    # 文档导航概览
│   ├── cards.md                     # 卡片总表（仅供人工浏览，AI 不要全文读取）
│   ├── cards/{id}.md                # 单卡片详情（长依赖列表已截断）
│   ├── collections.md               # 集合层级树
│   ├── dashboards.md                # 仪表板列表
│   ├── dependencies.md              # 依赖关系表（仅供人工浏览，AI 用 _deps.json）
│   ├── glossary.md                  # 业务术语定义
│   ├── field-risks.md               # 聚合字段命名风险
│   └── domains/{domain}.md          # 领域 source models + dashboard components
├── CLAUDE.md                        # AI 阅读策略指引（always-on，指向 READING-STRATEGY.md）
├── READING-STRATEGY.md              # 阅读策略详情（按需读，省 token）
├── skills/metabase-knowledge/       # Hermes Agent skill 分发入口（见下文）
└── package.json
```

## 阅读策略（AI 使用）

| 文件 | 用途 | 大小 |
| --- | --- | --- |
| `docs/_catalog.md` | **首要发现文件** — 一行一张卡片，按名称/ID/domain/collection 找 card | ~17KB |
| `docs/_index.json` | grep 目标 — 查特定 card 的风险 / 摘要信息（不要全文读取） | ~136KB |
| `docs/_deps.json` | 追踪上下游依赖和 dashboard 引用，按 card ID grep | ~19KB |
| `docs/cards/{id}.md` | 查看单张卡片字段、描述、少量依赖摘要 | ~1KB each |
| `docs/collections.md` | 了解集合层级结构 | ~8KB |
| `docs/domains/{domain}.md` | 只看领域 source models / dashboard components；不要用来浏览全领域卡片 | 不定 |
| `docs/glossary.md` | 查找业务术语 | ~1KB |
| `docs/field-risks.md` | 查找泛聚合字段名风险 | ~16KB |

**核心原则：先用 `_catalog.md` 发现 card，再按需读取 `cards/{id}.md`。查完整上下游依赖用 `_deps.json`，不要扫整个 card 详情目录，也不要全文读取 `cards.md` / `dependencies.md` / `_index.json`。**

## Hermes Skill 分发

本仓库同时作为 [Hermes Agent](https://github.com/nousresearch/hermes-agent) 的 skill 源，供服务器上的 hermes agent 查询 Metabase 知识库。skill 入口在 [`skills/metabase-knowledge/`](skills/metabase-knowledge/)：

```
skills/metabase-knowledge/
├── SKILL.md            # hermes 版阅读策略 + frontmatter + 环境变量声明
└── scripts/refresh.sh # 服务器端 clone 生成器 + pnpm gen 生成 docs/
```

### 设计说明

- `docs/` 是 git-ignored 的生成产物，**不随 skill 静态分发**（卡片会增删改，静态快照会过期）
- skill 从 GitHub 拉下来只含 SKILL.md + refresh.sh；知识库由 refresh.sh 在服务器端实时生成
- 这与仓库核心职责（生成器）解耦：`src/` 改动提交后，服务器跑 refresh.sh 自动拉新版生成器

### 架构

```
~/.hermes/skills/metabase-knowledge/      ← hermes skills install 装的位置
├── SKILL.md + scripts/refresh.sh          ← 从 GitHub 拉（轻，进 git）
└── metabase-docs/                         ← refresh.sh clone 的生成器（update 不动）
    ├── .env                               ← refresh.sh 从 hermes env 生成（git-ignored）
    └── docs/                              ← pnpm gen 产物，hermes 实际读取
```

### 前提

- hermes 服务器能访问 Metabase API（网络可达 + API key）
- hermes 服务器已装 `node`、`pnpm`、`git`
- 能 `git clone` 本仓库：私有 repo 需 git 已配置好认证（SSH key 或 credential helper）；hermes 装 skill 时走 GitHub API，私有 repo 另需 `GITHUB_TOKEN`

### 配置环境变量（关键）

**环境变量加到 hermes 的环境配置里（`~/.hermes/.env` 或部署对应方式），不要在 skill 目录建 `.env`。** 原因：`hermes skills update` 会重拉整个 skill 目录，本地 `.env` 可能被覆盖；而加到 hermes env 里则不受影响，且能让 SKILL.md 的 `required_environment_variables` 生效。

```bash
METABASE_API_BASE_URL=https://metabase.example.com/api
METABASE_API_KEY=<API Key>
METABASE_DB_ID=<数据库 ID>
METABASE_ALLOW_SELF_SIGNED_CERT=true   # 仅自签证书环境需要（如 https://*.local）
```

refresh.sh 会把这几个变量读出来写到 `metabase-docs/.env`（生成器内部用，git-ignored），无需手动建。

**两种触发方式的环境变量来源不同：**

- **hermes 会话内由 agent 跑**：声明过的变量自动注入 `terminal`/`execute_code` sandbox，直接可用
- **手动在 shell 跑**：sandbox 不继承 hermes 的 `.env`，refresh.sh 会自动从 `$HERMES_HOME/.env`（默认 `~/.hermes/.env`）加载——前提是变量配在那里

### 安装

```bash
# 1. 安装 skill（单 skill 无需先 tap add）
hermes skills install ValueSourceInc/metabase-docs/skills/metabase-knowledge

# 2. 首次生成知识库
bash <skill安装路径>/scripts/refresh.sh
```

`<skill安装路径>` 取决于是否用 profile：

- 默认：`~/.hermes/skills/metabase-knowledge`
- profile 模式：`~/.hermes/profiles/<profile>/skills/metabase-knowledge`

用 `hermes skills list` 可查实际安装路径。或在 hermes 会话内让 agent 用 `${HERMES_SKILL_DIR}/scripts/refresh.sh` 触发（token 自动解析为真实路径）。

### 更新

```bash
# 更新 skill 本身（拉 SKILL.md / refresh.sh 的变更）
hermes skills update metabase-knowledge

# 重新生成知识库（卡片有变动后）
bash <skill安装路径>/scripts/refresh.sh
```

### 使用

hermes 会话里加载 skill：

```
skill_view("metabase-knowledge")                                   # 加载整个 skill
skill_view("metabase-knowledge", "metabase-docs/docs/_catalog.md") # 按需读具体文件
```

skill 装好在新会话自动可用；当前会话用 `/reset` 或加 `--now` 立即生效。

### ⚠️ 部署前提

`src/generate-metabase-docs.ts` 默认输出目录（`docs/`）的改动**必须提交并 push 到 GitHub**，服务器 clone 才能拿到新版生成器。否则 refresh.sh 跑出来的产物目录与 SKILL.md 里写的路径对不上，agent 找不到知识库。


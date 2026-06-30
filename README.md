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
├── references/                     # 生成的文档（git 提交以保留版本历史）
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
├── CLAUDE.md                        # AI 阅读策略指引
└── package.json
```

## 阅读策略（AI 使用）

| 文件 | 用途 | 大小 |
| --- | --- | --- |
| `references/_catalog.md` | **首要发现文件** — 一行一张卡片，按名称/ID/domain/collection 找 card | ~17KB |
| `references/_index.json` | grep 目标 — 查特定 card 的风险 / 摘要信息（不要全文读取） | ~136KB |
| `references/_deps.json` | 追踪上下游依赖和 dashboard 引用，按 card ID grep | ~19KB |
| `references/cards/{id}.md` | 查看单张卡片字段、描述、少量依赖摘要 | ~1KB each |
| `references/collections.md` | 了解集合层级结构 | ~8KB |
| `references/domains/{domain}.md` | 只看领域 source models / dashboard components；不要用来浏览全领域卡片 | 不定 |
| `references/glossary.md` | 查找业务术语 | ~1KB |
| `references/field-risks.md` | 查找泛聚合字段名风险 | ~16KB |

**核心原则：先用 `_catalog.md` 发现 card，再按需读取 `cards/{id}.md`。查完整上下游依赖用 `_deps.json`，不要扫整个 card 详情目录，也不要全文读取 `cards.md` / `dependencies.md` / `_index.json`。**

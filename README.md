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
├── docs/metabase/                   # 生成的文档（git 提交以保留版本历史）
│   ├── _index.json                  # 卡片索引（AI 首要检索目标）
│   ├── _deps.json                   # 依赖关系图
│   ├── README.md                    # 文档导航概览
│   ├── cards.md                     # 卡片总表（人工浏览）
│   ├── cards/{id}.md                # 单卡片详情
│   ├── collections.md               # 集合层级树
│   ├── dashboards.md                # 仪表板列表
│   ├── dependencies.md              # 依赖关系表（人工浏览）
│   ├── glossary.md                  # 业务术语定义
│   └── domains/{domain}.md          # 按业务领域分组的卡片
├── CLAUDE.md                        # AI 阅读策略指引
└── package.json
```

## 阅读策略（AI 使用）

| 文件 | 用途 | 大小 |
| --- | --- | --- |
| `docs/metabase/_index.json` | **优先检索** — 按名称/领域/类型查找卡片 | ~50KB |
| `docs/metabase/_deps.json` | 追踪上下游依赖 | ~15KB |
| `docs/metabase/cards/{id}.md` | 查看单张卡片完整字段元数据 | ~1KB each |
| `docs/metabase/collections.md` | 了解集合层级结构 | ~5KB |
| `docs/metabase/domains/{domain}.md` | 浏览某领域所有卡片 | 不定 |
| `docs/metabase/glossary.md` | 查找业务术语 | ~17KB |

**核心原则：先 grep `_index.json`，再按需读取具体卡片文件。**

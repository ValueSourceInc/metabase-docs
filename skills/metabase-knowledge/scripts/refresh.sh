#!/usr/bin/env bash
#
# refresh.sh - 在 hermes 服务器端生成 metabase-docs 知识库 (docs/)
#
# skill 装到 ~/.hermes/skills/metabase-knowledge/ 时，本脚本会在其下
# clone/pull metabase-docs 生成器，执行 pnpm gen 生成 docs/。
#
# 用法:
#   bash ${HERMES_SKILL_DIR}/scripts/refresh.sh
#
# 环境变量（必须，用于生成 .env）:
#   METABASE_API_BASE_URL       Metabase 实例地址（无尾斜杠）
#   METABASE_API_KEY            Metabase API Key
#   METABASE_DB_ID              Metabase 数据库 ID
#
# 可选:
#   METABASE_DOCS_REPO_URL             覆盖默认的 git 仓库地址
#   METABASE_ALLOW_SELF_SIGNED_CERT   设为 true 时跳过 TLS 证书校验
#                                      （Metabase 用自签证书时必须，如 https://*.local）
#
set -euo pipefail

# HERMES_SKILL_DIR 由 hermes 在加载 skill 时注入；手动跑时回退到脚本上级目录
SKILL_DIR="${HERMES_SKILL_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
# 默认仓库地址 - 改成你的 GitHub 地址（私有 repo 用 deploy key / SSH）
REPO_URL="${METABASE_DOCS_REPO_URL:-https://github.com/ValueSourceInc/metabase-docs.git}"
REPO_DIR="$SKILL_DIR/metabase-docs"

echo "==> skill 目录: $SKILL_DIR"
echo "==> 生成器仓库: $REPO_URL"
echo "==> 本地产物: $REPO_DIR"
echo

# --- 1. clone 或 pull 生成器 ---
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "--> clone metabase-docs 生成器"
  git clone "$REPO_URL" "$REPO_DIR"
else
  echo "--> pull 最新生成器"
  git -C "$REPO_DIR" pull --ff-only
fi
echo

cd "$REPO_DIR"

# --- 2. 写 .env（仅首次；已存在则跳过，避免覆盖已有配置）---
if [ ! -f .env ]; then
  echo "--> 从环境变量生成 .env"
  : "${METABASE_API_BASE_URL:?环境变量未设置: METABASE_API_BASE_URL}"
  : "${METABASE_API_KEY:?环境变量未设置: METABASE_API_KEY}"
  : "${METABASE_DB_ID:?环境变量未设置: METABASE_DB_ID}"
  cat > .env <<EOF
METABASE_API_BASE_URL=$METABASE_API_BASE_URL
METABASE_API_KEY=$METABASE_API_KEY
METABASE_DB_ID=$METABASE_DB_ID
${METABASE_ALLOW_SELF_SIGNED_CERT:+METABASE_ALLOW_SELF_SIGNED_CERT=$METABASE_ALLOW_SELF_SIGNED_CERT}
EOF
  echo "    .env 已生成（不会提交，在 .gitignore 内）"
else
  echo "--> .env 已存在，跳过（如需重配请先删除 $REPO_DIR/.env）"
fi
echo

# --- 3. 安装依赖 ---
echo "--> pnpm install"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
echo

# --- 4. 生成知识库 ---
echo "--> pnpm gen（生成 docs/）"
pnpm gen
echo

# --- 5. 验证产物 ---
CATALOG="$REPO_DIR/docs/_catalog.md"
if [ -f "$CATALOG" ]; then
  CARD_COUNT=$(grep -c ' | ' "$CATALOG" 2>/dev/null || echo "?")
  echo "==> ✅ 知识库生成成功"
  echo "    路径: $REPO_DIR/docs/"
  echo "    _catalog.md 行数: $CARD_COUNT"
  echo
  echo "现在 skill 可读取: \${HERMES_SKILL_DIR}/metabase-docs/docs/_catalog.md"
else
  echo "==> ❌ 生成失败: $CATALOG 不存在"
  echo "    检查 .env 配置、Metabase API 可达性、METABASE_DB_ID 是否正确"
  exit 1
fi

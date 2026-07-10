#!/usr/bin/env bash
#
# refresh.sh - 在 hermes 服务器端生成 metabase-docs 知识库 (docs/)
#
# skill 装到 ~/.hermes/skills/metabase-knowledge/ 或 profile 目录下时，
# 本脚本会在其下 clone/pull metabase-docs 生成器，执行 pnpm gen 生成 docs/。
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

# --- 0. 环境变量来源 ---
# hermes 会话内由 agent 经 terminal/execute_code sandbox 跑本脚本时，
# required_environment_variables 声明的变量会自动注入，直接可用。
# 手动在普通 shell 跑时，sandbox 不继承 hermes 的 .env，故主动加载：
HERMES_HOME_DIR="${HERMES_HOME:-$HOME/.hermes}"
HERMES_ENV="$HERMES_HOME_DIR/.env"
if [ -z "${METABASE_API_BASE_URL:-}" ] && [ -f "$HERMES_ENV" ]; then
  echo "--> 从 $HERMES_ENV 加载环境变量（手动运行模式）"
  set -a
  # shellcheck disable=SC1090
  . "$HERMES_ENV"
  set +a
fi

# HERMES_SKILL_DIR 由 hermes 在加载 skill 时注入；手动跑时回退到脚本上级目录
SKILL_DIR="${HERMES_SKILL_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
# 默认仓库地址（私有 repo：hermes 装本 skill 走 GitHub API 需 GITHUB_TOKEN；
# 本脚本的 git clone 走 git 认证，需 git 已能拉到该 repo）
REPO_URL="${METABASE_DOCS_REPO_URL:-https://github.com/ValueSourceInc/metabase-docs.git}"
REPO_DIR="$SKILL_DIR/metabase-docs"

echo "==> skill 目录: $SKILL_DIR"
echo "==> 生成器仓库: $REPO_URL"
echo "==> 本地产物: $REPO_DIR"
echo

# --- 1. clone 或 pull 生成器 ---
#
# 用 sparse-checkout 排除 repo 自带的 skills/ 目录。原因：本 repo 同时是
# hermes skill 的源（skills/metabase-knowledge/ 在 repo 里），整仓 clone 进 skill
# 目录会造成 skill 套 skill——hermes 加载时检测到两个同名 metabase-knowledge，
# 报 ambiguous 后拒绝自动加载。生成器只需要 src/、package.json、API-GUIDE.md 等，
# 不需要 repo 里的 skills/，故排除。
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "--> clone metabase-docs 生成器（sparse，排除 skills/）"
  git clone --no-checkout "$REPO_URL" "$REPO_DIR"
  git -C "$REPO_DIR" sparse-checkout init --no-cone
  printf '/*\n!/skills/\n' > "$REPO_DIR/.git/info/sparse-checkout"
  git -C "$REPO_DIR" checkout
else
  echo "--> pull 最新生成器"
  # 老环境可能是普通 clone（未配 sparse），补配一下再 pull，确保 skills/ 不再回来
  git -C "$REPO_DIR" sparse-checkout init --no-cone 2>/dev/null || true
  printf '/*\n!/skills/\n' > "$REPO_DIR/.git/info/sparse-checkout" 2>/dev/null || true
  git -C "$REPO_DIR" checkout 2>/dev/null || true
  git -C "$REPO_DIR" pull --ff-only
fi
# 兜底：清理已 checkout 过的 skills/（sparse 排除的是“未来”，已存在的残留目录要显式删）
rm -rf "$REPO_DIR/skills"
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

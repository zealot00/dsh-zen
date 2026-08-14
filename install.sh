#!/usr/bin/env bash
# 一键安装 dsh-zen 禅模式插件到本机 dsh web profile
# 用法：./install.sh
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"
PROFILE="${DSH_PROFILE:-$HOME/.dsh/profiles/web}"
if [ ! -d "$PROFILE" ]; then
  echo "✗ 找不到 dsh profile：$PROFILE"
  exit 1
fi
DEST="$PROFILE/node_modules/@dsh-local/dsh-zen"
mkdir -p "$PROFILE/node_modules/@dsh-local"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -r "$SRC/lib" "$SRC/package.json" "$SRC/cordis.patch.yml" "$DEST/"
echo "✓ 包已就位"
PATCH="$PROFILE/cordis.patch.yml"
if [ -f "$PATCH" ] && grep -q "dsh-zen" "$PATCH" 2>/dev/null; then
  echo "✓ 已注册过"
else
  cp "$PATCH" "$PATCH.bak.$(date +%s)" 2>/dev/null || true
  cat >> "$PATCH" <<'PEO'

# dsh-zen zen mode - installed by install.sh
- insert:
    - id: dsh-zen
      name: '@dsh-local/dsh-zen'
PEO
  echo "✓ 已注册"
fi
(cd "$PROFILE" && node --input-type=module -e "import('@dsh-local/dsh-zen').then(m => console.log('✓ RESOLVE_OK')).catch(e => { console.log('✗', e.message.split(String.fromCharCode(10))[0]); process.exit(1) })")
echo "✅ 完成！重启 dsh 生效：dsh web"

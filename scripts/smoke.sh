#!/usr/bin/env bash
# Smoke test the live deployed site:
# 1. assert HTTP 200
# 2. assert HTML contains the expected key strings
# Run after `npm run deploy` propagates (1-3 min).

set -e

URL="${LINEUP_URL:-https://zhongrenfei1-hub.github.io/lineup-studio/}"
HTML=$(mktemp)

trap "rm -f $HTML" EXIT

echo "→ smoke-testing $URL"

code=$(curl -sL "$URL" --max-time 15 -o "$HTML" -w "%{http_code}")

if [ "$code" != "200" ]; then
  echo "✗ HTTP $code (expected 200)"
  exit 1
fi

required=(
  "LINEUP STUDIO"
  "Live Editor"
  "模板"
  "EDG"
  "PRX"
  "T1"
  "一键去背景"
  "下载当前帧"
  "候补名单"
)

missing=()
for s in "${required[@]}"; do
  if ! grep -q "$s" "$HTML"; then
    missing+=("$s")
  fi
done

size=$(wc -c < "$HTML" | tr -d ' ')
echo "  size: $size bytes"

if [ ${#missing[@]} -gt 0 ]; then
  echo "✗ missing strings: ${missing[*]}"
  exit 1
fi

echo "✓ all ${#required[@]} required strings present"

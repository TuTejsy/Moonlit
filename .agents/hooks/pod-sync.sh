#!/usr/bin/env bash
# Antigravity hook: Sync CocoaPods when package.json dependencies are modified.
set -uo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

CACHE_FILE="$PROJECT_ROOT/.agents/hooks/.last-synced-deps.json"
PKG_FILE="$PROJECT_ROOT/package.json"

extract_deps() {
  local file="$1"
  if command -v jq >/dev/null 2>&1; then
    jq -S '{dependencies, devDependencies, peerDependencies, optionalDependencies}' "$file" 2>/dev/null
  elif command -v python3 >/dev/null 2>&1; then
    python3 -c '
import json, sys
try:
    with open(sys.argv[1]) as f:
        data = json.load(f)
    deps = {k: data.get(k, {}) for k in ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]}
    print(json.dumps(deps, sort_keys=True))
except Exception:
    sys.exit(1)
' "$file" 2>/dev/null
  else
    grep -E '"(dependencies|devDependencies|peerDependencies|optionalDependencies)"' "$file" -A 50 2>/dev/null
  fi
}

if [[ ! -f "$PKG_FILE" ]]; then
  printf '%s\n' '{}'
  exit 0
fi

CURRENT_DEPS="$(extract_deps "$PKG_FILE")"
if [[ -z "$CURRENT_DEPS" ]]; then
  printf '%s\n' '{}'
  exit 0
fi

SHOULD_SYNC=0
if [[ ! -f "$CACHE_FILE" ]]; then
  SHOULD_SYNC=1
else
  PREV_DEPS="$(cat "$CACHE_FILE")"
  if [[ "$CURRENT_DEPS" != "$PREV_DEPS" ]]; then
    SHOULD_SYNC=1
  fi
fi

if [[ "$SHOULD_SYNC" -eq 0 ]]; then
  printf '%s\n' '{}'
  exit 0
fi

LOCK_DIR="$PROJECT_ROOT/.agents/hooks/.pod-sync.lock"
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  printf '%s\n' '{}'
  exit 0
fi

echo "Dependencies changed. Running yarn install & yarn pod-reinstall..." >&2

FAILED=0
yarn install && yarn pod-reinstall || FAILED=1

rmdir "$LOCK_DIR" 2>/dev/null || true

if [[ "$FAILED" -ne 0 ]]; then
  echo "CocoaPods synchronization failed." >&2
  printf '%s\n' '{"decision": "block", "reason": "Failed to sync CocoaPods dependencies after package.json change."}'
  exit 1
fi

printf '%s' "$CURRENT_DEPS" >"$CACHE_FILE"

printf '%s\n' '{}'
exit 0

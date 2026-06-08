#!/usr/bin/env bash
# After Agent edits package.json (dependency sections) or ios/Podfile, sync native deps.
set -uo pipefail

package_json_dependencies_changed() {
  local pkg_file="$1"
  local extract='{dependencies, devDependencies, peerDependencies, optionalDependencies}'

  if ! command -v jq >/dev/null 2>&1; then
    git diff -- "$pkg_file" 2>/dev/null | grep -qE \
      '^[+-].*"(dependencies|devDependencies|peerDependencies|optionalDependencies)"'
    return $?
  fi

  local current
  current="$(jq -c "$extract" "$pkg_file" 2>/dev/null)" || return 1

  local previous=""
  if git show "HEAD:package.json" >/dev/null 2>&1; then
    previous="$(git show "HEAD:package.json" | jq -c "$extract" 2>/dev/null)" || previous=""
  fi

  if [[ -z "$previous" ]]; then
    jq -e '
      (
        (.dependencies // {})
        + (.devDependencies // {})
        + (.peerDependencies // {})
        + (.optionalDependencies // {})
      ) | length > 0
    ' <<<"$current" >/dev/null 2>&1
    return $?
  fi

  [[ "$current" != "$previous" ]]
}

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

read -r INPUT

file_path=""
if command -v jq >/dev/null 2>&1; then
  file_path="$(printf '%s' "$INPUT" | jq -r '.file_path // empty')"
else
  file_path="$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("file_path",""))' 2>/dev/null || true)"
fi

if [[ -z "$file_path" ]]; then
  printf '%s\n' '{}'
  exit 0
fi

rel_path="${file_path#"$PROJECT_ROOT"/}"
rel_path="${rel_path#/}"

should_restart=0

if [[ "$rel_path" == "ios/Podfile" ]]; then
  should_restart=1
elif [[ "$rel_path" == "package.json" ]]; then
  if package_json_dependencies_changed "$PROJECT_ROOT/package.json"; then
    should_restart=1
  fi
fi

if [[ "$should_restart" -eq 0 ]]; then
  printf '%s\n' '{}'
  exit 0
fi

LOCK_DIR="$PROJECT_ROOT/.cursor/hooks/.dependency-restart.lock"
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  printf '%s\n' '{}'
  exit 0
fi

LOG_FILE="$(mktemp)"
FAILED=0
{
  echo "=== dependency-restart $(date -u +"%Y-%m-%dT%H:%M:%SZ") ==="
  echo "trigger: ${rel_path}"
  yarn cache clean
  yarn install
  yarn pod-reinstall
} >>"$LOG_FILE" 2>&1 || FAILED=1

rmdir "$LOCK_DIR" 2>/dev/null || true

if [[ "$FAILED" -ne 0 ]]; then
  echo "dependency-restart failed; log: ${LOG_FILE}" >&2
  exit 1
fi

rm -f "$LOG_FILE"
printf '%s\n' '{}'
exit 0

#!/usr/bin/env bash
# Post-agent quality gate for Antigravity: lint, test, tsc, format. On failure, block stop and report issues.
set -uo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

INPUT=""
if read -t 1 -r LINE; then
  INPUT="$LINE"
fi

status="completed"
if [[ -n "$INPUT" ]] && command -v jq >/dev/null 2>&1; then
  status="$(printf '%s' "$INPUT" | jq -r '.status // "completed"')"
fi

if [[ "$status" != "completed" ]]; then
  printf '%s\n' '{}'
  exit 0
fi

if [[ -z "$(git status --porcelain 2>/dev/null)" ]]; then
  printf '%s\n' '{}'
  exit 0
fi

LOG_FILE="$(mktemp)"
FAILED=0

run_step() {
  local label="$1"
  shift
  {
    echo "=== ${label} ==="
    "$@"
  } >>"$LOG_FILE" 2>&1 || FAILED=1
}

run_step "yarn lint" yarn lint
run_step "yarn test" yarn test
run_step "yarn tsc" yarn tsc
run_step "yarn format" yarn format

if [[ "$FAILED" -eq 0 ]]; then
  rm -f "$LOG_FILE"
  DRIFT_SCRIPT="$PROJECT_ROOT/.agents/hooks/context-drift-check.sh"
  if [[ -x "$DRIFT_SCRIPT" ]]; then
    "$DRIFT_SCRIPT" antigravity
    exit 0
  fi
  printf '%s\n' '{}'
  exit 0
fi

OUTPUT="$(tail -c 12000 "$LOG_FILE")"
rm -f "$LOG_FILE"

MESSAGE="Post-agent quality checks failed (yarn lint, yarn test, yarn tsc, and/or yarn format). Investigate the failures below, fix all issues in the codebase, and ensure every check passes. Do not mark the task complete until checks succeed.

${OUTPUT}"

if command -v jq >/dev/null 2>&1; then
  jq -n --arg msg "$MESSAGE" '{decision: "block", reason: $msg}'
else
  python3 -c 'import json, os; print(json.dumps({"decision": "block", "reason": os.environ["MSG"]}))' MSG="$MESSAGE"
fi

exit 0

#!/usr/bin/env bash
# Post-agent quality gate: lint, format, test, tsc. On failure, request agent follow-up to fix issues.
set -uo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

read -r INPUT

status="completed"
if command -v jq >/dev/null 2>&1; then
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
run_step "yarn format" yarn format
run_step "yarn test" yarn test
run_step "yarn tsc" yarn tsc

if [[ "$FAILED" -eq 0 ]]; then
  rm -f "$LOG_FILE"
  DRIFT_SCRIPT="$PROJECT_ROOT/.agents/hooks/context-drift-check.sh"
  if [[ -x "$DRIFT_SCRIPT" ]]; then
    "$DRIFT_SCRIPT" cursor
    exit 0
  fi
  printf '%s\n' '{}'
  exit 0
fi

OUTPUT="$(tail -c 12000 "$LOG_FILE")"
rm -f "$LOG_FILE"

MESSAGE="Post-agent quality checks failed (yarn lint, yarn format, yarn test, and/or yarn tsc). Investigate the failures below, fix all issues in the codebase, and ensure every check passes. Do not mark the task complete until checks succeed.

${OUTPUT}"

if command -v jq >/dev/null 2>&1; then
  jq -n --arg msg "$MESSAGE" '{followup_message: $msg}'
else
  python3 -c 'import json, os; print(json.dumps({"followup_message": os.environ["MSG"]}))' MSG="$MESSAGE"
fi

exit 0

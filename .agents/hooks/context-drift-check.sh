#!/usr/bin/env bash
# Detect AI context drift after feature work; emit follow-up for moonlit-context-curator.
# Usage: context-drift-check.sh [cursor|antigravity]
set -uo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$PROJECT_ROOT"

OUTPUT_MODE="${1:-cursor}"

CHANGED_FILE="$(mktemp)"
{
  git diff --name-only 2>/dev/null
  git diff --name-only --cached 2>/dev/null
  git ls-files --others --exclude-standard 2>/dev/null
} | sed '/^$/d' | sort -u >"$CHANGED_FILE"

if [[ ! -s "$CHANGED_FILE" ]]; then
  rm -f "$CHANGED_FILE"
  printf '%s\n' '{}'
  exit 0
fi

has_arch_src=0
has_context=0
has_paywall_src=0
has_paywall_context=0
has_story_player_src=0
has_story_player_context=0
has_locals=0
CHANGED_COUNT=0

while IFS= read -r file; do
  CHANGED_COUNT=$((CHANGED_COUNT + 1))

  case "$file" in
    src/services/* | src/hooks/* | src/navigation/* | src/native_modules/*)
      has_arch_src=1
      ;;
    .agents/hooks/* | .cursor/hooks/*)
      ;;
    .agents/rules/* | .agents/skills/* | .cursor/rules/* | .cursor/agents/*)
      has_context=1
      ;;
  esac

  case "$file" in
    src/screens/PaywallModal/* | src/hooks/navigation/useShowPaywallModal.ts | src/hooks/useHandleCheckSubscription.ts)
      has_paywall_src=1
      ;;
    .agents/skills/moonlit-paywall-screen/* | .cursor/agents/moonlit-paywall-flow.md | .cursor/agents/moonlit-ui-implementer.md)
      has_paywall_context=1
      ;;
  esac

  case "$file" in
    src/screens/StoryPlayerScreens/*)
      has_story_player_src=1
      ;;
    .agents/skills/moonlit-story-player/* | .cursor/agents/moonlit-ui-implementer.md)
      has_story_player_context=1
      ;;
  esac

  case "$file" in
    src/localization/locals/*)
      has_locals=1
      ;;
  esac
done <"$CHANGED_FILE"

DRIFT_REASONS=()

if [[ "$has_arch_src" -eq 1 && "$has_context" -eq 0 ]]; then
  DRIFT_REASONS+=("Architectural src/ changes (services, hooks, navigation, or native_modules) without updates to .agents/rules, .agents/skills, .cursor/rules, or .cursor/agents.")
fi

if [[ "$has_paywall_src" -eq 1 && "$has_paywall_context" -eq 0 ]]; then
  DRIFT_REASONS+=("Paywall or subscription code changed without updates to moonlit-paywall-screen skill, moonlit-paywall-flow agent, or moonlit-ui-implementer agent.")
fi

if [[ "$has_story_player_src" -eq 1 && "$has_story_player_context" -eq 0 ]]; then
  DRIFT_REASONS+=("Story player code changed without updates to moonlit-story-player skill or moonlit-ui-implementer agent.")
fi

if [[ "$has_locals" -eq 1 ]]; then
  DRIFT_REASONS+=("Localization domain files changed — consider running /moonlit-localization-parity to verify index.ts aggregation.")
fi

if [[ "${#DRIFT_REASONS[@]}" -eq 0 ]]; then
  rm -f "$CHANGED_FILE"
  printf '%s\n' '{}'
  exit 0
fi

FILE_LIST="$(head -n 40 "$CHANGED_FILE")"
if [[ "$CHANGED_COUNT" -gt 40 ]]; then
  FILE_LIST="${FILE_LIST}"$'\n'"... and $((CHANGED_COUNT - 40)) more files"
fi

REASONS_TEXT="$(printf '%s\n' "${DRIFT_REASONS[@]}")"

MESSAGE="AI context drift detected after quality checks passed. **Do not** run /moonlit-context-curator automatically.

## Drift signals
${REASONS_TEXT}

## Changed files (sample)
${FILE_LIST}

## Instructions
- Summarize the drift signals above for the user in plain language.
- Ask whether to run **/moonlit-context-curator**; wait for explicit approval (yes / approve / go ahead) before invoking that agent or editing context files.
- If the user declines, stop — do not edit .agents/rules, .agents/skills, .cursor/agents, or .cursor/rules on their behalf."

rm -f "$CHANGED_FILE"

if command -v jq >/dev/null 2>&1; then
  if [[ "$OUTPUT_MODE" == "antigravity" ]]; then
    jq -n --arg msg "$MESSAGE" '{decision: "block", reason: $msg}'
  else
    jq -n --arg msg "$MESSAGE" '{followup_message: $msg}'
  fi
else
  if [[ "$OUTPUT_MODE" == "antigravity" ]]; then
    python3 -c 'import json, os; print(json.dumps({"decision": "block", "reason": os.environ["MSG"]}))' MSG="$MESSAGE"
  else
    python3 -c 'import json, os; print(json.dumps({"followup_message": os.environ["MSG"]}))' MSG="$MESSAGE"
  fi
fi

exit 0

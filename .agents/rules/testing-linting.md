---
trigger: model_decision
description: Testing, linting, formatting, and automated quality gate requirements for Moonlit.
---

# Workspace Rule: Testing, Linting & Formatting

This document defines the strict requirements for code quality, testing, and formatting in the Moonlit project.

## Testing

- **Framework**: `jest` for unit tests, `@testing-library/react-native` for integration tests.
- **Setup**: ALWAYS add global jest mocks to `setupJest.ts` when adding new native dependencies or globals.
- **Skill Usage**: ALWAYS use the `react-native-testing` skill when writing unit or integration tests.
- 🚨 **META RULE: CONTINUOUS TESTING** 🚨 As an AI agent, you **MUST ALWAYS** update existing tests or implement new unit/integration tests whenever you modify or add any components, hooks, utilities, or services. Code changes without corresponding test updates are strictly prohibited.

## Automated quality gate

After the agent finishes, both the Cursor **stop** hook (`.cursor/hooks/quality-check.sh`) and the Antigravity **Stop** event hook (`.agents/hooks/quality-check.sh`) execute automated quality gates when the workspace has changes:

- **Cursor Hook**: Runs `yarn lint`, `yarn format`, `yarn test`, and `yarn tsc`.
- **Antigravity Hook**: Runs `yarn lint`, `yarn test`, `yarn tsc`, and `yarn format`.

If any check fails, the hook blocks the stop request and triggers a follow-up so the agent must investigate and fix all issues until checks pass.

When quality checks pass, `.agents/hooks/context-drift-check.sh` may suggest **`/moonlit-context-curator`** only when architectural or paywall/story-player `src/` changed without matching context updates (user approval required; context-only edits do not stop-hook).

## Linting

- Fix all ESLint errors introduced by your changes.

## Formatting

- Keep code Prettier-formatted; post-agent hooks run `yarn format` automatically.

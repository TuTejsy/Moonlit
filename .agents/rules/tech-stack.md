---
trigger: model_decision
description: Technical stack, constraints, language specifications, testing and linting rules for the Moonlit React Native application.
globs: "package.json, tsconfig.json, jest.config.js, setupJest.ts, src/**/*.ts, src/**/*.tsx"
---

# Technology Stack & Constraints

This rule defines the core tech stack constraints, package management, typing standards, and the testing/linting requirements for Moonlit.

## Technology Stack

- **Package Manager**: ALWAYS use `yarn`.
- **Framework**: Bare React Native (Do NOT use Expo).
- **Language**: TypeScript. Use strict typing for all components, functions, props, and state. NEVER use force unwrapping (`!`) or casting to `any` (`as any`).
- **Navigation**: Use `react-navigation`.

## Testing Pipeline

- **Tools**: Use `jest` for unit tests and `@testing-library/react-native` (RNTL) for integration tests.
- **Global Mocks**: ALWAYS add global jest mocks to the `setupJest.ts` file when adding new native dependencies or globals.
- **Skill Usage**: ALWAYS use the `react-native-testing` skill when writing unit or integration tests. Ignore this skill in other scenarios.
- 🚨 **META RULE: CONTINUOUS TESTING** 🚨
  As an AI agent, you **MUST ALWAYS** update existing tests or implement new unit/integration tests whenever you modify or add any components, hooks, utilities, or services. Code changes without corresponding test updates are strictly prohibited. (Note: You do not need to manually run `yarn test` as it is automatically executed upon completion by our post-agent validation hook).

## Linting Requirements

- 🚨 **META RULE: CONTINUOUS LINTING** 🚨
  As an AI agent, you **MUST ALWAYS** ensure all new and modified files are free of lint errors. Code changes with unresolved lint errors are strictly prohibited. (Note: You do not need to manually run `yarn lint` as it is automatically executed upon completion by our post-agent validation hook).

## Automated Post-Agent Hooks

- **Validation Hook**: An automated Antigravity hook is configured in `.agents/hooks.json` to execute `.agents/scripts/validate-agent-work.sh` upon task completion (the `Stop` event).
- **Behavior**: This hook automatically runs `yarn lint` followed by `yarn test`. If either command fails, the hook will alert the agent and halt execution/termination until all quality checks pass.
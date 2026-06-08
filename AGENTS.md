# Project Context: Moonlit (AI-Voice Client)

This document provides the core rules and entry points for the Moonlit React Native application.

> 🚨 **META RULE: CONTINUOUS CONTEXT MAINTENANCE** 🚨
> As an AI agent you **MUST ALWAYS** update these rule files (or create new ones in `.agents/rules/`) whenever you introduce or modify new core services, global utilities, or architectural patterns. Failure to do so will result in lost coding context. After agent sessions with architectural changes, the stop hook may suggest **`/moonlit-context-curator`** to audit drift and token efficiency in rules, skills, and agents.

## Product Context

Moonlit is a React Native mobile application featuring fairytales for children. Users choose a pre-defined voice to read a tale or record their own voice, which is then used to synthesize and voice the tale.

## Core Technology Stack

- **Package Manager**: ALWAYS use `yarn`. Run `yarn restart` after dependency changes.
- **Framework**: Bare React Native (No Expo).
- **Language**: Strict TypeScript. NEVER use `any` or `!`.
- **Navigation**: `react-navigation` with JS stack and bottom tabs.

---

## Workspace Rules Index

To ensure rules efficiency and reduce context clutter, detailed rules are split into specialized modules. **You MUST proactively read the relevant rule file before performing a task.**

| Rule Set              | Description                                                                     | Path                                                                 |
| :-------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------- |
| **Architecture**      | Principles, navigation, service boundaries, Realm, Redux, paywall, story player | [.agents/rules/architecture.md](.agents/rules/architecture.md)       |
| **UI & Styling**      | `useMakeStyles`, primitives, localization                                       | [.agents/rules/ui-styling.md](.agents/rules/ui-styling.md)           |
| **Realm Database**    | `useStory`, `useStories`, `useAudioRecording`, action hooks                     | [.agents/rules/database.md](.agents/rules/database.md)               |
| **Headers**           | `ScreenHeader`, `ModalHeader`, `SearchHeader`                                   | [.agents/rules/headers.md](.agents/rules/headers.md)                 |
| **Reanimated**        | Reanimated 4 / worklets (`scheduleOnRN`, not `runOnJS`)                         | [.agents/rules/reanimated.md](.agents/rules/reanimated.md)           |
| **Testing & Quality** | Jest, linting, formatting, quality hooks                                        | [.agents/rules/testing-linting.md](.agents/rules/testing-linting.md) |
| **Project Context**   | Directory structure, hierarchy, scripts                                         | [.agents/rules/project-context.md](.agents/rules/project-context.md) |

---

## Agent Skills (`.agents/skills/`)

Read the relevant skill before specialized work. Skills document architecture and file placement; subagents execute step-by-step tasks.

| Skill                           | When to read                                                             |
| :------------------------------ | :----------------------------------------------------------------------- |
| **react-native-best-practices** | Performance, FPS, bundle size, native modules, profiling                 |
| **react-native-testing**        | Writing or fixing Jest / RNTL tests                                      |
| **moonlit-ai-context**          | Rules/skills/agents maintenance, token efficiency, context-curator       |
| **moonlit-paywall-screen**      | `PaywallModal` shell, variants, `useShowPaywallModal`, Adapty placements |
| **moonlit-story-player**        | `StoryPlayerScreen`, `VoiceSettingsModal`, `mnt-audioplayer`, gestures   |

---

## Custom Subagents (`.cursor/agents/`)

Specialized agents for Moonlit workflows. Invoke by name (e.g. `/moonlit-screen-scaffolder`) or natural language.

| Agent                                 | Invoke                                   | Role                                  |
| :------------------------------------ | :--------------------------------------- | :------------------------------------ |
| moonlit-code-reviewer                 | `/moonlit-code-reviewer`                 | Full compliance + RN perf (read-only) |
| moonlit-screen-scaffolder             | `/moonlit-screen-scaffolder`             | New screen folder + skeleton tests    |
| moonlit-ui-implementer                | `/moonlit-ui-implementer`                | Patterns → React Native UI            |
| moonlit-service-boundary-guard        | `/moonlit-service-boundary-guard`        | SDK import boundaries (read-only)     |
| moonlit-test-author                   | `/moonlit-test-author`                   | Jest tests for changed code           |
| moonlit-paywall-flow                  | `/moonlit-paywall-flow`                  | Adapty placements, variants, gating   |
| moonlit-navigation-wiring             | `/moonlit-navigation-wiring`             | Navigator registration                |
| moonlit-reanimated-auditor            | `/moonlit-reanimated-auditor`            | `scheduleOnRN` / worklets (read-only) |
| moonlit-native-turbomodule-scaffolder | `/moonlit-native-turbomodule-scaffolder` | Codegen TurboModule spec              |
| moonlit-localization-sweep            | `/moonlit-localization-sweep`            | Hardcoded string audit                |
| moonlit-localization-parity           | `/moonlit-localization-parity`           | Locale domain file parity             |
| moonlit-rules-sync                    | `/moonlit-rules-sync`                    | `.agents` ↔ `.cursor` rules sync      |
| moonlit-context-curator               | `/moonlit-context-curator`               | AI context drift audit + token trims  |
| moonlit-dependency-native-impact      | `/moonlit-dependency-native-impact`      | Dependency native/Jest impact         |

**Suggested orchestration**

| Task                  | Agent sequence                                                                                                                     |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| New screen            | screen-scaffolder → navigation-wiring → ui-implementer → localization-sweep → test-author → service-boundary-guard → code-reviewer |
| Paywall UI / variant  | read **moonlit-paywall-screen** skill → paywall-flow → test-author → code-reviewer                                                 |
| Story player / voice  | read **moonlit-story-player** skill → ui-implementer → reanimated-auditor → test-author → code-reviewer                            |
| Realm / data change   | implement → update database rule if needed → test-author → code-reviewer                                                           |
| New npm package       | dependency-native-impact → implement → test-author                                                                                 |
| New global pattern    | implement → context-curator (or rules-sync for mirror-only) → code-reviewer                                                        |
| AI context layer edit | context-curator (user-approved) → code-reviewer (docs-only)                                                                        |

---

## Universal Mandatory Rules

1. **Strict Styling**: ALWAYS use the theme-aware `useMakeStyles` system and primitive components (`TextView`, `PressableView`).

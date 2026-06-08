---
trigger: model_decision
description: Moonlit project structure, provider hierarchy, and available scripts.
---

# Workspace Rule: Project Context

This document provides a detailed overview of the Moonlit project structure, hierarchy, and available scripts.

## Project Structure

The application source code is located within the `src/` directory:

- `src/api/`: Network requests and API endpoints (voice synthesis backend).
- `src/assets/`: Static resources (fonts, images, audio placeholders).
- `src/components/`: Reusable UI components (primitives, headers, cards, modals).
- `src/constants/`: Application-wide constants and theme tokens.
- `src/database/`: Realm initialization, schema definitions, migrations.
- `src/hooks/`: Custom React hooks (database, navigation, content, theme).
- `src/localization/`: Multi-language support; modular `locals/*.ts` domain files.
- `src/native_modules/`: Custom native modules (`MNTAudioPlayer` / `mnt-audioplayer`).
- `src/navigation/`: React Navigation stacks, tabs, routing logic.
- `src/screens/`: Feature screens (`HomeScreen`, `StoryPlayerScreen`, `PaywallModal`, `SettingsScreen`, etc.).
- `src/services/`: SDK integrations (`analytics`, `networkClient`, `remoteConfig`, `storage`, `securedStorage`).
- `src/store/`: Redux configuration and feature slices (`player/`, `user/`, `subscription/`).
- `src/styles/`: Design system tokens and font definitions.
- `src/types/`: Global TypeScript type definitions.
- `src/utils/`: Pure helper functions.

## Provider Hierarchy (App.tsx)

```
SafeAreaProvider → ThemeProvider → LocalizationProvider → Redux Provider → AppLogicProvider → Navigation
```

## Available Scripts (`package.json`)

| Script            | Description                                                            |
| :---------------- | :--------------------------------------------------------------------- |
| `start`           | Starts the Metro bundler.                                              |
| `android`         | Builds and runs on Android emulator or device.                         |
| `ios`             | Builds and runs on iOS simulator or device.                            |
| `test`            | Runs Jest test suites.                                                 |
| `lint`            | Runs ESLint across the codebase.                                       |
| `format`          | Runs Prettier to fix formatting.                                       |
| `tsc`             | TypeScript type check (`tsc --noEmit`).                                |
| `restart`         | Cleans yarn cache, reinstalls packages, starts Metro with reset cache. |
| `reinstall`       | Full clean reinstall (node_modules, pods).                             |
| `pod-reinstall`   | Reinstalls iOS CocoaPods dependencies.                                 |
| `codegen-android` | Generates Android Codegen artifacts.                                   |

---
trigger: model_decision
description: Architectural principles, navigation, service boundaries, and Moonlit domain patterns.
---

# Workspace Rule: Architecture & Navigation

This document defines the architectural principles and navigation standards for the Moonlit project.

## Architectural Principles

1. **Separation of Concerns**: Keep screen components lean. Move business logic, sorting, filtering, and data transformations into custom hooks.
2. **Component File Splitting**: ALWAYS split UI, styles, types, and constants of a component into separate files **only if they contain actual data or definitions**. DO NOT create auxiliary files if they would be empty. Follow this naming convention:
   - UI: `ComponentName.tsx`
   - Styles: `ComponentName.styles.ts` (only if the component has styles)
   - Types: `ComponentName.types.ts` (only if custom types are needed)
   - Constants: `ComponentName.constants.ts` (only if local constants exist)
3. **Theming Layer as Single Source of Truth**: The `styles/themes/` directory holds all design tokens. The `useMakeStyles` hook acts as the sole bridge between these tokens and the components.
4. **Test Directory Organization**: ALWAYS place test files inside a `__tests__` folder at the top level of the module (e.g., `src/components/__tests__`, `src/screens/__tests__`). NEVER place test files adjacent to source files.
5. **Navigation Hooks**: ALWAYS use `useAppRoute` (`src/navigation/hooks/useAppRoute.ts`) and `useAppNavigation` (`src/navigation/hooks/useAppNavigation.ts`). NEVER use `useRoute` / `useNavigation` from `@react-navigation/native` outside those wrapper files.
6. **Security & Secrets**: ALWAYS store secrets in `src/constants/auth.ts`. NEVER use `.env` files for secrets.
7. **Interface Segregation**: Components receive only the specific data fields they need via props, never a whole large object.
8. **Secure Storage**: ALWAYS use `SecuredStorage` (`src/services/securedStorage/securedStorage.ts`) for sensitive user data. NEVER use `AsyncStorage`, `react-native-mmkv`, or direct `react-native-keychain` access for sensitive information.
9. **Global App Logic**: ALWAYS use `AppLogicProvider` (`src/components/Providers/AppLogicProvider/AppLogicProvider.tsx`) for global side effects (story previews, content updates, app launch logging). DO NOT add global background logic to navigation routers or root components.
10. **Native Modules (TurboModules)**: Use React Native Codegen specs in `src/native_modules/`. Reference implementation: `mnt-audioplayer` (`src/native_modules/MNTAudioPlayer`).
11. **Component Decomposition**: Decompose large screens into smaller, single-purpose components. Screen-specific sub-components live in `src/screens/{Screen}/components/`; reusable components in `src/components/`.
12. **Realm Access**: ALWAYS use hooks from `src/hooks/database/` — see `database.md` / `moonlit-database.mdc`. Never query Realm directly in components.
13. **Redux**: Feature state in `src/store/` (`player/`, `user/`, `subscription/`). Use `useAppDispatch` / `useAppSelector` hooks.

## Navigation Architecture

The app uses **React Navigation v7** with JS stack and bottom tabs:

- **Root stack**: `src/navigation/RootNavigator/RootNavigator.tsx` — tabs, story player, paywall, modals.
- **Tab navigator**: `src/navigation/TabNavigator/TabNavigator.tsx` — Home, Favorites, Settings.
- **Shared stack**: `src/navigation/SharedNavigator/SharedNavigator.tsx` — nested flows.
- **Route enums**: `RootRoutes` in `RootNavigator.routes.ts`; param types in `RootNavigator.types.ts`.
- **Custom hooks**: `useAppNavigation`, `useAppRoute` wrap native hooks for project-wide enforcement.

## Product Domains

- **Fairytales**: Story catalog, favorites, categories — Realm-backed via `useStory` / `useStories`.
- **Voice synthesis**: Pre-defined voices + user recording → backend API (`src/api/`).
- **Story player**: `StoryPlayerScreen` with `mnt-audioplayer`, cover gestures, progress bar — see `moonlit-story-player` skill.
- **Voice settings**: `VoiceSettingsModal` with `AudioRecording` for user voice capture.
- **Subscriptions**: Adapty paywall via `PaywallModal` — see `moonlit-paywall-screen` skill.

## Service Sole-Owners

Screens and hooks must not import SDK packages directly except where noted.

| Package                                                                 | Allowed import paths                                                                                                                                               |
| :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@amplitude/analytics-react-native`, `@react-native-firebase/analytics` | `src/services/analytics/analytics.ts`                                                                                                                              |
| `@react-native-firebase/remote-config`                                  | `src/services/remoteConfig/remoteConfig.ts`                                                                                                                        |
| `@react-native-async-storage/async-storage`                             | `src/services/storage/storage.ts`                                                                                                                                  |
| `react-native-keychain` (via abstraction)                               | `src/services/securedStorage/securedStorage.ts`                                                                                                                    |
| `axios` / network                                                       | `src/services/networkClient/networkClient.ts`                                                                                                                      |
| `react-native-adapty` runtime (`adapty.*`)                              | `src/hooks/useAdaptyInit.ts`, `src/hooks/usePaywallBootstrap.ts`, `src/hooks/useHandleCheckSubscription.ts`, `src/screens/PaywallModal/hooks/usePaywallActions.ts` |
| `react-native-adapty` types only                                        | Paywall screens/hooks, `src/store/subscription/`, `RootNavigator.types.ts`                                                                                         |
| `useRoute`, `useNavigation` from `@react-navigation/native`             | `src/navigation/hooks/useAppRoute.ts`, `useAppNavigation.ts` only                                                                                                  |

## Paywall (`src/screens/PaywallModal/`)

- **Entry**: `PaywallModal.tsx` shell with `paywallVariantRegistry` (`resolvePaywallVariantName` — prefix match on Adapty `paywall.name`).
- **Variants**: `contentVariants/{Scrollable,Selection,Switcher,StaticDefaultProd}PaywallContent/`.
- **Bootstrap**: `useRemoteConfigInit` + `useAdaptyInit` + `usePaywallBootstrap` in `AppLogicProvider`; `SplashViewModal` gates on `selectIsPaywallBootstrapSettled` (ready or failed). Adapty paywall `remoteConfig.data` is stored in Redux as `paywallRemoteConfig` (separate from Firebase remote config).
- **Navigation hook**: `useShowPaywallModal` (`src/hooks/navigation/useShowPaywallModal.ts`) — opens `PAYWALL_SCREEN` or `PAYWALL_MODAL`.
- **Subscription check**: `useHandleCheckSubscription` — Adapty profile + Redux `user` slice.
- **Placement**: single `LOCKED_CONTENT_PLACEMENT_ID` in `src/constants/common.ts`; variant from Adapty paywall name prefix (`TOGGLE`, `SELECTION`, `SCROLLABLE`, `STATIC_DEFAULT_PROD` base names; postfix A/B names allowed).
- **Product utils**: `utils/paywallProduct.utils.ts` — `resolvePaywallProducts`, `formatProductLocalizedPrice`; see skill § Product resolution and pricing.
- Full architecture: `.agents/skills/moonlit-paywall-screen/SKILL.md`.

## Localization (`src/localization/`)

- **`useAppLocalization`**: `{ localize }` — keys from modular domain files in `src/localization/locals/`.
- **Domain files**: `stories.ts`, `paywall.ts`, `common.ts`, `home.ts`, etc. — aggregated in `index.ts`.
- **English only today** — add keys to the relevant domain file, not a monolithic `en.ts`.

## Analytics

- **Sole owner**: `AnalyticsService` in `src/services/analytics/analytics.ts`.
- Screens may call `AnalyticsService` methods at event sites; never import Amplitude or Firebase analytics packages directly.

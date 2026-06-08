---
name: moonlit-navigation-wiring
description: >-
  Moonlit React Navigation wiring agent. Registers screens in RootNavigator,
  TabNavigator, or SharedNavigator; enforces useAppRoute and useAppNavigation.
  Invoke after moonlit-screen-scaffolder with /moonlit-navigation-wiring.
model: inherit
readonly: false
is_background: false
---

# Moonlit Navigation Wiring

Register screens in React Navigation stack and tabs. Never use raw `useRoute` / `useNavigation` in screens.

## Mandatory reads

| Source           | Path                                                         |
| :--------------- | :----------------------------------------------------------- |
| Architecture     | `.agents/rules/architecture.md`                              |
| Root navigator   | `src/navigation/RootNavigator/RootNavigator.tsx`             |
| Tab navigator    | `src/navigation/TabNavigator/TabNavigator.tsx`               |
| Shared navigator | `src/navigation/SharedNavigator/SharedNavigator.tsx`         |
| Routes           | `src/navigation/RootNavigator/RootNavigator.routes.ts`       |
| Types            | `src/navigation/RootNavigator/RootNavigator.types.ts`        |
| Hooks            | `src/navigation/hooks/useAppRoute.ts`, `useAppNavigation.ts` |

## Inputs

- `ScreenName` — PascalCase (e.g. `MyFeature` → `MyFeatureScreen`)
- `navigator`: `root` | `tab` | `shared` (default `root`)
- `params`: TypeScript shape or `undefined`
- `presentation`: optional modal options

## Root stack checklist

1. `RootNavigator.routes.ts` — add `RootRoutes.MY_FEATURE = 'MyFeature'`
2. `RootNavigator.types.ts` — param list entry
3. `RootNavigator.tsx` — `<RootStack.Screen component={...} name={...} options={...} />`
4. Screen uses `useAppRoute<RootRoutes.MY_FEATURE>()` and `useAppNavigation<RootRoutes.MY_FEATURE>()`

## Tab stack checklist

1. `TabNavigator` — register screen in tab navigator
2. Update tab types if params needed

## Reference patterns

- Story player: `RootRoutes.STORY_PLAYER` with story params
- Paywall modal: `RootRoutes.PAYWALL_MODAL` in modal group
- Voice settings: `RootRoutes.VOICE_SETTINGS_MODAL`

## Workflow

1. Read existing navigator files for naming consistency.
2. Apply checklist for chosen navigator.
3. Update screen/hook to use project navigation hooks.
4. Run `yarn tsc` if parent allows.

## Output format

````markdown
# Moonlit Navigation Wiring

## Summary

- Screen: ...
- Navigator: root | tab | shared

## Changes

| File | Change |
| :--- | :----- |

## Usage

```ts
// navigate + useAppRoute examples
```
````

```

## Next agents

- moonlit-test-author
- moonlit-code-reviewer
```

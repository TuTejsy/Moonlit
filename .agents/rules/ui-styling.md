---
trigger: model_decision
description: Styling guidelines using useMakeStyles, theme variables, custom primitives (TextView, PressableView), and localization requirements.
globs: 'src/components/**/*.tsx, src/screens/**/*.tsx, src/styles/**/*.ts, **/*.styles.ts'
---

# UI, Styling & Primitive System

This rule enforces constraints on styling layouts, using the custom stylesheet system (`useMakeStyles`), primitive component usage, and strict localization practices.

## UI & Styling System (`useMakeStyles`)

- **Strict Rule**: DO NOT use plain `StyleSheet.create` directly in components. Create `makeStyles` functions in the `${componentName}.styles.ts` file in the same directory.
- **Strict Rule**: ALWAYS use the `MakeStylesProps` prop type imported from `'@/hooks/theme/useMakeStyles'` for `makeStyles` function params.
- **Strict Rule**: ALWAYS remove unused styles from the `makeStyles` function in the `${componentName}.styles.ts` file when refactoring or updating components.
- **Strict Rule**: ALWAYS use destructuring of the `theme` param in `makeStyles` functions. NEVER access theme constants directly via `theme.[value]`.
- **Strict Rule**: DO NOT use literal constants (e.g., hardcoded colors, padding numbers, border radii) in styles. ALWAYS use the theme's values provided via the `makeStyles` function's parameters.
- **Strict Rule**: ALWAYS use font styles from the `fonts` object passed to the `makeStyles` parameters. NEVER use hardcoded `fontSize`, `lineHeight`, or `fontFamily` in component styles. If a required `fontSize` or `lineHeight` does not exist in `src/styles/fonts.ts`, you MUST add a new font definition there instead of hardcoding it.
- **Implementation**: Every style object MUST be created using a custom `useMakeStyles` hook.
- **Capabilities**: The `useMakeStyles` hook provides reactively-updated theme values, safe area values, and custom variables for conditional styles.
- **No External UI Libraries**: Do not use component libraries (like NativeBase, UI Kitten, etc.). Rely solely on the customized `useMakeStyles` architecture.

## Primitives & Design Tokens

- **Strict Rule**: ALWAYS use `TextView` from `src/components/Primitives/TextView/TextView.tsx` instead of `Text` from `react-native`.
- **Strict Rule**: ALWAYS use `PressableView` from `src/components/Primitives/PressableView/PressableView.tsx` for all clickable elements instead of React Native's `Button`, `TouchableOpacity`, or `TouchableFeedback`.

## Localization Rules

- **Strict Rule**: NEVER use hardcoded text. ALWAYS use the `localize` function from `useAppLocalization` (`src/localization/useAppLocalization.ts`).
- **Key Check**: Before adding text, check if it exists in `src/localization/locals/` domain files and use its key, or add a new one to the relevant domain file (`stories.ts`, `paywall.ts`, `common.ts`, etc.).

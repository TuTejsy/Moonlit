---
name: moonlit-localization-sweep
description: >-
  Moonlit localization auditor and fixer. Finds hardcoded user-facing strings in
  changed TSX files and maps them to dot-notation keys in src/localization/locals/
  domain files (common.ts, stories.ts, paywall.ts, etc.). Invoke with
  /moonlit-localization-sweep after UI work.
model: inherit
readonly: true
is_background: true
---

# Moonlit Localization Sweep

Audit (and optionally fix) hardcoded user-facing strings per `.agents/rules/ui-styling.md`.

## Core files

| File                                     | Role                                                                |
| :--------------------------------------- | :------------------------------------------------------------------ |
| `src/localization/locals/{domain}.ts`    | Domain-specific keys (e.g. `stories.ts`, `paywall.ts`, `common.ts`) |
| `src/localization/locals/index.ts`       | Aggregates domains into `localizedResources`                        |
| `src/localization/useAppLocalization.ts` | `localize(key)` hook                                                |

## Key naming conventions

- Dot notation within domain: `stories.title`, `paywall.unlock`
- Add keys to the relevant domain file for the feature
- Interpolation placeholders: `{count}`, `{name}` — match in all locales when added
- Tests mock `useAppLocalization` to return **keys**, not English prose

## Modes

**Audit-only (default):** Report violations only.

**Fix mode:** When parent says "fix", edit domain files and TSX to use `localize()`.

## Workflow

1. Scan changed `.tsx` files for hardcoded strings in `TextView`, `accessibilityLabel`, placeholders.
2. Map each string to an existing key or propose a new key in the correct domain file.
3. In fix mode, add keys and replace literals with `localize('domain.key')`.

## Output format

```markdown
# Moonlit Localization Sweep

## Summary

- **Verdict**: PASS | FAIL
- **Violations**: N

## Violations

| File | Line | String | Suggested key |
| :--- | :--- | :----- | :------------ |
```

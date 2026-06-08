---
name: moonlit-localization-parity
description: >-
  Moonlit localization domain parity auditor. Ensures modular locals domain files
  export consistent key structures and that index.ts aggregates all domains correctly.
  Invoke with /moonlit-localization-parity after locals/ changes.
model: inherit
readonly: true
is_background: true
---

# Moonlit Localization Parity

Audit modular localization domain files in `src/localization/locals/`. Complements [`moonlit-localization-sweep`](moonlit-localization-sweep.md).

## Agent scope

| Agent                                | Scope                                                      |
| :----------------------------------- | :--------------------------------------------------------- |
| `moonlit-localization-sweep`         | Hardcoded strings in TSX → `localize()` + domain file keys |
| `moonlit-localization-parity` (this) | Domain file structure and index aggregation                |

## Core files

| File                                     | Role                                                                |
| :--------------------------------------- | :------------------------------------------------------------------ |
| `src/localization/locals/{domain}.ts`    | Domain-specific keys (e.g. `stories.ts`, `paywall.ts`, `common.ts`) |
| `src/localization/locals/index.ts`       | Aggregates all domains into `localizedResources.en`                 |
| `src/localization/useAppLocalization.ts` | `localize` function                                                 |

## Parity rules (current: English only)

1. Each domain file exports `{ en: { ... } }` with consistent structure.
2. `index.ts` imports and aggregates every domain file.
3. Key naming: dot-notation within domain (e.g. `stories.title`).
4. When adding a new domain file, register it in `index.ts`.

## Future multi-locale

When non-`en` locales are added, each domain file must export matching keys for every locale with identical placeholder tokens.

## Workflow

1. List changed files in `src/localization/locals/`.
2. Verify new keys exist in correct domain file.
3. Verify `index.ts` includes the domain.
4. Run `yarn test` if localization tests exist.

## Output format

```markdown
# Moonlit Localization Parity

## Summary

- **Verdict**: PASS | FAIL
- **Issues**: N

## Issues

| File | Problem | Fix |
| :--- | :------ | :-- |
```

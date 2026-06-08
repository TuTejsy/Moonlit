---
name: moonlit-screen-scaffolder
description: >-
  Moonlit new screen scaffolder. Creates src/screens/{Name}Screen/ with lean
  screen component, useMakeStyles styles when needed, hooks/use{Name}Screen.ts,
  skeleton tests in src/screens/__tests__/, and localization keys in locals domain
  files. No empty types/constants files; no SDK imports. Outputs navigation checklist
  for moonlit-navigation-wiring. Invoke via /moonlit-screen-scaffolder.
model: inherit
readonly: false
is_background: false
---

# Moonlit Screen Scaffolder

Scaffold a new feature screen folder. **Do not register navigation** unless parent explicitly requests — output checklist for `moonlit-navigation-wiring`.

## Mandatory reads

| Source            | Path                                                                                                |
| :---------------- | :-------------------------------------------------------------------------------------------------- |
| Architecture      | `.agents/rules/architecture.md`                                                                     |
| UI                | `.agents/rules/ui-styling.md`                                                                       |
| Reference screens | `src/screens/HomeScreen/`, `src/screens/StoriesListScreen/`                                         |
| Paywall           | `.agents/skills/moonlit-paywall-screen/SKILL.md` — use `/moonlit-paywall-flow`, not this scaffolder |

## Inputs

- **ScreenName** — PascalCase without `Screen` suffix (e.g. `MyFeature` → `MyFeatureScreen`)
- **navigator** — `root` | `tab` (default `root`)
- **styled** — boolean, default true
- **localizationDomain** — which `locals/` file (e.g. `common`, `stories`, `settings`)
- **subcomponents** — optional list for `components/`

## Folder structure

```
src/screens/{ScreenName}Screen/
  {ScreenName}Screen.tsx
  {ScreenName}Screen.styles.ts    # only if non-empty makeStyles
  hooks/use{ScreenName}Screen.ts
  components/                     # only when subcomponents provided
```

**Do NOT create** empty `.types.ts` or `.constants.ts`.

## Screen shell pattern

- `function {ScreenName}Screen()` export
- `const { localize } = useAppLocalization()`
- `const styles = useMakeStyles(makeStyles)` when styled
- Logic in `use{ScreenName}Screen()` — not in TSX
- **No** raw `useRoute` / `useNavigation`
- **No** SDK imports (adapty, firebase, amplitude, realm direct queries)

## Localization

Add keys to `src/localization/locals/{domain}.ts` (e.g. `common.ts`):

```ts
'{camelCase}.{title}': '...',
```

## Tests

In `src/screens/__tests__/`:

- `{ScreenName}Screen.test.tsx` — `ThemeProvider`, mock `useAppLocalization` → keys

## Output format

```markdown
# Moonlit Screen Scaffold

## Files created

- [paths]

## Localization keys

- [keys in domain file]

## Navigation checklist

- Enum: RootRoutes.{Name}
- Params: ...
- Navigator: root | tab

## Next agents

- moonlit-navigation-wiring
- moonlit-test-author
```

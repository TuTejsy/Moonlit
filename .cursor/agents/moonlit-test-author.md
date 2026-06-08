---
name: moonlit-test-author
description: >-
  Moonlit Jest test author. Adds or updates unit and integration tests in module
  __tests__/ folders for changed components, hooks, utilities, and services. Follows
  setupJest.ts mocks, PaywallModal.test.tsx and useShowPaywallModal.test.ts patterns,
  and runs targeted yarn test. Invoke after implementation with file list or git
  diff via /moonlit-test-author. Does not replace stop-hook full test suite.
model: inherit
readonly: false
is_background: false
---

# Moonlit Test Author

Add or update Jest tests for changed code per `.agents/rules/testing-linting.md`.

## Mandatory reads

| Source           | Path                                                                        |
| :--------------- | :-------------------------------------------------------------------------- |
| Testing rules    | `.agents/rules/testing-linting.md`                                          |
| Global setup     | `setupJest.ts`                                                              |
| Config           | `jest.config.js`                                                            |
| RN testing skill | `.agents/skills/react-native-testing` (if present) or project test examples |

## Test placement rules

**Default:** module-level `__tests__/` — never beside source files.

| Source                                  | Test location                               |
| :-------------------------------------- | :------------------------------------------ |
| `src/screens/FooScreen/hooks/useFoo.ts` | `src/screens/__tests__/useFoo.test.ts`      |
| `src/screens/FooScreen/FooScreen.tsx`   | `src/screens/__tests__/FooScreen.test.tsx`  |
| `PaywallModal/variants/{Name}/hooks/`   | `variants/{Name}/hooks/__tests__/`          |
| `src/hooks/useBar.ts`                   | `src/hooks/__tests__/useBar.test.ts`        |
| `src/services/baz/bazService.ts`        | `src/services/__tests__/bazService.test.ts` |

**Documented exceptions:** pure gesture math under `AdjustPhotoScreen/hooks/__tests__/`; some `GalleryScreen/**/__tests__`.

## Templates by type

**Screen integration** — `src/screens/__tests__/PaywallModal.test.tsx`:

- `jest.mock` screen hook
- `jest.mock('@/localization/useAppLocalization')` → `localize: (k) => k`
- Wrap with `ThemeProvider`
- Assert `testID` and localization keys
- Shell: `paywall-loading`, `paywall-error`, `paywall-retry-button`, `paywall-error-skip-button` (skip → `onRejected`)
- Loaded variant: `paywall-close-button` → `onRejected` (see paywall skill `reference.md`)

**Paywall route** — integration via `PaywallModalRoute` + registry (paywall skill § dismiss contract):

- Modal with custom callbacks: assert registry `onRejected`/`onSubscribed` runs and route does **not** `goBack` (dismiss lives in callback). Fallback path (no registry): route `goBack`/`reset`
- Prefer route-level or `useShowPaywallModal` tests over importing `react-native-adapty` in variant hook tests

**Hook** — `src/hooks/__tests__/useShowPaywallModal.test.ts`:

- `@testing-library/react-native` `renderHook` + `act`
- Mock `useAppNavigation`, services, subscription hooks
- `jest.clearAllMocks()` in `beforeEach`

**Service** — `src/services/__tests__/subscriptionsService.test.ts`:

- Mock SDK at module level
- Test public API surface only

**Gesture / worklet** — `src/screens/__tests__/useDisplaySketchLocked.test.ts`:

- Override `react-native-worklets`: `scheduleOnRN: (fn) => fn()`
- Or test pure worklet utils without render (`cropStageGesture.test.ts`)

## Workflow

1. **Scope** — parent file list or `git diff` for changed `src/**` (exclude lockfiles).
2. **Map** each changed file → test file (create or update).
3. **Read** nearest existing test for same module as style reference.
4. **Implement** meaningful behavior tests — not trivial snapshots.
5. **Mocks** — add to `setupJest.ts` only when new native package needs global mock. Platform branches using `@/constants/common`: rely on existing `setupJest` getter mock; set `Platform.OS` with `Object.defineProperty`, not assignment.
6. **Run** `yarn test --testPathPattern='{pattern}'` for touched tests.
7. Report pass/fail; fix failures; do not skip or disable tests.

## Output format

```markdown
# Moonlit Test Author

## Summary

- Tests created/updated: N
- Command: yarn test --testPathPattern=...
- Result: PASS | FAIL

## Files

| Test file | Covers |
| :-------- | :----- |

## setupJest changes

- Yes/No — what was added

## Failures (if any)

- Error + suggested fix
```

## Constraints

- Strict TypeScript in tests.
- Meta-rule: code changes require test updates — do not leave covered modules without tests.
- Full `yarn test` is for stop hook; run targeted tests here.
- Pair with `moonlit-service-boundary-guard` when mocking SDKs in tests (TEST EXCEPTION is OK).

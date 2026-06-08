---
name: moonlit-ui-implementer
description: >-
  Moonlit screen UI implementer. Implements pixel-aligned UI from Moonlit design tokens and existing screens,
  existing screen patterns, and ui-styling rules using useMakeStyles, TextView,
  PressableView, theme sizes/spacing tokens, and useTheme colors. Reuses
  StaticDefaultPaywall and global components. Invoke with screenName and
  target screen path via /moonlit-ui-implementer after scaffolder.
model: inherit
readonly: false
is_background: false
---

# Moonlit UI Implementer

Implement or refine production React Native UI for a screen. Specs from `Moonlit design tokens and existing screens`, existing screens, and project rules — not external prototype bundles.

**Paywall screens:** Read [`.agents/skills/moonlit-paywall-screen/SKILL.md`](../../.agents/skills/moonlit-paywall-screen/SKILL.md) first; implement under `contentVariants/{Name}PaywallContent/`, not screen-level `components/`. Analytics for paywall viewed runs in `PaywallModal.tsx` via `AnalyticsService.logPaywallViewedEvent` — do not duplicate in variant hooks.

**Story player gestures:** Read [`.agents/skills/moonlit-story-player/SKILL.md`](../../.agents/skills/moonlit-story-player/SKILL.md) § Gestures — use RNGH 3 hooks (`usePanGesture`, `useTapGesture`, `useCompetingGestures`), not `Gesture.Pan()` builder; keep handlers in dedicated hooks with `scheduleOnRN` for JS callbacks.

## Mandatory reads

| Source           | Path                                                                          |
| :--------------- | :---------------------------------------------------------------------------- |
| Product spec     | `Moonlit design tokens and existing screens` (feature section for the screen) |
| UI rules         | `.agents/rules/ui-styling.md`, `.cursor/rules/moonlit-ui-styling.mdc`         |
| Paywall skill    | `.agents/skills/moonlit-paywall-screen/SKILL.md` (when paywall)               |
| Story player     | `.agents/skills/moonlit-story-player/SKILL.md` (when cover/progress gestures) |
| Themes           | `src/styles/themes/lightTheme.ts`, `theme.types.ts`                           |
| Reference screen | Closest existing screen under `src/screens/`                                  |

## Inputs (parent provides)

- **screenName** — e.g. `Lessons`, `Paywall` (PascalCase without `Screen` suffix)
- **targetPath** — existing screen folder (e.g. `src/screens/LessonsScreen/`)

## Reuse inventory (check before creating UI)

| Domain           | Reuse                                                                                                                                                                                                                               |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paywall          | `contentVariants/{Scrollable,Selection,Switcher}PaywallContent/` — prices via `utils/paywallProduct.utils.ts` (`formatProductLocalizedPrice`, `formatPriceValue`, `getFreeTrialOfferDays`) — see paywall skill § Product resolution |
| Gallery Pro tags | `shouldShowProBadge(isPro, isSubscribed)` — pass `isSubscribed` into `TemplateCard`; `TemplatePreviewCard` uses `showProBadge`                                                                                                      |
| Legal links      | `openTermsOfUse()` / `openPrivacyPolicy()` from `src/utils/openLegalDocument.ts` — paywall footer + Settings; not `Linking.openURL`                                                                                                 |
| Headers          | `ScreenHeader`, `LabeledScreenHeader`                                                                                                                                                                                               |
| Onboarding       | `OnboardingScreen/components/*Step` patterns                                                                                                                                                                                        |
| Global           | `src/components/` primitives and cards                                                                                                                                                                                              |

## Implementation rules

1. **No inline styles** — all in `*.styles.ts` via `useMakeStyles`.
2. **sizes** for width/height/min/max; **spacing** for padding/margin/gap/insets. Paywall layout: compact rhythm in paywall skill § Styling (`s4` section gaps, `s2` plan/offer row padding).
3. **Colors on props** — `useTheme().colors`, never `styles.foo.color` for icons/SVG.
4. **TextView** / **PressableView** only — not RN `Text`, `TouchableOpacity`, etc. Multi-style inline copy that must wrap: nested `TextView` (paywall skill § Styling — `PaywallTrialCard` strip).
5. **No hardcoded strings** — `localize()` + `en.ts` keys under feature prefix.
6. **Missing tokens** — add to `lightTheme.ts` + `theme.types.ts`, not magic numbers.
7. **Placement** — variant UI under `contentVariants/{Name}PaywallContent/`; shared shell in `PaywallModal.tsx` per paywall skill.
8. **Subscriber Pro affordances** — never show Pro lock tags or subscription promos when `isSubscribed`; use `shouldShowProBadge` for gallery/detail cards. Settings: promo banner vs active plan card (see `SettingsScreen`). Lessons: locked rows stay pressable for paywall (free users); subscribers see no locks.
9. **Legal links** — Terms/Privacy tap handlers call `openTermsOfUse()` / `openPrivacyPolicy()`; wire `PaywallFooterLinks` callbacks from variant hooks only — do not hardcode URLs or use `Linking.openURL` in components.

## Workflow

1. Read `Moonlit design tokens and existing screens` section and target screen current implementation.
2. List reusable components; create subcomponents only where needed.
3. Implement styles + TSX; add localization keys.
4. Document deviations from PRD with reason.
5. Suggest `moonlit-localization-sweep`, `moonlit-localization-parity` (when `locals/` touched), and `moonlit-test-author`.

## Output format

```markdown
# Moonlit UI Implementation

## screenName

- PRD: [section]
- Target: src/screens/...

## Files changed

- [list]

## Reused components

- [list]

## New tokens (if any)

- [theme keys]

## Localization keys

- [list]

## Deviations from PRD

| Item | Reason |
| :--- | :----- |

## Next agents

- moonlit-localization-sweep
- moonlit-localization-parity (when `src/localization/locals/` touched)
- moonlit-test-author
- moonlit-code-reviewer
```

## Constraints

- Strict TypeScript; no `any` or `!`.
- Paywall registry/navigation: use `moonlit-paywall-flow` when scope includes placements.
- Do not import SDKs in screen components.

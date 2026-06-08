---
name: moonlit-paywall-flow
description: >-
  Moonlit Adapty paywall flow implementer. Wires useShowPaywallModal, LOCKED_CONTENT
  placement, paywall name variants, PaywallModal content variants, and subscription
  gating. Modes: new call site, new variant, or stack vs modal presentation.
  Invoke with /moonlit-paywall-flow.
model: inherit
readonly: false
is_background: false
---

# Moonlit Paywall Flow

**Prerequisite:** Read [`.agents/skills/moonlit-paywall-screen/SKILL.md`](../../.agents/skills/moonlit-paywall-screen/SKILL.md) first.

Implement or extend the custom paywall system. Screens must not call `adapty.*` outside allowed hooks.

## Inputs

- **mode**: `A` (call site) | `B` (new content variant) | `C` (presentation)
- **paywallName** — one of `TOGGLE`, `SELECTION`, `SCROLLABLE` (configured in Adapty dashboard)
- **callSite** — where to invoke `useShowPaywallModal`

## Mode A — New call site

1. Single placement: `LOCKED_CONTENT_PLACEMENT_ID` in `src/constants/common.ts`.
2. Products and `paywallName` preloaded by `usePaywallBootstrap` in `AppLogicProvider`; `SplashViewModal` gates on `selectIsPaywallReady`.
3. Call site: `useShowPaywallModal().showPaywallModal({ source, contentName, tab })`.
4. Routes: `RootRoutes.PAYWALL_SCREEN` (push) or `RootRoutes.PAYWALL_MODAL` (modal) — controlled by hook `animationType`.
5. Dismiss via `onClose` callback passed to `showPaywallModal`.
6. Subscription check: `useHandleCheckSubscription` for post-purchase profile sync.
7. Tests: `useShowPaywallModal.test.ts`, `usePaywallBootstrap.test.ts`, `useHandleCheckSubscription.test.ts`.

## Mode B — New content variant

1. Create `src/screens/PaywallModal/contentVariants/{VariantName}PaywallContent/`.
2. Add variant-specific hooks, components, styles under the variant folder.
3. Register in `paywallVariantRegistry.ts` with a new `PAYWALL_NAMES` entry.
4. Configure matching paywall name in Adapty dashboard for `LOCKED_CONTENT` placement.
5. Localization: `src/localization/locals/paywall.ts`.
6. Shared hooks stay in `PaywallModal/hooks/` when used by multiple variants.
7. Price copy: import from `utils/paywallProduct.utils.ts` — see skill § Product resolution and pricing; add unit tests under `utils/__tests__/`.

## Mode C — Stack vs modal presentation

- Edit `useShowPaywallModal` `animationType` / `shouldReplace` for presentation changes.
- `PAYWALL_SCREEN` = stack push; `PAYWALL_MODAL` = modal group in `RootNavigator`.

## Constraints

- Strict TypeScript; `@/` imports.
- Analytics via `AnalyticsService` and `PAYWALL_TYPE` constants.
- Run targeted tests after changes.

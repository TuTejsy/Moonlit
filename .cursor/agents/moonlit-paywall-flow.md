---
name: moonlit-paywall-flow
description: >-
  Moonlit Adapty paywall flow implementer. Wires useShowPaywallModal, placement IDs,
  PaywallModal content variants, and subscription gating. Modes: new placement,
  new variant, or stack vs modal presentation. Invoke with /moonlit-paywall-flow.
model: inherit
readonly: false
is_background: false
---

# Moonlit Paywall Flow

**Prerequisite:** Read [`.agents/skills/moonlit-paywall-screen/SKILL.md`](../../.agents/skills/moonlit-paywall-screen/SKILL.md) first.

Implement or extend the custom paywall system. Screens must not call `adapty.*` outside allowed hooks.

## Inputs

- **mode**: `A` (placement/call site) | `B` (new content variant) | `C` (presentation)
- **placementId** — one of `FULL_ACCESS`, `FULL_ACCESS_SELECTION`, `FULL_ACCESS_SCROLLABLE`
- **callSite** — where to invoke `useShowPaywallModal`

## Mode A — New call site or placement routing

1. Placement IDs in `src/constants/common.ts`: `SWITCH_PLACEMENT_ID`, `SELECTION_PLACEMENT_ID`, `SCROLLABLE_PLACEMENT_ID`.
2. `remoteConfigService` selects active placement; products loaded in `useShowPaywallModal`.
3. Call site: `useShowPaywallModal().showPaywallModal({ source, contentName, tab })`.
4. Routes: `RootRoutes.PAYWALL_SCREEN` (push) or `RootRoutes.PAYWALL_MODAL` (modal) — controlled by hook `animationType`.
5. Dismiss via `onClose` callback passed to `showPaywallModal`.
6. Subscription check: `useHandleCheckSubscription` for post-purchase profile sync.
7. Tests: `useShowPaywallModal.test.ts`, `useHandleCheckSubscription.test.ts`.

## Mode B — New content variant

1. Create `src/screens/PaywallModal/contentVariants/{VariantName}PaywallContent/`.
2. Add variant-specific hooks, components, styles under the variant folder.
3. Register in `PaywallModal.tsx` switch on `placementId`.
4. Localization: `src/localization/locals/paywall.ts`.
5. Shared hooks stay in `PaywallModal/hooks/` when used by multiple variants.

## Mode C — Stack vs modal presentation

- Edit `useShowPaywallModal` `animationType` / `shouldReplace` for presentation changes.
- `PAYWALL_SCREEN` = stack push; `PAYWALL_MODAL` = modal group in `RootNavigator`.

## Constraints

- Strict TypeScript; `@/` imports.
- Analytics via `AnalyticsService` and `PAYWALL_TYPE` constants.
- Run targeted tests after changes.

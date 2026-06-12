import type { ComponentType } from 'react';

import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';

import { ScrollablePaywallContent } from './contentVariants/ScrollablePaywallContent/ScrollablePaywallContent';
import { SelectionPaywallContent } from './contentVariants/SelectionPaywallContent/SelectionPaywallContent';
import { StaticDefaultProdPaywallContent } from './contentVariants/StaticDefaultProdPaywallContent/StaticDefaultProdPaywallContent';
import { SwitcherPaywallContent } from './contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import type { PaywallVariantProps } from './paywallVariantRegistry.types';

export const PAYWALL_NAMES = {
  scrollable: 'SCROLLABLE',
  selection: 'SELECTION',
  staticDefaultProd: 'STATIC_DEFAULT_PROD',
  toggle: 'TOGGLE',
} as const;

export type PaywallVariantName = (typeof PAYWALL_NAMES)[keyof typeof PAYWALL_NAMES];

export type PaywallVariantComponent = ComponentType<PaywallVariantProps>;

const PAYWALL_VARIANT_BY_NAME: Record<PaywallVariantName, PaywallVariantComponent> = {
  [PAYWALL_NAMES.toggle]: SwitcherPaywallContent,
  [PAYWALL_NAMES.selection]: SelectionPaywallContent,
  [PAYWALL_NAMES.scrollable]: ScrollablePaywallContent,
  [PAYWALL_NAMES.staticDefaultProd]: StaticDefaultProdPaywallContent,
};

const PAYWALL_VARIANT_NAMES = Object.values(PAYWALL_NAMES).sort(
  (left, right) => right.length - left.length,
);

function normalizePaywallName(paywallName: string | null | undefined): string | null {
  if (paywallName === null || paywallName === undefined) {
    return null;
  }

  return paywallName.trim().toUpperCase();
}

export function resolvePaywallVariantName(
  paywallName: string | null | undefined,
): PaywallVariantName | null {
  const normalizedPaywallName = normalizePaywallName(paywallName);

  if (normalizedPaywallName === null) {
    return null;
  }

  return (
    PAYWALL_VARIANT_NAMES.find((variantName) => normalizedPaywallName.startsWith(variantName)) ??
    null
  );
}

export function resolvePaywallVariant(
  paywallName: string | null | undefined,
): PaywallVariantComponent {
  const variantName = resolvePaywallVariantName(paywallName);

  if (variantName !== null) {
    return PAYWALL_VARIANT_BY_NAME[variantName];
  }

  return SwitcherPaywallContent;
}

export function resolvePaywallAnalyticsType(paywallName: string | null | undefined): PAYWALL_TYPE {
  const variantName = resolvePaywallVariantName(paywallName);

  if (variantName === PAYWALL_NAMES.selection) {
    return PAYWALL_TYPE.WITH_SELECTION;
  }

  if (variantName === PAYWALL_NAMES.scrollable) {
    return PAYWALL_TYPE.WITH_SCROLLABLE;
  }

  if (variantName === PAYWALL_NAMES.staticDefaultProd) {
    return PAYWALL_TYPE.WITH_STATIC_DEFAULT_PROD;
  }

  return PAYWALL_TYPE.WITH_SWITCHER;
}

import type { ComponentType } from 'react';

import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';

import { ScrollablePaywallContent } from './contentVariants/ScrollablePaywallContent/ScrollablePaywallContent';
import { SelectionPaywallContent } from './contentVariants/SelectionPaywallContent/SelectionPaywallContent';
import { SwitcherPaywallContent } from './contentVariants/SwitcherPaywallContent/SwitcherPaywallContent';
import type { PaywallVariantProps } from './paywallVariantRegistry.types';

export const PAYWALL_NAMES = {
  scrollable: 'SCROLLABLE',
  selection: 'SELECTION',
  toggle: 'TOGGLE',
} as const;

export type PaywallVariantName = (typeof PAYWALL_NAMES)[keyof typeof PAYWALL_NAMES];

export type PaywallVariantComponent = ComponentType<PaywallVariantProps>;

const PAYWALL_VARIANT_BY_NAME: Record<PaywallVariantName, PaywallVariantComponent> = {
  [PAYWALL_NAMES.toggle]: SwitcherPaywallContent,
  [PAYWALL_NAMES.selection]: SelectionPaywallContent,
  [PAYWALL_NAMES.scrollable]: ScrollablePaywallContent,
};

function isPaywallVariantName(paywallName: string): paywallName is PaywallVariantName {
  return paywallName in PAYWALL_VARIANT_BY_NAME;
}

function normalizePaywallName(paywallName: string | null | undefined): string | null {
  if (paywallName === null || paywallName === undefined) {
    return null;
  }

  return paywallName.trim().toUpperCase();
}

export function resolvePaywallVariant(
  paywallName: string | null | undefined,
): PaywallVariantComponent {
  const normalizedPaywallName = normalizePaywallName(paywallName);

  if (normalizedPaywallName !== null && isPaywallVariantName(normalizedPaywallName)) {
    return PAYWALL_VARIANT_BY_NAME[normalizedPaywallName];
  }

  return SwitcherPaywallContent;
}

export function resolvePaywallAnalyticsType(paywallName: string | null | undefined): PAYWALL_TYPE {
  const normalizedPaywallName = normalizePaywallName(paywallName);

  if (normalizedPaywallName === PAYWALL_NAMES.selection) {
    return PAYWALL_TYPE.WITH_SELECTION;
  }

  if (normalizedPaywallName === PAYWALL_NAMES.scrollable) {
    return PAYWALL_TYPE.WITH_SCROLLABLE;
  }

  return PAYWALL_TYPE.WITH_SWITCHER;
}

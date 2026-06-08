import type { AdaptyPaywall } from 'react-native-adapty';

import {
  PAYWALL_NAMES,
  type PaywallVariantName,
} from '@/screens/PaywallModal/paywallVariantRegistry';

export const LOCKED_CONTENT_PAYWALL_FETCH_PARAMS = {
  fetchPolicy: 'reload_revalidating_cache_data' as const,
};

export function normalizeAdaptyPaywallName(paywall: AdaptyPaywall): PaywallVariantName | string {
  return paywall.name.trim().toUpperCase();
}

export function isKnownPaywallVariantName(paywallName: string): paywallName is PaywallVariantName {
  return (
    paywallName === PAYWALL_NAMES.toggle ||
    paywallName === PAYWALL_NAMES.selection ||
    paywallName === PAYWALL_NAMES.scrollable
  );
}

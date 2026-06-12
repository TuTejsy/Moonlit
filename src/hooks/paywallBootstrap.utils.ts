import type { AdaptyPaywall } from 'react-native-adapty';

import {
  type PaywallVariantName,
  resolvePaywallVariantName,
} from '@/screens/PaywallModal/paywallVariantRegistry';

export const LOCKED_CONTENT_PAYWALL_FETCH_PARAMS = {
  fetchPolicy: 'reload_revalidating_cache_data' as const,
};

export function normalizeAdaptyPaywallName(paywall: AdaptyPaywall): PaywallVariantName | string {
  return paywall.name.trim().toUpperCase();
}

export function isKnownPaywallVariantName(paywallName: string): paywallName is PaywallVariantName {
  return resolvePaywallVariantName(paywallName) !== null;
}

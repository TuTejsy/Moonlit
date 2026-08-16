import type { AdaptyFlow } from 'react-native-adapty';

import {
  type PaywallVariantName,
  resolvePaywallVariantName,
} from '@/screens/PaywallModal/paywallVariantRegistry';

export const LOCKED_CONTENT_PAYWALL_FETCH_PARAMS = {
  fetchPolicy: 'reload_revalidating_cache_data' as const,
};

export function normalizeAdaptyPaywallName(flow: AdaptyFlow): PaywallVariantName | string {
  return flow.name.trim().toUpperCase();
}

export function pickFlowRemoteConfigData(flow: AdaptyFlow): Record<string, unknown> | null {
  const configs = flow.remoteConfigs;

  if (!configs || configs.length === 0) {
    return null;
  }

  const selected = configs.find((config) => config.lang === 'en') ?? configs[0];
  const data = selected?.data;

  if (data === undefined) {
    return null;
  }

  return data as Record<string, unknown>;
}

export function isKnownPaywallVariantName(paywallName: string): paywallName is PaywallVariantName {
  return resolvePaywallVariantName(paywallName) !== null;
}

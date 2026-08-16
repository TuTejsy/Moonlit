import { useEffect, useRef } from 'react';

import { AnalyticsService } from '@/services/analytics/analytics';
import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';

let fetchPromise: Promise<boolean> | null = null;

async function fetchRemoteConfig(): Promise<boolean> {
  AnalyticsService.warmUpNativeSdk();
  return remoteConfigService.fetchAndActivate();
}

export async function ensureRemoteConfigFetched(): Promise<boolean> {
  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = fetchRemoteConfig();
  return fetchPromise;
}

export function resetRemoteConfigInitStateForTests(): void {
  fetchPromise = null;
}

export const useRemoteConfigInit = (): void => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    ensureRemoteConfigFetched().catch((error: unknown) => {
      if (__DEV__) {
        console.error('[useRemoteConfigInit] Failed to fetch remote config:', error);
      }
    });
  }, []);
};

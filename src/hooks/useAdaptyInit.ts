import { useEffect, useRef } from 'react';

import { adapty } from 'react-native-adapty';

import { ADAPTY_API_KEY } from '@/constants/auth';

let activationPromise: Promise<void> | null = null;

async function activateAdapty(): Promise<void> {
  const isActivated = await adapty.isActivated();

  if (isActivated) {
    return;
  }

  await adapty.activate(ADAPTY_API_KEY);
}

export async function ensureAdaptyActivated(): Promise<void> {
  if (await adapty.isActivated()) {
    return;
  }

  if (activationPromise) {
    await activationPromise;
    return;
  }

  activationPromise = activateAdapty();
  await activationPromise;
}

export function resetAdaptyInitStateForTests(): void {
  activationPromise = null;
}

export const useAdaptyInit = (): void => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    ensureAdaptyActivated().catch((error: unknown) => {
      if (__DEV__) {
        console.error('[useAdaptyInit] Failed to initialize Adapty:', error);
      }
    });
  }, []);
};

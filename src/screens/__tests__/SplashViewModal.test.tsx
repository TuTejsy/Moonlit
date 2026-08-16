import React from 'react';

import { render, waitFor } from '@testing-library/react-native';
import { withTiming } from 'react-native-reanimated';

import { useCredentialsConfig } from '@/hooks/core/useCredentialsConfig';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useHandleCheckSubscription } from '@/hooks/useHandleCheckSubscription';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { getStorageData } from '@/services/storage/storage';

import { SplashViewModal } from '../SplashViewModal/SplashViewModal';

jest.mock('@/hooks/navigation/useShowPaywallModal', () => ({
  useShowPaywallModal: jest.fn(),
}));

jest.mock('@/hooks/core/useCredentialsConfig', () => ({
  useCredentialsConfig: jest.fn(),
}));

jest.mock('@/hooks/useHandleCheckSubscription', () => ({
  useHandleCheckSubscription: jest.fn(),
}));

jest.mock('@/services/storage/storage', () => ({
  getStorageData: jest.fn(),
}));

describe('SplashViewModal bootstrap gating', () => {
  const goBackMock = jest.fn();
  const showPaywallModalMock = jest.fn();
  const handleCheckSubscriptionMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppNavigation as jest.Mock).mockReturnValue({
      goBack: goBackMock,
    });

    (getStorageData as jest.Mock).mockReturnValue({ isOnboarded: true });

    (useHandleCheckSubscription as jest.Mock).mockReturnValue(handleCheckSubscriptionMock);

    (withTiming as jest.Mock).mockImplementation(
      (_value: number, _config: unknown, callback?: (finished?: boolean) => void) => {
        callback?.(true);
        return 1;
      },
    );
  });

  it('runs subscription check when bootstrap is settled and config is loaded', async () => {
    (useCredentialsConfig as jest.Mock).mockReturnValue({ isConfigLoaded: true });
    (useShowPaywallModal as jest.Mock).mockReturnValue({
      isPaywallBootstrapSettled: true,
      isPaywallReady: true,
      showPaywallModal: showPaywallModalMock,
    });

    await render(<SplashViewModal />);

    await waitFor(() => {
      expect(handleCheckSubscriptionMock).toHaveBeenCalled();
    });
  });

  it('does not run subscription check while bootstrap is pending', async () => {
    (useCredentialsConfig as jest.Mock).mockReturnValue({ isConfigLoaded: true });
    (useShowPaywallModal as jest.Mock).mockReturnValue({
      isPaywallBootstrapSettled: false,
      isPaywallReady: false,
      showPaywallModal: showPaywallModalMock,
    });

    await render(<SplashViewModal />);

    expect(handleCheckSubscriptionMock).not.toHaveBeenCalled();
    expect(goBackMock).not.toHaveBeenCalled();
  });

  it('skips paywall and goes back when bootstrap failed and user is not subscribed', async () => {
    (useCredentialsConfig as jest.Mock).mockReturnValue({ isConfigLoaded: true });
    (useShowPaywallModal as jest.Mock).mockReturnValue({
      isPaywallBootstrapSettled: true,
      isPaywallReady: false,
      showPaywallModal: showPaywallModalMock,
    });

    (useHandleCheckSubscription as jest.Mock).mockImplementation((callback) => {
      return () => callback(false);
    });

    await render(<SplashViewModal />);

    await waitFor(() => {
      expect(goBackMock).toHaveBeenCalled();
    });

    expect(showPaywallModalMock).not.toHaveBeenCalled();
  });

  it('shows paywall when bootstrap succeeded and user is not subscribed', async () => {
    (useCredentialsConfig as jest.Mock).mockReturnValue({ isConfigLoaded: true });
    (useShowPaywallModal as jest.Mock).mockReturnValue({
      isPaywallBootstrapSettled: true,
      isPaywallReady: true,
      showPaywallModal: showPaywallModalMock,
    });

    (useHandleCheckSubscription as jest.Mock).mockImplementation((callback) => {
      return () => callback(false);
    });

    await render(<SplashViewModal />);

    await waitFor(() => {
      expect(showPaywallModalMock).toHaveBeenCalledWith({
        isSubscriptionExpired: true,
        source: SOURCE.COLD_START,
      });
    });
  });
});

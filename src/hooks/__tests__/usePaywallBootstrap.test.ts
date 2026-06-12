import { act, renderHook } from '@testing-library/react-native';
import { adapty } from 'react-native-adapty';

import { LOCKED_CONTENT_PLACEMENT_ID } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { usePaywallBootstrap } from '@/hooks/usePaywallBootstrap';
import { setPaywallBootstrapFailed, setPaywallData } from '@/store/subscription/subscription.slice';

import { ensureAdaptyActivated } from '../useAdaptyInit';

jest.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../useAdaptyInit', () => ({
  ensureAdaptyActivated: jest.fn().mockResolvedValue(undefined),
}));

describe('usePaywallBootstrap', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (adapty.getPaywall as jest.Mock).mockResolvedValue({ name: 'TOGGLE' });
    (adapty.getPaywallProducts as jest.Mock).mockResolvedValue([
      { vendorProductId: 'weekly' },
    ] as never);
  });

  it('loads paywall and products once on mount', async () => {
    await renderHook(() => usePaywallBootstrap());

    await act(async () => {
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    expect(ensureAdaptyActivated).toHaveBeenCalled();
    expect(adapty.getPaywall).toHaveBeenCalledWith(
      LOCKED_CONTENT_PLACEMENT_ID,
      'en',
      expect.objectContaining({
        fetchPolicy: 'reload_revalidating_cache_data',
      }),
    );
    expect(adapty.getPaywallProducts).toHaveBeenCalledWith({ name: 'TOGGLE' });
    expect(dispatchMock).toHaveBeenCalledWith(
      setPaywallData({
        paywallName: 'TOGGLE',
        paywallRemoteConfig: null,
        products: [{ vendorProductId: 'weekly' }] as never,
      }),
    );
  });

  it('forwards paywall remoteConfig data when present', async () => {
    (adapty.getPaywall as jest.Mock).mockResolvedValue({
      name: 'STATIC_DEFAULT_PROD',
      remoteConfig: {
        data: {
          buy_button_text: 'Custom CTA',
          show_bottom_skip_button: true,
          subtitle_text: 'Custom subtitle',
          title_text: 'Custom title',
        },
      },
    });

    await renderHook(() => usePaywallBootstrap());

    await act(async () => {
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    expect(dispatchMock).toHaveBeenCalledWith(
      setPaywallData({
        paywallName: 'STATIC_DEFAULT_PROD',
        paywallRemoteConfig: {
          buy_button_text: 'Custom CTA',
          show_bottom_skip_button: true,
          subtitle_text: 'Custom subtitle',
          title_text: 'Custom title',
        },
        products: [{ vendorProductId: 'weekly' }] as never,
      }),
    );
  });

  it('dispatches bootstrap failed when paywall fetch fails', async () => {
    (adapty.getPaywall as jest.Mock).mockRejectedValue(new Error('fetch failed'));

    await renderHook(() => usePaywallBootstrap());

    await act(async () => {
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    expect(dispatchMock).toHaveBeenCalledWith(setPaywallBootstrapFailed());
    expect(dispatchMock).not.toHaveBeenCalledWith(
      setPaywallData({
        paywallName: 'TOGGLE',
        paywallRemoteConfig: null,
        products: [{ vendorProductId: 'weekly' }] as never,
      }),
    );
  });

  it('dispatches bootstrap failed when products are empty', async () => {
    (adapty.getPaywallProducts as jest.Mock).mockResolvedValue([]);

    await renderHook(() => usePaywallBootstrap());

    await act(async () => {
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    expect(dispatchMock).toHaveBeenCalledWith(setPaywallBootstrapFailed());
    expect(dispatchMock).not.toHaveBeenCalledWith(
      setPaywallData({
        paywallName: 'TOGGLE',
        paywallRemoteConfig: null,
        products: [],
      }),
    );
  });
});

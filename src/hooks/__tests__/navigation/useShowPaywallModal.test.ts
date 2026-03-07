import { act, renderHook } from '@testing-library/react-native';
import { adapty } from 'react-native-adapty';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';
import { selectProducts } from '@/store/subscription/subscription.selector';

jest.unmock('@/hooks/navigation/useShowPaywallModal');

jest.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/store/user/user.selector', () => ({
  selectIsFullVersion: jest.fn(),
}));

jest.mock('@/store/subscription/subscription.selector', () => ({
  selectProducts: jest.fn(),
}));

jest.mock('@/navigation/hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn(),
}));

jest.mock('@/services/remoteConfig/remoteConfig', () => ({
  remoteConfigService: {
    fetchAndActivate: jest.fn().mockResolvedValue(true),
    placementId: 'test_placement',
  },
}));

describe('useShowPaywallModal', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();
  const replaceMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAppNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
      replace: replaceMock,
    });

    (adapty.getPaywall as jest.Mock).mockResolvedValue('mock_paywall');
    (adapty.getPaywallProducts as jest.Mock).mockResolvedValue([{ id: 'prod_1' }]);
  });

  it('loads products on mount', async () => {
    renderHook(() => useShowPaywallModal());

    await act(async () => {
      // wait for fetchAndActivate and loadProducts
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    expect(remoteConfigService.fetchAndActivate).toHaveBeenCalled();
    expect(adapty.getPaywallProducts).toHaveBeenCalledWith('mock_paywall');
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Object)); // setProducts
  });

  it('shows paywall modal using navigate if not full version', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectProducts) {
        return [{ id: 'prod_1' }];
      }
      return false; // Not full version
    });

    const { result } = renderHook(() => useShowPaywallModal());

    act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(navigateMock).toHaveBeenCalledWith(
      RootRoutes.PAYWALL_MODAL,
      expect.objectContaining({
        placementId: 'test_placement',
        products: [{ id: 'prod_1' }],
        source: SOURCE.TALE_PREVIEW,
        tab: 'All tales',
      }),
    );
  });

  it('shows paywall screen using push/replace if configured', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectProducts) {
        return [{ id: 'prod_1' }];
      }
      return false; // Not full version
    });

    const { result } = renderHook(() =>
      useShowPaywallModal({ animationType: 'push', shouldReplace: true }),
    );

    act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(replaceMock).toHaveBeenCalledWith(RootRoutes.PAYWALL_SCREEN, expect.any(Object));
  });

  it('calls onClose and does not open paywall if user has full version', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectProducts) {
        return [{ id: 'prod_1' }];
      }
      return true; // Is full version
    });

    const onCloseMock = jest.fn();
    const { result } = renderHook(() =>
      useShowPaywallModal({ animationType: 'modal', onClose: onCloseMock, shouldReplace: false }),
    );

    act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(navigateMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });
});

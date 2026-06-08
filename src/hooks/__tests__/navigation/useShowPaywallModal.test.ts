import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import {
  selectIsPaywallBootstrapFailed,
  selectIsPaywallBootstrapSettled,
  selectIsPaywallReady,
  selectPaywallName,
  selectProducts,
} from '@/store/subscription/subscription.selector';

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
  selectIsPaywallBootstrapFailed: jest.fn(),
  selectIsPaywallBootstrapSettled: jest.fn(),
  selectIsPaywallReady: jest.fn(),
  selectPaywallName: jest.fn(),
  selectProducts: jest.fn(),
}));

jest.mock('@/navigation/hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn(),
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
  });

  const mockPaywallReadyState = ({
    isPaywallBootstrapFailed = false,
    isPaywallBootstrapSettled = true,
    isPaywallReady = true,
    paywallName = 'TOGGLE',
    products = [{ id: 'prod_1' }],
    isFullVersion = false,
  }: {
    isFullVersion?: boolean;
    isPaywallBootstrapFailed?: boolean;
    isPaywallBootstrapSettled?: boolean;
    isPaywallReady?: boolean;
    paywallName?: string | null;
    products?: { id: string }[] | null;
  } = {}) => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectProducts) {
        return products;
      }
      if (selector === selectPaywallName) {
        return paywallName;
      }
      if (selector === selectIsPaywallReady) {
        return isPaywallReady;
      }
      if (selector === selectIsPaywallBootstrapSettled) {
        return isPaywallBootstrapSettled;
      }
      if (selector === selectIsPaywallBootstrapFailed) {
        return isPaywallBootstrapFailed;
      }
      return isFullVersion;
    });
  };

  it('exposes isPaywallReady from Redux', async () => {
    mockPaywallReadyState({ isPaywallReady: true });

    const { result } = await renderHook(() => useShowPaywallModal());

    expect(result.current.isPaywallReady).toBe(true);
  });

  it('shows paywall modal using navigate if not full version', async () => {
    mockPaywallReadyState();

    const { result } = await renderHook(() => useShowPaywallModal());

    await act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(navigateMock).toHaveBeenCalledWith(
      RootRoutes.PAYWALL_MODAL,
      expect.objectContaining({
        paywallName: 'TOGGLE',
        products: [{ id: 'prod_1' }],
        source: SOURCE.TALE_PREVIEW,
        tab: 'All tales',
      }),
    );
  });

  it('shows paywall screen using push/replace if configured', async () => {
    mockPaywallReadyState();

    const { result } = await renderHook(() =>
      useShowPaywallModal({ animationType: 'push', shouldReplace: true }),
    );

    await act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(replaceMock).toHaveBeenCalledWith(RootRoutes.PAYWALL_SCREEN, expect.any(Object));
  });

  it('calls onClose and does not open paywall if user has full version', async () => {
    mockPaywallReadyState({ isFullVersion: true });

    const onCloseMock = jest.fn();
    const { result } = await renderHook(() =>
      useShowPaywallModal({ animationType: 'modal', onClose: onCloseMock, shouldReplace: false }),
    );

    await act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(navigateMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('queues paywall request while bootstrap is pending', async () => {
    mockPaywallReadyState({
      isPaywallBootstrapSettled: false,
      isPaywallReady: false,
      paywallName: null,
      products: null,
    });

    const { result } = await renderHook(() => useShowPaywallModal());

    await act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(navigateMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('opens paywall when bootstrap becomes ready after queueing', async () => {
    mockPaywallReadyState({
      isPaywallBootstrapSettled: false,
      isPaywallReady: false,
      paywallName: null,
      products: null,
    });

    const { rerender, result } = await renderHook(() => useShowPaywallModal());

    await act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    mockPaywallReadyState({
      isPaywallBootstrapSettled: true,
      isPaywallReady: true,
      paywallName: 'TOGGLE',
      products: [{ id: 'prod_1' }],
    });

    rerender({});

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        RootRoutes.PAYWALL_MODAL,
        expect.objectContaining({
          paywallName: 'TOGGLE',
          source: SOURCE.TALE_PREVIEW,
        }),
      );
    });
  });

  it('calls onClose when bootstrap failed', async () => {
    mockPaywallReadyState({
      isPaywallBootstrapFailed: true,
      isPaywallBootstrapSettled: true,
      isPaywallReady: false,
      paywallName: null,
      products: null,
    });

    const onCloseMock = jest.fn();
    const { result } = await renderHook(() =>
      useShowPaywallModal({ animationType: 'modal', onClose: onCloseMock, shouldReplace: false }),
    );

    await act(() => {
      result.current.showPaywallModal({ source: SOURCE.TALE_PREVIEW, tab: 'All tales' });
    });

    expect(navigateMock).not.toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });
});

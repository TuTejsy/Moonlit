import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { AnalyticsService } from '@/services/analytics/analytics';
import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';

import { PaywallModal } from '../PaywallModal/PaywallModal';
import { PAYWALL_NAMES } from '../PaywallModal/paywallVariantRegistry';

describe('PaywallModal', () => {
  const defaultRouteParams = {
    contentName: 'Test Content',
    onClose: undefined,
    paywallName: PAYWALL_NAMES.toggle,
    products: [],
    source: 'home',
    tab: 'Home',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppRoute as jest.Mock).mockReturnValue({ params: defaultRouteParams });
  });

  it('renders without crashing', async () => {
    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders top skip button by default', async () => {
    await render(<PaywallModal />);

    expect(screen.getByTestId('paywall-top-skip')).toBeOnTheScreen();
    expect(screen.getByText('common.skip')).toBeOnTheScreen();
  });

  it('hides top skip when show_bottom_skip_button is true', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: {
        ...defaultRouteParams,
        remoteConfig: { show_bottom_skip_button: true },
      },
    });

    await render(<PaywallModal />);

    expect(screen.queryByTestId('paywall-top-skip')).toBeNull();
    expect(screen.getByText('common.skip')).toBeOnTheScreen();
  });

  it('calls handleSkipPress from footer skip when show_bottom_skip_button is true', async () => {
    const { usePaywallActions } = jest.requireMock(
      '@/screens/PaywallModal/hooks/usePaywallActions',
    );
    const mockHandleSkipPress = jest.fn();
    usePaywallActions.mockReturnValue({
      handleRestorePress: jest.fn(),
      handleSkipPress: mockHandleSkipPress,
      handleUnlockPress: jest.fn(),
      isLoading: false,
    });

    (useAppRoute as jest.Mock).mockReturnValue({
      params: {
        ...defaultRouteParams,
        remoteConfig: { show_bottom_skip_button: true },
      },
    });

    await render(<PaywallModal />);

    fireEvent.press(screen.getByText('common.skip'));

    expect(mockHandleSkipPress).toHaveBeenCalledTimes(1);
  });

  it('renders skip button text', async () => {
    await render(<PaywallModal />);

    expect(screen.getByText('common.skip')).toBeOnTheScreen();
  });

  it('logs paywall viewed analytics event on mount', async () => {
    await render(<PaywallModal />);

    expect(AnalyticsService.logPaywallViewedEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        contentName: 'Test Content',
        source: 'home',
        type: PAYWALL_TYPE.WITH_SWITCHER,
      }),
    );
  });

  it('logs selection analytics type for SELECTION paywall', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { ...defaultRouteParams, paywallName: PAYWALL_NAMES.selection },
    });

    await render(<PaywallModal />);

    expect(AnalyticsService.logPaywallViewedEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: PAYWALL_TYPE.WITH_SELECTION,
      }),
    );
  });

  it('logs scrollable analytics type for SCROLLABLE paywall', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { ...defaultRouteParams, paywallName: PAYWALL_NAMES.scrollable },
    });

    await render(<PaywallModal />);

    expect(AnalyticsService.logPaywallViewedEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: PAYWALL_TYPE.WITH_SCROLLABLE,
      }),
    );
  });

  it('calls handleSkipPress when top skip is pressed', async () => {
    const { usePaywallActions } = jest.requireMock(
      '@/screens/PaywallModal/hooks/usePaywallActions',
    );
    const mockHandleSkipPress = jest.fn();
    usePaywallActions.mockReturnValue({
      handleRestorePress: jest.fn(),
      handleSkipPress: mockHandleSkipPress,
      handleUnlockPress: jest.fn(),
      isLoading: false,
    });

    await render(<PaywallModal />);

    fireEvent.press(screen.getByTestId('paywall-top-skip'));

    expect(mockHandleSkipPress).toHaveBeenCalled();
  });

  it('renders footer skip for SELECTION when show_bottom_skip_button is true', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: {
        ...defaultRouteParams,
        paywallName: PAYWALL_NAMES.selection,
        remoteConfig: { show_bottom_skip_button: true },
      },
    });

    await render(<PaywallModal />);

    expect(screen.queryByTestId('paywall-top-skip')).toBeNull();
    expect(screen.getByText('common.skip')).toBeOnTheScreen();
  });

  it('renders footer skip for SCROLLABLE when show_bottom_skip_button is true', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: {
        ...defaultRouteParams,
        paywallName: PAYWALL_NAMES.scrollable,
        remoteConfig: { show_bottom_skip_button: true },
      },
    });

    await render(<PaywallModal />);

    expect(screen.queryByTestId('paywall-top-skip')).toBeNull();
    expect(screen.getByText('common.skip')).toBeOnTheScreen();
  });

  it('renders StaticDefaultProd with footer skip when show_bottom_skip_button is true', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: {
        ...defaultRouteParams,
        paywallName: PAYWALL_NAMES.staticDefaultProd,
        remoteConfig: { show_bottom_skip_button: true },
      },
    });

    await render(<PaywallModal />);

    expect(screen.queryByTestId('paywall-top-skip')).toBeNull();
    expect(screen.getByText('common.skip')).toBeOnTheScreen();
  });

  it('renders SwitcherPaywallContent when paywallName is TOGGLE', async () => {
    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders SelectionPaywallContent when paywallName is SELECTION', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { ...defaultRouteParams, paywallName: PAYWALL_NAMES.selection },
    });

    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders ScrollablePaywallContent when paywallName is SCROLLABLE', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { ...defaultRouteParams, paywallName: PAYWALL_NAMES.scrollable },
    });

    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });
});

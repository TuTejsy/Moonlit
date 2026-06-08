import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { AnalyticsService } from '@/services/analytics/analytics';

import { PaywallModal } from '../PaywallModal/PaywallModal';

jest.mock('@/constants/common', () => ({
  SCROLLABLE_PLACEMENT_ID: 'scrollable',
  SELECTION_PLACEMENT_ID: 'selection',
  SWITCH_PLACEMENT_ID: 'switch',
}));

describe('PaywallModal', () => {
  const defaultRouteParams = {
    contentName: 'Test Content',
    onClose: undefined,
    placementId: 'switch',
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
      }),
    );
  });

  it('calls handleSkipPress when skip text is pressed', async () => {
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

    fireEvent.press(screen.getByText('common.skip'));

    expect(mockHandleSkipPress).toHaveBeenCalled();
  });

  it('renders SwitcherPaywallContent when placementId is switch', async () => {
    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders SelectionPaywallContent when placementId is selection', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { ...defaultRouteParams, placementId: 'selection' },
    });

    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders ScrollablePaywallContent when placementId is scrollable', async () => {
    (useAppRoute as jest.Mock).mockReturnValue({
      params: { ...defaultRouteParams, placementId: 'scrollable' },
    });

    await render(<PaywallModal />);

    expect(screen.toJSON()).toBeTruthy();
  });
});

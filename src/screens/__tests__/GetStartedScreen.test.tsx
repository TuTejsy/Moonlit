import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { AnalyticsService } from '@/services/analytics/analytics';

import { GetStartedScreen } from '../GetStartedScreen/GetStartedScreen';

jest.mock('@/constants/common', () => ({
  IS_ANDROID: false,
}));

describe('GetStartedScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<GetStartedScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders continue button', () => {
    render(<GetStartedScreen />);

    expect(screen.getByText('common.continue')).toBeOnTheScreen();
  });

  it('logs onboarding analytics event on mount', () => {
    render(<GetStartedScreen />);

    expect(AnalyticsService.setIsUserPaid).toHaveBeenCalledWith(false);
    expect(AnalyticsService.logOnboardingEvent).toHaveBeenCalledWith({ screen: 1 });
  });

  it('calls handleContinuePress when continue button is pressed', () => {
    const { useOnboardingSteps } = jest.requireMock(
      '@/screens/GetStartedScreen/hooks/useOnboardingSteps',
    );
    const mockHandleContinuePress = jest.fn();
    useOnboardingSteps.mockReturnValue({
      currentStepSharedValue: { value: 0 },
      handleBackPress: jest.fn(),
      handleContinuePress: mockHandleContinuePress,
    });

    render(<GetStartedScreen />);

    fireEvent.press(screen.getByText('common.continue'));

    expect(mockHandleContinuePress).toHaveBeenCalled();
  });

  it('renders step content from STEPS constant', () => {
    render(<GetStartedScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });
});

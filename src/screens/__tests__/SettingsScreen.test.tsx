import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';

import { useAppSelector } from '@/hooks/useAppSelector';
import { AnalyticsService } from '@/services/analytics/analytics';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { SettingsScreen } from '../SettingsScreen/SettingsScreen';

jest.mock('@/constants/common', () => ({
  GOOGLE_PLAY_SUBSCRIPTIONS_LINK: 'https://play.google.com/store/subscriptions',
  IS_ANDROID: false,
  STORE_LINK: 'https://apps.apple.com/app/moonlit',
  SUPPORT_EMAIL: 'support@moonlit.com',
}));

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (selectIsFullVersion as jest.Mock).mockReturnValue(false);
    (useAppSelector as jest.Mock).mockImplementation((selector: (state: unknown) => unknown) =>
      selector({}),
    );
  });

  it('renders without crashing', () => {
    render(<SettingsScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('renders the settings title', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('settings.title')).toBeOnTheScreen();
  });

  it('renders contact us menu item', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('settings.contactUs')).toBeOnTheScreen();
  });

  it('renders terms of service menu item', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('settings.termsOfService')).toBeOnTheScreen();
  });

  it('renders privacy policy menu item', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('settings.privacyPolicy')).toBeOnTheScreen();
  });

  it('renders rate app menu item', () => {
    render(<SettingsScreen />);

    expect(screen.getByText('settings.rateApp')).toBeOnTheScreen();
  });

  it('shows PromotionBanner when user is not on full version', () => {
    (selectIsFullVersion as jest.Mock).mockReturnValue(false);

    render(<SettingsScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('hides PromotionBanner when user is on full version', () => {
    (selectIsFullVersion as jest.Mock).mockReturnValue(true);
    (useAppSelector as jest.Mock).mockReturnValue(true);

    render(<SettingsScreen />);

    expect(screen.toJSON()).toBeTruthy();
  });

  it('logs settings view analytics event on focus', () => {
    render(<SettingsScreen />);

    expect(AnalyticsService.logSettingsViewEvent).toHaveBeenCalled();
  });

  it('calls openTermsOfService when terms item is pressed', () => {
    const { useWebPagesNavigation } = jest.requireMock('@/hooks/navigation/useWebPagesNavigation');
    const mockOpenTerms = jest.fn();
    useWebPagesNavigation.mockReturnValue({
      openPrivacyPolicy: jest.fn(),
      openTermsOfService: mockOpenTerms,
    });

    render(<SettingsScreen />);

    fireEvent.press(screen.getByText('settings.termsOfService'));

    expect(mockOpenTerms).toHaveBeenCalled();
  });

  it('calls openPrivacyPolicy when privacy item is pressed', () => {
    const { useWebPagesNavigation } = jest.requireMock('@/hooks/navigation/useWebPagesNavigation');
    const mockOpenPrivacy = jest.fn();
    useWebPagesNavigation.mockReturnValue({
      openPrivacyPolicy: mockOpenPrivacy,
      openTermsOfService: jest.fn(),
    });

    render(<SettingsScreen />);

    fireEvent.press(screen.getByText('settings.privacyPolicy'));

    expect(mockOpenPrivacy).toHaveBeenCalled();
  });
});

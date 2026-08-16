import * as amplitude from '@amplitude/analytics-react-native';
import { getAnalytics, logEvent, setUserProperties } from '@react-native-firebase/analytics';

import { AnalyticsService } from '../analytics/analytics';
import { SOURCE, PAYWALL_TYPE } from '../analytics/analytics.constants';

jest.unmock('@/services/analytics/analytics');

jest.mock('@react-native-firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({})),
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
}));

jest.mock('@amplitude/analytics-react-native', () => ({
  Identify: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
  })),
  identify: jest.fn(),
  track: jest.fn(),
}));

jest.mock('../storage/storage', () => ({
  getStorageData: jest.fn().mockReturnValue({
    isAnaltyicsEnabled: true,
    isFirstLaunch: false,
  }),
}));

jest.mock('../remoteConfig/remoteConfig', () => ({
  remoteConfigService: {
    segment: 'test-segment',
  },
}));

describe('AnalyticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('warmUpNativeSdk', () => {
    it('loads the native analytics module', () => {
      AnalyticsService.warmUpNativeSdk();

      expect(getAnalytics).toHaveBeenCalledTimes(1);
    });
  });

  describe('setIsUserPaid', () => {
    it('sets user properties to "paid" when true', () => {
      AnalyticsService.setIsUserPaid(true);

      expect(setUserProperties).toHaveBeenCalledWith(expect.anything(), { paid: 'paid' });
      expect(amplitude.identify).toHaveBeenCalled();
    });

    it('sets user properties to "free" when false', () => {
      AnalyticsService.setIsUserPaid(false);

      expect(setUserProperties).toHaveBeenCalledWith(expect.anything(), { paid: 'free' });
    });
  });

  describe('logLaunchAppEvent', () => {
    it('logs launch_app event with source and first_launch', () => {
      AnalyticsService.logLaunchAppEvent({ source: SOURCE.COLD_START });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'launch_app',
        expect.objectContaining({
          first_launch: false,
          segment: 'test-segment',
          source: SOURCE.COLD_START,
        }),
      );
      expect(amplitude.track).toHaveBeenCalledWith(
        'launch_app',
        expect.objectContaining({
          source: SOURCE.COLD_START,
        }),
      );
    });
  });

  describe('logOnboardingEvent', () => {
    it('logs onboarding event with screen number', () => {
      AnalyticsService.logOnboardingEvent({ screen: 2 });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'onboarding',
        expect.objectContaining({ screen: 2, segment: 'test-segment' }),
      );
    });
  });

  describe('logPaywallViewedEvent', () => {
    it('logs ss_view event', () => {
      AnalyticsService.logPaywallViewedEvent({
        source: SOURCE.HOME_VIEW,
        type: PAYWALL_TYPE.WITH_SWITCHER,
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'ss_view',
        expect.objectContaining({
          source: SOURCE.HOME_VIEW,
          type: PAYWALL_TYPE.WITH_SWITCHER,
        }),
      );
    });
  });

  describe('logPaywallClosedEvent', () => {
    it('logs ss_close event', () => {
      AnalyticsService.logPaywallClosedEvent({
        source: SOURCE.SETTINGS,
        type: PAYWALL_TYPE.WITH_SWITCHER,
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'ss_close',
        expect.objectContaining({
          source: SOURCE.SETTINGS,
        }),
      );
    });
  });

  describe('logStartSubscriptionEvent', () => {
    it('logs start_subscription event', () => {
      AnalyticsService.logStartSubscriptionEvent({
        hasTrial: true,
        productId: 'weekly_premium',
        source: SOURCE.CONTENT,
        type: PAYWALL_TYPE.WITH_SWITCHER,
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'start_subscription',
        expect.objectContaining({
          hasTrial: true,
          productId: 'weekly_premium',
        }),
      );
    });
  });

  describe('logSettingsViewEvent', () => {
    it('logs page_view event with settings screen and increments count', () => {
      AnalyticsService.logSettingsViewEvent();

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'page_view',
        expect.objectContaining({
          count: expect.any(Number),
          screen: 'settings',
        }),
      );
    });
  });

  describe('logHomeViewEvent', () => {
    it('logs page_view event with home screen', () => {
      AnalyticsService.logHomeViewEvent();

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'page_view',
        expect.objectContaining({
          screen: 'home',
        }),
      );
    });
  });

  describe('logTaleOpenEvent', () => {
    it('logs tale_open event', () => {
      AnalyticsService.logTaleOpenEvent({ name: 'Cinderella', tab: 'All tales' });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'tale_open',
        expect.objectContaining({
          name: 'Cinderella',
          tab: 'All tales',
        }),
      );
    });
  });

  describe('logTalePlayEvent', () => {
    it('logs tale_play event', () => {
      AnalyticsService.logTalePlayEvent({ name: 'Cinderella', tab: 'All tales' });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'tale_play',
        expect.objectContaining({ name: 'Cinderella' }),
      );
    });
  });

  describe('logTalePauseEvent', () => {
    it('logs tale_pause event', () => {
      AnalyticsService.logTalePauseEvent({ name: 'Cinderella', tab: 'All tales' });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'tale_pause',
        expect.objectContaining({ name: 'Cinderella' }),
      );
    });
  });

  describe('logTaleRewindEvent', () => {
    it('logs tale_rewind event', () => {
      AnalyticsService.logTaleRewindEvent({
        name: 'Cinderella',
        tab: 'All tales',
        value: '30s',
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'tale_rewind',
        expect.objectContaining({ name: 'Cinderella', value: '30s' }),
      );
    });
  });

  describe('logTaleLikedEvent', () => {
    it('logs tale_liked event with count', () => {
      AnalyticsService.logTaleLikedEvent({
        name: 'Cinderella',
        source: SOURCE.TALE_PLAYER,
        tab: 'All tales',
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'tale_liked',
        expect.objectContaining({
          count: expect.any(Number),
          name: 'Cinderella',
        }),
      );
    });
  });

  describe('logVoiceViewEvent', () => {
    it('logs voice_view event with count', () => {
      AnalyticsService.logVoiceViewEvent({
        name: 'Standard',
        source: SOURCE.TALE_PLAYER,
        tab: 'All tales',
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'voice_view',
        expect.objectContaining({
          count: expect.any(Number),
          name: 'Standard',
        }),
      );
    });
  });

  describe('logVoiceChangeEvent', () => {
    it('logs voice_change event', () => {
      AnalyticsService.logVoiceChangeEvent({
        from: 'Standard',
        name: 'Advanced',
        source: SOURCE.TALE_PLAYER,
        tab: 'All tales',
        to: 'Advanced',
      });

      expect(logEvent).toHaveBeenCalledWith(
        expect.anything(),
        'voice_change',
        expect.objectContaining({
          from: 'Standard',
          to: 'Advanced',
        }),
      );
    });
  });
});

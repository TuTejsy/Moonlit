import { getAnalytics, logEvent, setUserProperties } from '@react-native-firebase/analytics';
import { Mixpanel } from 'mixpanel-react-native';

import { CATEGORY_KEYS } from '@/constants/stories';

import { AnalyticsService } from '../analytics/analytics';
import { MIXPANEL_SERVER_URL, PAYWALL_TYPE, SOURCE } from '../analytics/analytics.constants';
import { getStorageData } from '../storage/storage';

jest.unmock('@/services/analytics/analytics');

jest.mock('@react-native-firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({})),
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
}));

jest.mock('@/constants/auth', () => ({
  MIXPANEL_TOKEN: 'test-mixpanel-token',
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

type MixpanelMockInstance = {
  getDistinctId: jest.Mock;
  init: jest.Mock;
  registerSuperProperties: jest.Mock;
  track: jest.Mock;
};

function latestMixpanelInstance(): MixpanelMockInstance {
  const mixpanelMock = Mixpanel as unknown as jest.Mock;
  const result = mixpanelMock.mock.results.at(-1);

  if (!result || result.type !== 'return') {
    throw new Error('Mixpanel was not constructed');
  }

  return result.value as MixpanelMockInstance;
}

async function flushMixpanelQueue(): Promise<void> {
  await Promise.resolve();
}

describe('AnalyticsService', () => {
  const originalDev = (globalThis as { __DEV__?: boolean }).__DEV__;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    (globalThis as { __DEV__?: boolean }).__DEV__ = originalDev;
  });

  describe('init', () => {
    it('does not create a Mixpanel instance in dev', async () => {
      (globalThis as { __DEV__?: boolean }).__DEV__ = true;

      AnalyticsService.init();

      await expect(AnalyticsService.getMixpanelDistinctId()).resolves.toBeNull();
      expect(Mixpanel).not.toHaveBeenCalled();
    });
  });

  describe('release tracking', () => {
    beforeEach(async () => {
      (globalThis as { __DEV__?: boolean }).__DEV__ = false;
      (getStorageData as jest.Mock).mockReturnValue({
        isAnaltyicsEnabled: true,
        isFirstLaunch: false,
      });

      AnalyticsService.init();
      await AnalyticsService.getMixpanelDistinctId();
    });

    it('initializes native Mixpanel against the US server', () => {
      expect(Mixpanel).toHaveBeenCalledWith('test-mixpanel-token', true, true);
      expect(latestMixpanelInstance().init).toHaveBeenCalledWith(false, {}, MIXPANEL_SERVER_URL);
    });

    it('does not track when analytics is disabled', async () => {
      (getStorageData as jest.Mock).mockReturnValue({
        isAnaltyicsEnabled: false,
        isFirstLaunch: false,
      });

      AnalyticsService.logLaunchAppEvent({ source: SOURCE.COLD_START });
      await flushMixpanelQueue();

      expect(logEvent).not.toHaveBeenCalled();
      expect(latestMixpanelInstance().track).not.toHaveBeenCalled();
    });

    describe('warmUpNativeSdk', () => {
      it('loads the native analytics module', () => {
        AnalyticsService.warmUpNativeSdk();

        expect(getAnalytics).toHaveBeenCalledTimes(1);
      });
    });

    describe('setIsUserPaid', () => {
      it('sets user properties to "paid" when true', async () => {
        AnalyticsService.setIsUserPaid(true);
        await flushMixpanelQueue();

        expect(setUserProperties).toHaveBeenCalledWith(expect.anything(), { paid: 'paid' });
        expect(latestMixpanelInstance().registerSuperProperties).toHaveBeenCalledWith({
          subscription_status: 'paid',
        });
      });

      it('sets user properties to "free" when false', async () => {
        AnalyticsService.setIsUserPaid(false);
        await flushMixpanelQueue();

        expect(setUserProperties).toHaveBeenCalledWith(expect.anything(), { paid: 'free' });
        expect(latestMixpanelInstance().registerSuperProperties).toHaveBeenCalledWith({
          subscription_status: 'free',
        });
      });
    });

    describe('logLaunchAppEvent', () => {
      it('logs launch_app event with source and first_launch', async () => {
        AnalyticsService.logLaunchAppEvent({ source: SOURCE.COLD_START });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'launch_app',
          expect.objectContaining({
            first_launch: false,
            segment: 'test-segment',
            source: SOURCE.COLD_START,
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('app_launched', {
          is_first_launch: false,
          launch_source: SOURCE.COLD_START,
          segment: 'test-segment',
        });
      });
    });

    describe('logOnboardingEvent', () => {
      it('logs onboarding event with screen number', async () => {
        AnalyticsService.logOnboardingEvent({ screen: 2 });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'onboarding',
          expect.objectContaining({ screen: 2, segment: 'test-segment' }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('onboarding_screen_viewed', {
          screen_number: 2,
          segment: 'test-segment',
        });
      });
    });

    describe('logPaywallViewedEvent', () => {
      it('logs ss_view event and omits empty Mixpanel props', async () => {
        AnalyticsService.logPaywallViewedEvent({
          source: SOURCE.HOME_VIEW,
          type: PAYWALL_TYPE.WITH_SWITCHER,
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'ss_view',
          expect.objectContaining({
            source: SOURCE.HOME_VIEW,
            type: PAYWALL_TYPE.WITH_SWITCHER,
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('paywall_viewed', {
          paywall_type: PAYWALL_TYPE.WITH_SWITCHER,
          segment: 'test-segment',
          source: SOURCE.HOME_VIEW,
        });
      });
    });

    describe('logPaywallClosedEvent', () => {
      it('logs ss_close event', async () => {
        AnalyticsService.logPaywallClosedEvent({
          contentName: 'Cinderella',
          source: SOURCE.SETTINGS,
          tab: 'Featuring tales',
          type: PAYWALL_TYPE.WITH_SWITCHER,
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'ss_close',
          expect.objectContaining({
            contentName: 'Cinderella',
            source: SOURCE.SETTINGS,
            tab: 'Featuring tales',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('paywall_closed', {
          content_name: 'Cinderella',
          paywall_type: PAYWALL_TYPE.WITH_SWITCHER,
          segment: 'test-segment',
          source: SOURCE.SETTINGS,
          tab: 'featuring_tales',
        });
      });
    });

    describe('logStartSubscriptionEvent', () => {
      it('logs start_subscription event', async () => {
        AnalyticsService.logStartSubscriptionEvent({
          hasTrial: true,
          productId: 'weekly_premium',
          source: SOURCE.CONTENT,
          type: PAYWALL_TYPE.WITH_SWITCHER,
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'start_subscription',
          expect.objectContaining({
            hasTrial: true,
            productId: 'weekly_premium',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('subscription_started', {
          has_trial: true,
          paywall_type: PAYWALL_TYPE.WITH_SWITCHER,
          product_id: 'weekly_premium',
          segment: 'test-segment',
          source: SOURCE.CONTENT,
        });
      });
    });

    describe('logSettingsViewEvent', () => {
      it('logs page_view event with settings screen and increments count', async () => {
        AnalyticsService.logSettingsViewEvent();
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'page_view',
          expect.objectContaining({
            count: expect.any(Number),
            screen: 'settings',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'screen_viewed',
          expect.objectContaining({
            screen_name: 'settings',
            session_occurrence: expect.any(Number),
          }),
        );
      });
    });

    describe('logSavedViewEvent', () => {
      it('logs page_view event with saved screen', async () => {
        AnalyticsService.logSavedViewEvent();
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'page_view',
          expect.objectContaining({
            screen: 'saved',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'screen_viewed',
          expect.objectContaining({
            screen_name: 'saved',
          }),
        );
      });
    });

    describe('logHomeViewEvent', () => {
      it('logs page_view event with home screen', async () => {
        AnalyticsService.logHomeViewEvent();
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'page_view',
          expect.objectContaining({
            screen: 'home',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'screen_viewed',
          expect.objectContaining({
            screen_name: 'home',
          }),
        );
      });
    });

    describe('logTaleOpenEvent', () => {
      it('logs tale_open event', async () => {
        AnalyticsService.logTaleOpenEvent({ name: 'Cinderella', tab: 'All tales' });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'tale_open',
          expect.objectContaining({
            name: 'Cinderella',
            tab: 'All tales',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('tale_opened', {
          segment: 'test-segment',
          tab: 'all_tales',
          tale_name: 'Cinderella',
        });
      });
    });

    describe('logTalePlayEvent', () => {
      it('logs tale_play event', async () => {
        AnalyticsService.logTalePlayEvent({ name: 'Cinderella', tab: CATEGORY_KEYS.ANIMAL_TALES });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'tale_play',
          expect.objectContaining({ name: 'Cinderella', tab: CATEGORY_KEYS.ANIMAL_TALES }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_played',
          expect.objectContaining({
            tab: 'animal_tales',
            tale_name: 'Cinderella',
          }),
        );
      });
    });

    describe('logTalePauseEvent', () => {
      it('logs tale_pause event', async () => {
        AnalyticsService.logTalePauseEvent({ name: 'Cinderella', tab: 'All tales' });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'tale_pause',
          expect.objectContaining({ name: 'Cinderella' }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_paused',
          expect.objectContaining({ tale_name: 'Cinderella' }),
        );
      });
    });

    describe('logTaleRewindEvent', () => {
      it('logs tale_rewind event', async () => {
        AnalyticsService.logTaleRewindEvent({
          name: 'Cinderella',
          tab: 'All tales',
          value: '30s',
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'tale_rewind',
          expect.objectContaining({ name: 'Cinderella', value: '30s' }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_rewound',
          expect.objectContaining({ rewind_value: '30s', tale_name: 'Cinderella' }),
        );
      });
    });

    describe('logTaleLikedEvent', () => {
      it('logs tale_liked event with count', async () => {
        AnalyticsService.logTaleLikedEvent({
          name: 'Cinderella',
          source: SOURCE.TALE_PLAYER,
          tab: 'All tales',
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'tale_liked',
          expect.objectContaining({
            count: expect.any(Number),
            name: 'Cinderella',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_liked',
          expect.objectContaining({
            session_occurrence: expect.any(Number),
            source: SOURCE.TALE_PLAYER,
            tale_name: 'Cinderella',
          }),
        );
      });
    });

    describe('logVoiceViewEvent', () => {
      it('logs voice_view event with count', async () => {
        AnalyticsService.logVoiceViewEvent({
          name: 'Standard',
          source: SOURCE.TALE_PLAYER,
          tab: 'All tales',
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'voice_view',
          expect.objectContaining({
            count: expect.any(Number),
            name: 'Standard',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'voice_viewed',
          expect.objectContaining({
            session_occurrence: expect.any(Number),
            voice_name: 'Standard',
          }),
        );
      });
    });

    describe('logVoiceChangeEvent', () => {
      it('logs voice_change event', async () => {
        AnalyticsService.logVoiceChangeEvent({
          from: 'Standard',
          name: 'Advanced',
          source: SOURCE.TALE_PLAYER,
          tab: 'All tales',
          to: 'Advanced',
        });
        await flushMixpanelQueue();

        expect(logEvent).toHaveBeenCalledWith(
          expect.anything(),
          'voice_change',
          expect.objectContaining({
            from: 'Standard',
            to: 'Advanced',
          }),
        );
        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'voice_changed',
          expect.objectContaining({
            from_voice: 'Standard',
            to_voice: 'Advanced',
            voice_name: 'Advanced',
          }),
        );
      });
    });
  });
});

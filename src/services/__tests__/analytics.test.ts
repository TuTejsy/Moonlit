import { Mixpanel } from 'mixpanel-react-native';

import { CATEGORY_KEYS } from '@/constants/stories';
import { store } from '@/store/store';

import { AnalyticsService, resolveAnalyticsSegment } from '../analytics/analytics';
import { MIXPANEL_SERVER_URL, PAYWALL_TYPE, SOURCE } from '../analytics/analytics.constants';
import { getStorageData } from '../storage/storage';

jest.unmock('@/services/analytics/analytics');

jest.mock('@/constants/auth', () => ({
  MIXPANEL_TOKEN: 'test-mixpanel-token',
}));

jest.mock('@/store/store', () => ({
  store: {
    getState: jest.fn(() => ({
      subscription: {
        paywallRemoteConfig: { segment: 'test-segment' },
      },
    })),
  },
}));

jest.mock('@/store/subscription/subscription.selector', () => ({
  selectPaywallRemoteConfig: (state: {
    subscription: { paywallRemoteConfig: Record<string, unknown> | null };
  }) => state.subscription.paywallRemoteConfig,
}));

jest.mock('../storage/storage', () => ({
  getStorageData: jest.fn().mockReturnValue({
    isAnaltyicsEnabled: true,
    isFirstLaunch: false,
  }),
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

function mockPaywallRemoteConfig(paywallRemoteConfig: Record<string, unknown> | null): void {
  (store.getState as jest.Mock).mockReturnValue({
    subscription: {
      paywallRemoteConfig,
    },
  });
}

describe('resolveAnalyticsSegment', () => {
  it('returns a trimmed segment', () => {
    expect(resolveAnalyticsSegment({ segment: '  cohort-a  ' })).toBe('cohort-a');
  });

  it('falls back when the segment is missing or blank', () => {
    expect(resolveAnalyticsSegment(null)).toBe('no segment');
    expect(resolveAnalyticsSegment({ segment: '   ' })).toBe('no segment');
    expect(resolveAnalyticsSegment({ segment: 1 })).toBe('no segment');
  });
});

describe('AnalyticsService', () => {
  const originalDev = (globalThis as { __DEV__?: boolean }).__DEV__;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPaywallRemoteConfig({ segment: 'test-segment' });
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

      expect(latestMixpanelInstance().track).not.toHaveBeenCalled();
    });

    describe('setIsUserPaid', () => {
      it('registers subscription_status as paid', async () => {
        AnalyticsService.setIsUserPaid(true);
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().registerSuperProperties).toHaveBeenCalledWith({
          subscription_status: 'paid',
        });
      });

      it('registers subscription_status as free', async () => {
        AnalyticsService.setIsUserPaid(false);
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().registerSuperProperties).toHaveBeenCalledWith({
          subscription_status: 'free',
        });
      });
    });

    describe('logLaunchAppEvent', () => {
      it('tracks app_launched with the Adapty segment', async () => {
        AnalyticsService.logLaunchAppEvent({ source: SOURCE.COLD_START });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('app_launched', {
          is_first_launch: false,
          launch_source: SOURCE.COLD_START,
          segment: 'test-segment',
        });
      });

      it('uses the fallback segment before paywall remote config is loaded', async () => {
        mockPaywallRemoteConfig(null);

        AnalyticsService.logLaunchAppEvent({ source: SOURCE.COLD_START });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('app_launched', {
          is_first_launch: false,
          launch_source: SOURCE.COLD_START,
          segment: 'no segment',
        });
      });
    });

    describe('logOnboardingEvent', () => {
      it('tracks onboarding_screen_viewed with the screen number', async () => {
        AnalyticsService.logOnboardingEvent({ screen: 2 });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('onboarding_screen_viewed', {
          screen_number: 2,
          segment: 'test-segment',
        });
      });
    });

    describe('logPaywallViewedEvent', () => {
      it('tracks paywall_viewed and omits empty props', async () => {
        AnalyticsService.logPaywallViewedEvent({
          source: SOURCE.HOME_VIEW,
          type: PAYWALL_TYPE.WITH_SWITCHER,
        });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('paywall_viewed', {
          paywall_type: PAYWALL_TYPE.WITH_SWITCHER,
          segment: 'test-segment',
          source: SOURCE.HOME_VIEW,
        });
      });
    });

    describe('logPaywallClosedEvent', () => {
      it('tracks paywall_closed', async () => {
        AnalyticsService.logPaywallClosedEvent({
          contentName: 'Cinderella',
          source: SOURCE.SETTINGS,
          tab: 'Featuring tales',
          type: PAYWALL_TYPE.WITH_SWITCHER,
        });
        await flushMixpanelQueue();

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
      it('tracks subscription_started', async () => {
        AnalyticsService.logStartSubscriptionEvent({
          hasTrial: true,
          productId: 'weekly_premium',
          source: SOURCE.CONTENT,
          type: PAYWALL_TYPE.WITH_SWITCHER,
        });
        await flushMixpanelQueue();

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
      it('tracks screen_viewed for settings', async () => {
        AnalyticsService.logSettingsViewEvent();
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'screen_viewed',
          expect.objectContaining({
            screen_name: 'settings',
            segment: 'test-segment',
            session_occurrence: expect.any(Number),
          }),
        );
      });
    });

    describe('logSavedViewEvent', () => {
      it('tracks screen_viewed for saved', async () => {
        AnalyticsService.logSavedViewEvent();
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'screen_viewed',
          expect.objectContaining({
            screen_name: 'saved',
            segment: 'test-segment',
          }),
        );
      });
    });

    describe('logHomeViewEvent', () => {
      it('tracks screen_viewed for home', async () => {
        AnalyticsService.logHomeViewEvent();
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'screen_viewed',
          expect.objectContaining({
            screen_name: 'home',
            segment: 'test-segment',
          }),
        );
      });
    });

    describe('logTaleOpenEvent', () => {
      it('tracks tale_opened', async () => {
        AnalyticsService.logTaleOpenEvent({ name: 'Cinderella', tab: 'All tales' });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith('tale_opened', {
          segment: 'test-segment',
          tab: 'all_tales',
          tale_name: 'Cinderella',
        });
      });
    });

    describe('logTalePlayEvent', () => {
      it('tracks tale_played', async () => {
        AnalyticsService.logTalePlayEvent({ name: 'Cinderella', tab: CATEGORY_KEYS.ANIMAL_TALES });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_played',
          expect.objectContaining({
            segment: 'test-segment',
            tab: 'animal_tales',
            tale_name: 'Cinderella',
          }),
        );
      });
    });

    describe('logTalePauseEvent', () => {
      it('tracks tale_paused', async () => {
        AnalyticsService.logTalePauseEvent({ name: 'Cinderella', tab: 'All tales' });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_paused',
          expect.objectContaining({ segment: 'test-segment', tale_name: 'Cinderella' }),
        );
      });
    });

    describe('logTaleRewindEvent', () => {
      it('tracks tale_rewound', async () => {
        AnalyticsService.logTaleRewindEvent({
          name: 'Cinderella',
          tab: 'All tales',
          value: '30s',
        });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_rewound',
          expect.objectContaining({
            rewind_value: '30s',
            segment: 'test-segment',
            tale_name: 'Cinderella',
          }),
        );
      });
    });

    describe('logTaleLikedEvent', () => {
      it('tracks tale_liked with a session occurrence', async () => {
        AnalyticsService.logTaleLikedEvent({
          name: 'Cinderella',
          source: SOURCE.TALE_PLAYER,
          tab: 'All tales',
        });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'tale_liked',
          expect.objectContaining({
            segment: 'test-segment',
            session_occurrence: expect.any(Number),
            source: SOURCE.TALE_PLAYER,
            tale_name: 'Cinderella',
          }),
        );
      });
    });

    describe('logVoiceViewEvent', () => {
      it('tracks voice_viewed', async () => {
        AnalyticsService.logVoiceViewEvent({
          name: 'Standard',
          source: SOURCE.TALE_PLAYER,
          tab: 'All tales',
        });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'voice_viewed',
          expect.objectContaining({
            segment: 'test-segment',
            session_occurrence: expect.any(Number),
            voice_name: 'Standard',
          }),
        );
      });
    });

    describe('logVoiceChangeEvent', () => {
      it('tracks voice_changed', async () => {
        AnalyticsService.logVoiceChangeEvent({
          from: 'Standard',
          name: 'Advanced',
          source: SOURCE.TALE_PLAYER,
          tab: 'All tales',
          to: 'Advanced',
        });
        await flushMixpanelQueue();

        expect(latestMixpanelInstance().track).toHaveBeenCalledWith(
          'voice_changed',
          expect.objectContaining({
            from_voice: 'Standard',
            segment: 'test-segment',
            to_voice: 'Advanced',
            voice_name: 'Advanced',
          }),
        );
      });
    });
  });
});

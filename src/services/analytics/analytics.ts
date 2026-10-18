import { Mixpanel } from 'mixpanel-react-native';

import { MIXPANEL_TOKEN } from '@/constants/auth';
import { store } from '@/store/store';
import { selectPaywallRemoteConfig } from '@/store/subscription/subscription.selector';

import { getStorageData } from '../storage/storage';

import { MIXPANEL_EVENT, MIXPANEL_SERVER_URL } from './analytics.constants';
import {
  LaunchAppEventParams,
  OnboardingEventParams,
  PaywallClosedEventParams,
  PaywallViewedEventParams,
  StartSubscriptionEventParams,
  TaleLikedEventParams,
  TaleOpenEventParams,
  TalePauseEventParams,
  TalePlayEventParams,
  TaleRewindEventParams,
  toMixpanelTab,
  VoiceChangeEventParams,
  VoiceViewEventParams,
} from './analytics.types';

const DEFAULT_ANALYTICS_SEGMENT = 'no segment';

type AnalyticsParamValue = boolean | number | string;

type AnalyticsParams = Record<string, AnalyticsParamValue | undefined>;

interface MixpanelEventPayload {
  name: string;
  params: AnalyticsParams;
}

export function resolveAnalyticsSegment(remoteConfig: Record<string, unknown> | null): string {
  const value = remoteConfig?.segment;

  if (typeof value !== 'string') {
    return DEFAULT_ANALYTICS_SEGMENT;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : DEFAULT_ANALYTICS_SEGMENT;
}

function omitUndefinedParams(params: AnalyticsParams): Record<string, AnalyticsParamValue> {
  const definedParams: Record<string, AnalyticsParamValue> = {};

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value !== undefined) {
      definedParams[key] = value;
    }
  });

  return definedParams;
}

export class AnalyticsService {
  private static settingsViewLogCount = 0;

  private static savedViewLogCount = 0;

  private static homeViewLogCount = 0;

  private static taleLikedLogCount = 0;

  private static voiceViewLogCount = 0;

  private static mixpanelReady: Promise<Mixpanel | null> = Promise.resolve(null);

  static init(): void {
    if (__DEV__) {
      AnalyticsService.mixpanelReady = Promise.resolve(null);
      return;
    }

    const mixpanel = new Mixpanel(MIXPANEL_TOKEN, true, true);

    AnalyticsService.mixpanelReady = mixpanel
      .init(false, {}, MIXPANEL_SERVER_URL)
      .then(() => mixpanel)
      .catch(() => null);
  }

  static async getMixpanelDistinctId(): Promise<string | null> {
    const mixpanel = await AnalyticsService.mixpanelReady;

    if (!mixpanel) {
      return null;
    }

    return mixpanel.getDistinctId();
  }

  private static logEvent(mixpanelEvent: MixpanelEventPayload) {
    if (!getStorageData().isAnaltyicsEnabled) {
      return;
    }

    const segment = resolveAnalyticsSegment(selectPaywallRemoteConfig(store.getState()));

    const mixpanelParams = omitUndefinedParams({
      ...mixpanelEvent.params,
      segment,
    });

    AnalyticsService.mixpanelReady
      .then((mixpanel) => {
        mixpanel?.track(mixpanelEvent.name, mixpanelParams);
      })
      .catch(() => undefined);
  }

  static setIsUserPaid(paid: boolean) {
    const status = paid ? 'paid' : 'free';

    AnalyticsService.mixpanelReady
      .then((mixpanel) => {
        mixpanel?.registerSuperProperties({ subscription_status: status });
      })
      .catch(() => undefined);
  }

  static logLaunchAppEvent(params: LaunchAppEventParams) {
    const { isFirstLaunch } = getStorageData();

    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.APP_LAUNCHED,
      params: {
        is_first_launch: isFirstLaunch,
        launch_source: params.source,
      },
    });
  }

  static logOnboardingEvent(params: OnboardingEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.ONBOARDING_SCREEN_VIEWED,
      params: {
        screen_number: params.screen,
      },
    });
  }

  static logPaywallViewedEvent(params: PaywallViewedEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.PAYWALL_VIEWED,
      params: AnalyticsService.mixpanelPaywallParams(params),
    });
  }

  static logPaywallClosedEvent(params: PaywallClosedEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.PAYWALL_CLOSED,
      params: AnalyticsService.mixpanelPaywallParams(params),
    });
  }

  static logStartSubscriptionEvent(params: StartSubscriptionEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.SUBSCRIPTION_STARTED,
      params: {
        content_name: params.contentName,
        has_trial: params.hasTrial,
        paywall_type: params.type,
        product_id: params.productId,
        source: params.source,
        tab: AnalyticsService.mixpanelTab(params.tab),
      },
    });
  }

  static logSettingsViewEvent() {
    AnalyticsService.settingsViewLogCount += 1;

    AnalyticsService.logScreenView('settings', AnalyticsService.settingsViewLogCount);
  }

  static logSavedViewEvent() {
    AnalyticsService.savedViewLogCount += 1;

    AnalyticsService.logScreenView('saved', AnalyticsService.savedViewLogCount);
  }

  static logHomeViewEvent() {
    AnalyticsService.homeViewLogCount += 1;

    AnalyticsService.logScreenView('home', AnalyticsService.homeViewLogCount);
  }

  static logTaleOpenEvent(params: TaleOpenEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.TALE_OPENED,
      params: AnalyticsService.mixpanelTaleParams(params),
    });
  }

  static logTalePlayEvent(params: TalePlayEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.TALE_PLAYED,
      params: AnalyticsService.mixpanelTaleParams(params),
    });
  }

  static logTalePauseEvent(params: TalePauseEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.TALE_PAUSED,
      params: AnalyticsService.mixpanelTaleParams(params),
    });
  }

  static logTaleRewindEvent(params: TaleRewindEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.TALE_REWOUND,
      params: {
        ...AnalyticsService.mixpanelTaleParams(params),
        rewind_value: params.value,
      },
    });
  }

  static logTaleLikedEvent(params: TaleLikedEventParams) {
    AnalyticsService.taleLikedLogCount += 1;

    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.TALE_LIKED,
      params: {
        ...AnalyticsService.mixpanelTaleParams(params),
        session_occurrence: AnalyticsService.taleLikedLogCount,
        source: params.source,
      },
    });
  }

  static logVoiceViewEvent(params: VoiceViewEventParams) {
    AnalyticsService.voiceViewLogCount += 1;

    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.VOICE_VIEWED,
      params: {
        session_occurrence: AnalyticsService.voiceViewLogCount,
        source: params.source,
        tab: toMixpanelTab(params.tab),
        voice_name: params.name,
      },
    });
  }

  static logVoiceChangeEvent(params: VoiceChangeEventParams) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.VOICE_CHANGED,
      params: {
        from_voice: params.from,
        source: params.source,
        tab: toMixpanelTab(params.tab),
        to_voice: params.to,
        voice_name: params.name,
      },
    });
  }

  private static logScreenView(screen: 'home' | 'saved' | 'settings', sessionOccurrence: number) {
    AnalyticsService.logEvent({
      name: MIXPANEL_EVENT.SCREEN_VIEWED,
      params: {
        screen_name: screen,
        session_occurrence: sessionOccurrence,
      },
    });
  }

  private static mixpanelPaywallParams(
    params: PaywallClosedEventParams | PaywallViewedEventParams,
  ): AnalyticsParams {
    return {
      content_name: params.contentName,
      paywall_type: params.type,
      source: params.source,
      tab: AnalyticsService.mixpanelTab(params.tab),
    };
  }

  private static mixpanelTaleParams(params: {
    name: string;
    tab: TaleOpenEventParams['tab'];
  }): AnalyticsParams {
    return {
      tab: toMixpanelTab(params.tab),
      tale_name: params.name,
    };
  }

  private static mixpanelTab(tab: PaywallViewedEventParams['tab']): string | undefined {
    if (tab === undefined) {
      return undefined;
    }

    return toMixpanelTab(tab);
  }
}

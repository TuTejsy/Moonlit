import * as amplitude from '@amplitude/analytics-react-native';
import firebaseAnalytics from '@react-native-firebase/analytics';

import { remoteConfigService } from '../remoteConfig/remoteConfig';
import { getStorageData } from '../storage/storage';

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
  VoiceChangeEventParams,
  VoiceViewEventParams,
} from './analytics.types';

export class AnalyticsService {
  private static settingsViewLogCount = 0;

  private static savedViewLogCount = 0;

  private static homeViewLogCount = 0;

  private static taleLikedLogCount = 0;

  private static voiceViewLogCount = 0;

  private static logCommongEvent(eventName: string, params: object) {
    const injectedParams = { ...params, segment: remoteConfigService.segment };

    firebaseAnalytics().logEvent(eventName, injectedParams);
    amplitude.track(eventName, injectedParams);
  }

  static setIsUserPaid(paid: boolean) {
    firebaseAnalytics().setUserProperties({ paid: paid ? 'paid' : 'free' });

    const indentity = new amplitude.Identify();
    indentity.set('paid', paid ? 'paid' : 'free');

    amplitude.identify(indentity);
  }

  static logLaunchAppEvent(params: LaunchAppEventParams) {
    const eventName = 'launch_app';
    const eventParams = {
      ...params,
      first_launch: getStorageData().isFirstLaunch,
    };

    AnalyticsService.logCommongEvent(eventName, eventParams);
  }

  static logOnboardingEvent(params: OnboardingEventParams) {
    const eventName = 'onboarding';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logPaywallViewedEvent(params: PaywallViewedEventParams) {
    const eventName = 'ss_view';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logPaywallClosedEvent(params: PaywallClosedEventParams) {
    const eventName = 'ss_close';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logStartSubscriptionEvent(params: StartSubscriptionEventParams) {
    const eventName = 'start_subscription';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logSettingsViewEvent() {
    AnalyticsService.settingsViewLogCount += 1;

    const eventName = 'page_view';
    const eventParams = {
      count: AnalyticsService.settingsViewLogCount,
      screen: 'settings',
    };

    AnalyticsService.logCommongEvent(eventName, eventParams);
  }

  static logSavedViewEvent() {
    AnalyticsService.savedViewLogCount += 1;

    const eventName = 'page_view';
    const eventParams = {
      count: AnalyticsService.savedViewLogCount,
      screen: 'saved',
    };

    AnalyticsService.logCommongEvent(eventName, eventParams);
  }

  static logHomeViewEvent() {
    AnalyticsService.homeViewLogCount += 1;

    const eventName = 'page_view';
    const eventParams = {
      count: AnalyticsService.homeViewLogCount,
      screen: 'home',
    };

    AnalyticsService.logCommongEvent(eventName, eventParams);
  }

  static logTaleOpenEvent(params: TaleOpenEventParams) {
    const eventName = 'tale_open';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logTalePlayEvent(params: TalePlayEventParams) {
    const eventName = 'tale_play';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logTalePauseEvent(params: TalePauseEventParams) {
    const eventName = 'tale_pause';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logTaleRewindEvent(params: TaleRewindEventParams) {
    const eventName = 'tale_rewind';

    AnalyticsService.logCommongEvent(eventName, params);
  }

  static logTaleLikedEvent(params: TaleLikedEventParams) {
    AnalyticsService.taleLikedLogCount += 1;

    const eventName = 'tale_liked';
    const eventParams = {
      ...params,
      count: AnalyticsService.taleLikedLogCount,
    };

    AnalyticsService.logCommongEvent(eventName, eventParams);
  }

  static logVoiceViewEvent(params: VoiceViewEventParams) {
    AnalyticsService.voiceViewLogCount += 1;

    const eventName = 'voice_view';
    const eventParams = {
      ...params,
      count: AnalyticsService.voiceViewLogCount,
    };

    AnalyticsService.logCommongEvent(eventName, eventParams);
  }

  static logVoiceChangeEvent(params: VoiceChangeEventParams) {
    const eventName = 'voice_change';

    AnalyticsService.logCommongEvent(eventName, params);
  }
}

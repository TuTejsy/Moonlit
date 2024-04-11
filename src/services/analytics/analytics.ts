import * as amplitude from '@amplitude/analytics-react-native';
import firebaseAnalytics from '@react-native-firebase/analytics';

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
} from './analytics.types';

export class AnalyticsService {
  private static settingsViewLogCount = 0;

  private static savedViewLogCount = 0;

  private static homeViewLogCount = 0;

  private static taleLikedLogCount = 0;

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

    firebaseAnalytics().logEvent(eventName, eventParams);
    amplitude.track(eventName, eventParams);
  }

  static logOnboardingEvent(params: OnboardingEventParams) {
    const eventName = 'onboarding';

    firebaseAnalytics().logEvent(eventName, params);
    amplitude.track(eventName, params);
  }

  static logPaywallViewedEvent(params: PaywallViewedEventParams) {
    const eventName = 'ss_view';

    firebaseAnalytics().logEvent('ss_view', params);
    amplitude.track(eventName, params);
  }

  static logPaywallClosedEvent(params: PaywallClosedEventParams) {
    const eventName = 'ss_close';

    firebaseAnalytics().logEvent('ss_close', params);
    amplitude.track(eventName, params);
  }

  static logStartSubscriptionEvent(params: StartSubscriptionEventParams) {
    const eventName = 'start_subscription';

    firebaseAnalytics().logEvent(eventName, params);
    amplitude.track(eventName, params);
  }

  static logSettingsViewEvent() {
    AnalyticsService.settingsViewLogCount += 1;

    const eventName = 'page_view';
    const eventParams = {
      count: AnalyticsService.settingsViewLogCount,
      screen: 'settings',
    };

    firebaseAnalytics().logEvent(eventName, eventParams);
    amplitude.track(eventName, eventParams);
  }

  static logSavedViewEvent() {
    AnalyticsService.savedViewLogCount += 1;

    const eventName = 'page_view';
    const eventParams = {
      count: AnalyticsService.savedViewLogCount,
      screen: 'saved',
    };

    firebaseAnalytics().logEvent(eventName, eventParams);
    amplitude.track(eventName, eventParams);
  }

  static logHomeViewEvent() {
    AnalyticsService.homeViewLogCount += 1;

    const eventName = 'page_view';
    const eventParams = {
      count: AnalyticsService.savedViewLogCount,
      screen: 'home',
    };

    firebaseAnalytics().logEvent(eventName, eventParams);
    amplitude.track(eventName, eventParams);
  }

  static logTaleOpenEvent(params: TaleOpenEventParams) {
    const eventName = 'tale_open';

    firebaseAnalytics().logEvent(eventName, params);
    amplitude.track(eventName, params);
  }

  static logTalePlayEvent(params: TalePlayEventParams) {
    const eventName = 'tale_play';

    firebaseAnalytics().logEvent(eventName, params);
    amplitude.track(eventName, params);
  }

  static logTalePauseEvent(params: TalePauseEventParams) {
    const eventName = 'tale_pause';

    firebaseAnalytics().logEvent(eventName, params);
    amplitude.track(eventName, params);
  }

  static logTaleRewindEvent(params: TaleRewindEventParams) {
    const eventName = 'tale_rewind';

    firebaseAnalytics().logEvent(eventName, params);
    amplitude.track(eventName, params);
  }

  static logTaleLikedEvent(params: TaleLikedEventParams) {
    AnalyticsService.taleLikedLogCount += 1;

    const eventName = 'tale_liked';
    const evnetParams = {
      ...params,
      count: AnalyticsService.taleLikedLogCount,
    };

    firebaseAnalytics().logEvent(eventName, evnetParams);
    amplitude.track(eventName, evnetParams);
  }
}

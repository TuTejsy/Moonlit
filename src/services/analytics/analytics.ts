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

  private static homeViewLogCount = 0;

  private static taleLikedLogCount = 0;

  static setIsUserPaid(paid: boolean) {
    firebaseAnalytics().setUserProperty('paid', paid ? 'paid' : 'free');
  }

  static logLaunchAppEvent(params: LaunchAppEventParams) {
    firebaseAnalytics().logEvent('launch_app', {
      ...params,
      first_launch: getStorageData().isFirstLaunch,
    });
  }

  static logOnboardingEvent(params: OnboardingEventParams) {
    firebaseAnalytics().logEvent('onboarding', {
      ...params,
    });
  }

  static logPaywallViewedEvent(params: PaywallViewedEventParams) {
    firebaseAnalytics().logEvent('ss_view', {
      ...params,
    });
  }

  static logPaywallClosedEvent(params: PaywallClosedEventParams) {
    firebaseAnalytics().logEvent('ss_close', {
      ...params,
    });
  }

  static logStartSubscriptionEvent(params: StartSubscriptionEventParams) {
    firebaseAnalytics().logEvent('start_subscription', {
      ...params,
    });
  }

  static logSettingsViewEvent() {
    AnalyticsService.settingsViewLogCount += 1;

    firebaseAnalytics().logEvent('settings_view', {
      count: AnalyticsService.settingsViewLogCount,
    });
  }

  static logHomeViewEvent() {
    AnalyticsService.homeViewLogCount += 1;

    firebaseAnalytics().logEvent('home_view', {
      count: AnalyticsService.homeViewLogCount,
    });
  }

  static logTaleOpenEvent(params: TaleOpenEventParams) {
    firebaseAnalytics().logEvent('tale_open', {
      ...params,
    });
  }

  static logTalePlayEvent(params: TalePlayEventParams) {
    firebaseAnalytics().logEvent('tale_play', {
      ...params,
    });
  }

  static logTalePauseEvent(params: TalePauseEventParams) {
    firebaseAnalytics().logEvent('tale_pause', {
      ...params,
    });
  }

  static logTaleRewindEvent(params: TaleRewindEventParams) {
    firebaseAnalytics().logEvent('tale_rewind', {
      ...params,
    });
  }

  static logTaleLikedEvent(params: TaleLikedEventParams) {
    AnalyticsService.taleLikedLogCount += 1;

    firebaseAnalytics().logEvent('tale_liked', {
      ...params,
      count: AnalyticsService.taleLikedLogCount,
    });
  }
}

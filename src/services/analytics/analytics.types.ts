import { CATEGORY_NAMES } from '@/constants/stories';

import { SOURCE, PAYWALL_TYPE } from './analytics.constants';

export interface LaunchAppEventParams {
  source: SOURCE.HOT_START | SOURCE.COLD_START;
}

export interface OnboardingEventParams {
  screen: number;
}

export interface PaywallViewedEventParams {
  contentName: string;
  source: SOURCE;
  type: PAYWALL_TYPE;
}

export interface PaywallClosedEventParams {
  contentName: string;
  source: SOURCE;
  type: PAYWALL_TYPE;
}

export interface StartSubscriptionEventParams {
  contentName: string;
  hasTrial: boolean;
  productId: number;
  source: SOURCE;
  type: PAYWALL_TYPE;
}

export interface SettingsViewEventParams {}

export interface HomeViewEventParams {}

export type TabEventType = CATEGORY_NAMES | 'Featuring' | ' Free tales' | 'All tales';

export interface TaleOpenEventParams {
  name: string;
  tab: TabEventType;
}

export interface TalePlayEventParams {
  name: string;
  tab: TabEventType;
}

export interface TalePauseEventParams {
  name: string;
  tab: TabEventType;
}

export interface TaleRewindEventParams {
  name: string;
  tab: TabEventType;
  value: string;
}

export interface TaleLikedEventParams {
  name: string;
  tab: TabEventType;
}

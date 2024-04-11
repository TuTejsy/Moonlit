import { CATEGORY_NAMES } from '@/constants/stories';

import { SOURCE, PAYWALL_TYPE } from './analytics.constants';

export type TabEventType =
  | CATEGORY_NAMES
  | 'Featuring tales'
  | 'Free tales'
  | 'All tales'
  | 'Popular tales'
  | 'Tab player'
  | 'Saved'
  | 'Recent played';

export interface LaunchAppEventParams {
  source: SOURCE.HOT_START | SOURCE.COLD_START;
}

export interface OnboardingEventParams {
  screen: number;
}

export interface PaywallViewedEventParams {
  source: SOURCE;
  type: PAYWALL_TYPE;
  contentName?: string;
  tab?: TabEventType;
}

export interface PaywallClosedEventParams {
  source: SOURCE;
  type: PAYWALL_TYPE;
  contentName?: string;
  tab?: TabEventType;
}

export interface StartSubscriptionEventParams {
  hasTrial: boolean;
  productId: string;
  source: SOURCE;
  type: PAYWALL_TYPE;
  contentName?: string;
  tab?: TabEventType;
}

export interface SettingsViewEventParams {}

export interface HomeViewEventParams {}

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
  source: SOURCE.TALE_PLAYER | SOURCE.TALE_PREVIEW;
  tab: TabEventType;
}

export interface VoiceViewEventParams {
  name: string;
  source: SOURCE.TALE_PLAYER | SOURCE.TALE_PREVIEW;
  tab: TabEventType;
}

export interface VoiceChangeEventParams {
  from: string;
  name: string;
  source: SOURCE.TALE_PLAYER | SOURCE.TALE_PREVIEW;
  tab: TabEventType;
  to: string;
}

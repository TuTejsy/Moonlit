export const MIXPANEL_SERVER_URL = 'https://api.mixpanel.com';

export enum MIXPANEL_EVENT {
  APP_LAUNCHED = 'app_launched',
  ONBOARDING_SCREEN_VIEWED = 'onboarding_screen_viewed',
  PAYWALL_CLOSED = 'paywall_closed',
  PAYWALL_VIEWED = 'paywall_viewed',
  SCREEN_VIEWED = 'screen_viewed',
  SUBSCRIPTION_STARTED = 'subscription_started',
  TALE_LIKED = 'tale_liked',
  TALE_OPENED = 'tale_opened',
  TALE_PAUSED = 'tale_paused',
  TALE_PLAYED = 'tale_played',
  TALE_REWOUND = 'tale_rewound',
  VOICE_CHANGED = 'voice_changed',
  VOICE_VIEWED = 'voice_viewed',
}

export enum SOURCE {
  ALL_VOICES = 'all_voices',
  COLD_START = 'cold_start',
  CONTENT = 'content',
  HOME_VIEW = 'home_view',
  HOT_START = 'hot_start',
  ONBOARDING = 'onboarding',
  RECENT_PLAYED_TAB = 'recent_played_tab',
  SAVED_TAB = 'saved_tab',
  SEARCH = 'search',
  SETTINGS = 'settings',
  STORIES_LIST = 'stories_list',
  TALE_PLAYER = 'tale_player',
  TALE_PREVIEW = 'tale_preview',
  VOICE = 'voice',
}

export enum PAYWALL_TYPE {
  WITH_SCROLLABLE = 'with_scrollable',
  WITH_SELECTION = 'with_selection',
  WITH_STATIC_DEFAULT_PROD = 'with_static_default_prod',
  WITH_SWITCHER = 'with_switcher',
}

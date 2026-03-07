// setupJest.ts
// Add any global mock implementations here

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const React = require('react');
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const RN = require('react-native');
  const AnimatedView = React.forwardRef((props: Record<string, unknown>, ref: unknown) =>
    React.createElement(RN.View, { ...props, ref }),
  );
  const AnimatedText = React.forwardRef((props: Record<string, unknown>, ref: unknown) =>
    React.createElement(RN.Text, { ...props, ref }),
  );
  const AnimatedImage = React.forwardRef((props: Record<string, unknown>, ref: unknown) =>
    React.createElement(RN.Image, { ...props, ref }),
  );
  return {
    __esModule: true,
    Easing: {
      back: jest.fn(),
      bezier: jest.fn(),
      bounce: jest.fn(),
      circle: jest.fn(),
      cubic: jest.fn(),
      ease: jest.fn(),
      elastic: jest.fn(),
      exp: jest.fn(),
      in: jest.fn((f: unknown) => f),
      inOut: jest.fn((f: unknown) => f),
      linear: jest.fn(),
      out: jest.fn((f: unknown) => f),
      poly: jest.fn(),
      quad: jest.fn(),
      sin: jest.fn(),
    },
    cancelAnimation: jest.fn(),
    default: {
      Image: AnimatedImage,
      ScrollView: AnimatedView,
      Text: AnimatedText,
      View: AnimatedView,
      addWhitelistedNativeProps: jest.fn(),
      addWhitelistedUIProps: jest.fn(),
      createAnimatedComponent: (component: unknown) => component,
    },
    interpolate: jest.fn(),
    useAnimatedScrollHandler: jest.fn((cb) => cb?.onScroll ?? cb),
    useAnimatedStyle: jest.fn().mockReturnValue({}),
    useDerivedValue: jest.fn((cb) => ({ value: cb() })),
    useSharedValue: jest.fn((initial: unknown) => ({ value: initial })),
    withRepeat: jest.fn(),
    withTiming: jest.fn(),
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: jest.fn().mockReturnValue({ bottom: 0, left: 0, right: 0, top: 0 }),
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn((cb: () => void) => cb()),
  useIsFocused: jest.fn().mockReturnValue(true),
  useNavigation: jest.fn().mockReturnValue({
    goBack: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
  useRoute: jest.fn().mockReturnValue({ params: {} }),
  useScrollToTop: jest.fn(),
}));

// Mock react-native-config
jest.mock('react-native-config', () => ({
  SERVER_URL: 'https://mock-server.com',
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/Documents',
  MainBundlePath: '/mock/Bundle',
  downloadFile: jest.fn().mockReturnValue({ promise: Promise.resolve({ statusCode: 200 }) }),
  exists: jest.fn().mockResolvedValue(true),
  mkdir: jest.fn().mockResolvedValue(undefined),
  unlink: jest.fn().mockResolvedValue(undefined),
}));

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
  const store: Record<string, string | boolean | number> = {};
  return {
    createMMKV: jest.fn(() => ({
      getBoolean: jest.fn((key: string) => {
        const val = store[key];
        return typeof val === 'boolean' ? val : undefined;
      }),
      getString: jest.fn((key: string) => {
        const val = store[key];
        return typeof val === 'string' ? val : undefined;
      }),
      set: jest.fn((key: string, value: string | boolean | number) => {
        store[key] = value;
      }),
    })),
  };
});

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Circle: 'Circle',
  Defs: 'Defs',
  G: 'G',
  Line: 'Line',
  LinearGradient: 'LinearGradient',
  Path: 'Path',
  Rect: 'Rect',
  Stop: 'Stop',
  Svg: 'Svg',
  default: 'Svg',
}));

// Mock @react-native-masked-view/masked-view
jest.mock('@react-native-masked-view/masked-view', () => 'MaskedView');

// Mock @sbaiahmed1/react-native-blur
jest.mock('@sbaiahmed1/react-native-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock react-native-dialog
jest.mock('react-native-dialog', () => ({
  Button: 'Dialog.Button',
  Container: 'Dialog.Container',
  Input: 'Dialog.Input',
  Title: 'Dialog.Title',
}));

// Mock @realm/react
jest.mock('@realm/react', () => ({
  createRealmContext: jest.fn().mockReturnValue({
    RealmProvider: ({ children }: { children: React.ReactNode }) => children,
    useObject: jest.fn(),
    useQuery: jest.fn().mockReturnValue([]),
    useRealm: jest.fn().mockReturnValue({
      write: jest.fn((callback: () => void) => callback()),
    }),
  }),
}));

// Mock realm
jest.mock('realm', () => {
  class MockRealm {}
  return MockRealm;
});

// Mock react-native-webview
jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

// Mock rn-dominant-color
jest.mock('rn-dominant-color', () => ({
  getColorFromURL: jest.fn(),
}));

// Mock react-native-adjust
jest.mock('react-native-adjust', () => ({
  Adjust: {
    componentWillUnmount: jest.fn(),
    initSdk: jest.fn(),
    trackEvent: jest.fn(),
  },
  AdjustConfig: jest.fn().mockImplementation(() => ({
    setDeactivateSkAdNetworkHandling: jest.fn(),
    setLogLevel: jest.fn(),
  })),
}));

// Mock react-native-in-app-review
jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn().mockResolvedValue(true),
  isAvailable: jest.fn().mockReturnValue(true),
}));

// Mock react-native-email-link
jest.mock('react-native-email-link', () => ({
  openComposer: jest.fn(),
}));

// Mock @react-native-firebase/analytics
jest.mock('@react-native-firebase/analytics', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    logEvent: jest.fn(),
    setUserProperties: jest.fn(),
  })),
}));

// Mock @react-native-firebase/remote-config
jest.mock('@react-native-firebase/remote-config', () => {
  const mockConfig = {
    activate: jest.fn().mockResolvedValue(true),
    fetchAndActivate: jest.fn().mockResolvedValue(true),
    getValue: jest.fn().mockReturnValue({
      asBoolean: jest.fn().mockReturnValue(false),
      asString: jest.fn().mockReturnValue(''),
    }),
    onConfigUpdated: jest.fn().mockReturnValue(jest.fn()),
    setDefaults: jest.fn(),
  };
  return {
    __esModule: true,
    default: jest.fn(() => mockConfig),
  };
});

// Mock @amplitude/analytics-react-native
jest.mock('@amplitude/analytics-react-native', () => ({
  Identify: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
  })),
  identify: jest.fn(),
  init: jest.fn(),
  track: jest.fn(),
}));

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  Gesture: {
    Pan: jest.fn().mockReturnValue({
      onEnd: jest.fn().mockReturnThis(),
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
    }),
  },
  GestureDetector: 'GestureDetector',
  GestureHandlerRootView: 'GestureHandlerRootView',
  PanGestureHandler: 'PanGestureHandler',
  State: {},
}));

// Mock useMakeStyles - returns the makeStyles function result with empty style objects
jest.mock('@/hooks/theme/useMakeStyles', () => ({
  useMakeStyles: jest.fn((makeStylesFn: (...args: unknown[]) => unknown) => {
    try {
      const theme = {
        colors: {
          black: '#000000',
          dark: '#2D2D2D',
          darkBlack: '#141C1A',
          darkGradientPurple: '#0A0315',
          darkGrey: '#1A1A1A',
          darkPurple: '#080211',
          gradientButtonEnd: 'rgba(205, 160, 243, 1)',
          gradientButtonMiddle: 'rgba(162, 67, 239, 1)',
          gradientButtonStart: 'rgba(212, 75, 237, 1)',
          gradientPinkEnd: '#D44BED',
          gradientPinkStart: '#CC9DF3',
          green: '#247F8A',
          grey: '#D9D9D9',
          imagePurple: '#4C3F55',
          lightGradientPurple: '#1E004E',
          lightPurple: '#1F0647',
          opacityBlack: (f: number) => `rgba(0, 0, 0, ${f})`,
          opacityDarkPurple: (f: number) => `rgba(8, 12, 17, ${f})`,
          opacityGreen: (f: number) => `rgba(36, 127, 138, ${f})`,
          opacityGrey: (f: number) => `rgba(217, 217, 217, ${f})`,
          opacityLightGradientPurple: (f: number) => `rgba(26, 0, 67, ${f})`,
          opacityLightPurple: (f: number) => `rgba(31, 6, 71, ${f})`,
          opacityOrange: (f: number) => `rgba(236, 119, 72, ${f})`,
          opacityPurple: (f: number) => `rgba(23, 6, 52, ${f})`,
          opacitySkin: (f: number) => `rgba(202, 166, 144, ${f})`,
          opacityWhite: (f: number) => `rgba(255, 255, 255, ${f})`,
          orange: '#EC7748',
          pink: '#D44BED',
          purple: '#170634',
          red: '#FF4646',
          shadow: 'rgba(92, 95, 102, 0.1)',
          shadowDropIn: 'rgba(41, 44, 51, 0.04)',
          shadowDropOut: 'rgba(41, 44, 51, 0.08)',
          transparent: 'transparent',
          white: '#FFFFFF',
          white_50: '#88868D',
        },
        dh: (s: number) => s,
        dw: (s: number) => s,
        horizontalPadding: 16,
        insets: { bottom: 0, left: 0, right: 0, top: 0 },
        isLandscape: false,
        isPortrait: true,
        windowHeight: 844,
        windowWidth: 390,
      };
      return makeStylesFn(theme, {});
    } catch {
      return {};
    }
  }),
}));

// Mock useTheme
jest.mock('@/hooks/theme/useTheme', () => ({
  ThemeContext: { Provider: 'ThemeProvider' },
  ThemeValues: { Dark: 'Dark' },
  useTheme: jest.fn().mockReturnValue({
    colors: {
      black: '#000000',
      dark: '#2D2D2D',
      darkBlack: '#141C1A',
      darkGradientPurple: '#0A0315',
      darkGrey: '#1A1A1A',
      darkPurple: '#080211',
      gradientButtonEnd: 'rgba(205, 160, 243, 1)',
      gradientButtonMiddle: 'rgba(162, 67, 239, 1)',
      gradientButtonStart: 'rgba(212, 75, 237, 1)',
      gradientPinkEnd: '#D44BED',
      gradientPinkStart: '#CC9DF3',
      green: '#247F8A',
      grey: '#D9D9D9',
      imagePurple: '#4C3F55',
      lightGradientPurple: '#1E004E',
      lightPurple: '#1F0647',
      opacityBlack: (f: number) => `rgba(0, 0, 0, ${f})`,
      opacityDarkPurple: (f: number) => `rgba(8, 12, 17, ${f})`,
      opacityGreen: (f: number) => `rgba(36, 127, 138, ${f})`,
      opacityGrey: (f: number) => `rgba(217, 217, 217, ${f})`,
      opacityLightGradientPurple: (f: number) => `rgba(26, 0, 67, ${f})`,
      opacityLightPurple: (f: number) => `rgba(31, 6, 71, ${f})`,
      opacityOrange: (f: number) => `rgba(236, 119, 72, ${f})`,
      opacityPurple: (f: number) => `rgba(23, 6, 52, ${f})`,
      opacitySkin: (f: number) => `rgba(202, 166, 144, ${f})`,
      opacityWhite: (f: number) => `rgba(255, 255, 255, ${f})`,
      orange: '#EC7748',
      pink: '#D44BED',
      purple: '#170634',
      red: '#FF4646',
      shadow: 'rgba(92, 95, 102, 0.1)',
      shadowDropIn: 'rgba(41, 44, 51, 0.04)',
      shadowDropOut: 'rgba(41, 44, 51, 0.08)',
      transparent: 'transparent',
      white: '#FFFFFF',
      white_50: '#88868D',
    },
    indicatorStyle: 'black',
    zIndex: { backgroundLoader: 100010, icon: 100, main: 1, max: Number.MAX_SAFE_INTEGER },
  }),
}));

// Mock useLayout
jest.mock('@/hooks/theme/useLayout', () => ({
  useLayout: jest.fn().mockReturnValue({
    dh: (s: number) => s,
    dw: (s: number) => s,
    horizontalPadding: 16,
    isLandscape: false,
    isPortrait: true,
    windowHeight: 844,
    windowWidth: 390,
  }),
}));

// Mock useAppLocalization
jest.mock('@/localization/useAppLocalization', () => ({
  useAppLocalization: jest.fn().mockReturnValue({
    localization: {},
    localize: jest.fn((ns: string, key: string) => `${ns}.${key}`),
  }),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn((key: string) => key),
  }),
}));

// Mock store selectors commonly used
jest.mock('@/store/user/user.selector', () => ({
  selectFreeOfferDays: jest.fn(() => 7),
  selectIsFullVersion: jest.fn(() => false),
}));

jest.mock('@/store/subscription/subscription.selector', () => ({
  selectProducts: jest.fn(() => null),
}));

// Mock useAppNavigation
jest.mock('@/navigation/hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn().mockReturnValue({
    goBack: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock useAppRoute
jest.mock('@/navigation/hooks/useAppRoute', () => ({
  useAppRoute: jest.fn().mockReturnValue({ params: {} }),
}));

// Mock useShowPaywallModal
jest.mock('@/hooks/navigation/useShowPaywallModal', () => ({
  useShowPaywallModal: jest.fn().mockReturnValue({
    areProductsLoaded: false,
    isFullVerion: false,
    isSubscriptionAvailable: true,
    showPaywallModal: jest.fn(),
  }),
}));

// Mock icons
jest.mock('@/assets/icons/Icons', () => ({
  Icons: new Proxy(
    {},
    {
      get: () => 'MockIcon',
    },
  ),
}));

jest.mock('@/components/Empty/images/Moon/Moon.png', () => 'moon-image', { virtual: true });
jest.mock('@/components/PromotionBanner/images/banner/banner.png', () => 'banner-image', {
  virtual: true,
});
jest.mock('@/components/PromotionBanner/images/voices/voices.png', () => 'voices-image', {
  virtual: true,
});

// Mock react-native-worklets
jest.mock('react-native-worklets', () => ({
  scheduleOnRN: jest.fn((fn: () => void) => fn()),
}));

// Mock useAppDispatch
jest.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
}));

// Mock useAppSelector
jest.mock('@/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn((selector: (state: unknown) => unknown) => {
    try {
      return selector({});
    } catch {
      return undefined;
    }
  }),
}));

// Mock database hooks
jest.mock('@/hooks/database/useStories', () => ({
  useStories: jest.fn().mockReturnValue([[], 0]),
}));

jest.mock('@/hooks/database/useStory', () => ({
  useStory: jest.fn().mockReturnValue([null]),
}));

jest.mock('@/hooks/database/useAudioRecordings', () => ({
  useAudioRecordings: jest.fn().mockReturnValue([[], 0]),
}));

jest.mock('@/hooks/database/useSelectedAudioRecording', () => ({
  useSelectedAudioRecording: jest.fn().mockReturnValue({
    selectedAudioRecording: null,
    setSelectedAudioRecording: jest.fn(),
  }),
}));

jest.mock('@/hooks/database/useHandleStoryFavorite', () => ({
  useHandleStoryFavorite: jest.fn().mockReturnValue({
    handleStoryFavoritePress: jest.fn(),
    isFavorite: false,
  }),
}));

jest.mock('@/hooks/content/useStoriesUpdate', () => ({
  useStoriesUpdate: jest.fn().mockReturnValue([false, jest.fn()]),
}));

// Mock animation and scroll hooks
jest.mock('@/hooks/useScrollOpacity', () => ({
  useScrollOpacity: jest.fn().mockReturnValue({
    handleOpacityScroll: jest.fn(),
    opacityAnimStyle: {},
  }),
}));

jest.mock('@/hooks/useAnimatedScrollHandlerValue', () => ({
  useAnimatedScrollHandlerValue: jest.fn().mockReturnValue({
    handleAnimatedScroll: jest.fn(),
    scrollPositionSharedValue: { value: 0 },
  }),
}));

jest.mock('@/hooks/useImageSlideAnimation', () => ({
  useImageSlideAnimation: jest.fn().mockReturnValue({
    handleImageLayout: jest.fn(),
    imageAnimatedStyle: {},
  }),
}));

// Mock story player hook
jest.mock('@/hooks/useStoryPlayer/useStoryPlayer', () => ({
  useStoryPlayer: jest.fn().mockReturnValue({
    isCurrentStoryPlaying: false,
    isStoryLoading: false,
    isStoryPlayingSharedValue: { value: 0 },
    moveStoryPlayingToTime: jest.fn(),
    pauseStoryPlaying: jest.fn(),
    playedTime: 0,
    startStoryPlaying: jest.fn(),
    storyPlayingSharedValue: { value: 0 },
  }),
}));

jest.mock('@/hooks/useVoicePreviewCachedPath', () => ({
  useVoicePreviewCachedPath: jest.fn().mockReturnValue('file:///mock/voice-preview.png'),
}));

// Mock navigation hooks
jest.mock('@/hooks/navigation/useBackHandler', () => ({
  useBackHandler: jest.fn(),
}));

jest.mock('@/hooks/navigation/useWebPagesNavigation', () => ({
  useWebPagesNavigation: jest.fn().mockReturnValue({
    openPrivacyPolicy: jest.fn(),
    openTermsOfService: jest.fn(),
  }),
}));

jest.mock('@/hooks/useDevMode', () => ({
  useDevMode: jest.fn().mockReturnValue({
    onDevModePress: jest.fn(),
    renderDevModeDialog: jest.fn().mockReturnValue(null),
  }),
}));

jest.mock('@/hooks/useHandleCheckSubscription', () => ({
  useHandleCheckSubscription: jest.fn().mockReturnValue(jest.fn()),
}));

// Mock AnalyticsService
jest.mock('@/services/analytics/analytics', () => ({
  AnalyticsService: {
    logHomeViewEvent: jest.fn(),
    logOnboardingEvent: jest.fn(),
    logPaywallClosedEvent: jest.fn(),
    logPaywallViewedEvent: jest.fn(),
    logSavedViewEvent: jest.fn(),
    logSettingsViewEvent: jest.fn(),
    logStartSubscriptionEvent: jest.fn(),
    logTaleOpenEvent: jest.fn(),
    logTalePauseEvent: jest.fn(),
    logTalePlayEvent: jest.fn(),
    logTaleRewindEvent: jest.fn(),
    logVoiceChangeEvent: jest.fn(),
    logVoiceViewEvent: jest.fn(),
    setIsUserPaid: jest.fn(),
  },
}));

// Mock storage service
jest.mock('@/services/storage/storage', () => ({
  getStorageData: jest.fn().mockReturnValue({
    isAnaltyicsEnabled: false,
    isOnboarded: true,
    isReviewAsked: false,
  }),
  storage: {
    set: jest.fn(),
  },
}));

// Mock remote config service
jest.mock('@/services/remoteConfig/remoteConfig', () => ({
  remoteConfigService: {
    buyButtonTextNoTrial: 'Unlock',
    buyButtonTextTrial: 'Start Free Trial',
    disableLiveUpdate: jest.fn(),
    enableLiveUpdate: jest.fn(),
    isLiveUpdateEnabled: false,
    placementId: 'test_placement',
    segment: 'test_segment',
    toggleState: false,
  },
}));

// Mock navigation service
jest.mock('@/services/navigation/navigationService', () => ({
  navigationService: {
    activeTab: 'HomeTab',
  },
}));

// Mock database (AudioRecordingsDB)
jest.mock('@/database', () => ({
  AudioRecordingsDB: {
    object: jest.fn().mockReturnValue(null),
  },
}));

// Mock Favorites data hook
jest.mock('@/screens/FavoritesScreen/hooks/useFavoritesData', () => ({
  useFavoritesData: jest.fn().mockReturnValue({
    recentlyPlayedStories: [],
    recentlyPlayedStoriesVersion: 0,
    savedStories: [],
    savedStoriesVersion: 0,
  }),
}));

// Mock tab bar scroll sync hook
jest.mock('@/screens/FavoritesScreen/hooks/useTabBarScrollSync', () => ({
  useTabBarScrollSync: jest.fn().mockReturnValue({
    animatedRecentlyPlayedTabStyle: {},
    animatedSavedTabStyle: {},
    animatedTabIndicatorStyle: {},
    handleBeginEndDrag: jest.fn(),
    handleFirstTabScroll: jest.fn(),
    handleRecentlyPlayedTabPress: jest.fn(),
    handleSavedTabPress: jest.fn(),
    handleScrollEndDrag: jest.fn(),
    handleSecondTabScroll: jest.fn(),
    scrollViewRef: { current: null },
  }),
}));

// Mock onboarding hooks
jest.mock('@/screens/GetStartedScreen/hooks/useOnboardingAnimations', () => ({
  useOnboardingAnimations: jest.fn().mockReturnValue({
    backButtonAnimatedStyle: {},
    stepDescriptionsAnimatedStyle: {},
    stepImagesAnimatedStyle: {},
    stepTagsAnimatedStyle: {},
    stepTitlesAnimatedStyle: {},
  }),
}));

jest.mock('@/screens/GetStartedScreen/hooks/useOnboardingSteps', () => ({
  useOnboardingSteps: jest.fn().mockReturnValue({
    currentStepSharedValue: { value: 0 },
    handleBackPress: jest.fn(),
    handleContinuePress: jest.fn(),
  }),
}));

// Mock paywall hooks
jest.mock('@/screens/PaywallModal/hooks/usePaywallProducts', () => ({
  usePaywallProducts: jest.fn().mockReturnValue({
    isFreeTrialEnabled: false,
    isTrialEligible: false,
    selectedProduct: undefined,
    setSelectedProduct: jest.fn(),
    trialProduct: undefined,
    unlockButtonText: 'Unlock',
    weeklyProduct: undefined,
    yearlyProduct: undefined,
  }),
}));

jest.mock('@/screens/PaywallModal/hooks/usePaywallActions', () => ({
  usePaywallActions: jest.fn().mockReturnValue({
    handleRestorePress: jest.fn(),
    handleSkipPress: jest.fn(),
    handleUnlockPress: jest.fn(),
    isLoading: false,
  }),
}));

// Mock paywall content variant hooks
jest.mock(
  '@/screens/PaywallModal/contentVariants/SelectionPaywallContent/hooks/useSelectionPaywallProducts',
  () => ({
    useSelectionPaywallProducts: jest.fn().mockReturnValue({
      handleTrialEnabledChanged: jest.fn(),
      handleWeeklyProductPress: jest.fn(),
      handleYearlyProductPress: jest.fn(),
      isFreeTrialToggle: false,
      secondProduct: undefined,
      secondProductText: '$4.99/week',
      weeklyPricePerWeekText: '$4.99/week',
      yearlyPricePerWeekText: '$1.99/week',
      yearlyPriceText: '$99.99/year',
      yearlyProductBenifitText: 'Save 60%',
    }),
  }),
);

jest.mock(
  '@/screens/PaywallModal/contentVariants/SwitcherPaywallContent/hooks/useSwitcherPaywallProducts',
  () => ({
    useSwitcherPaywallProducts: jest.fn().mockReturnValue({
      handleTrialEnabledChanged: jest.fn(),
      productText: '$99.99/year',
    }),
  }),
);

jest.mock(
  '@/screens/PaywallModal/contentVariants/ScrollablePaywallContent/hooks/useScrollablePaywallProducts',
  () => ({
    useScrollablePaywallProducts: jest.fn().mockReturnValue({
      handleTrialEnabledChanged: jest.fn(),
      handleWeeklyProductPress: jest.fn(),
      handleYearlyProductPress: jest.fn(),
      isFreeTrialToggle: false,
      pricesDiffInPercentsText: '-60%',
      secondProduct: undefined,
      secondProductText: '$4.99/week',
      selectedProductPriceText: '$99.99/year',
      weeklyPricePerWeekText: '$4.99/week',
      yearlyPricePerWeekText: '$1.99/week',
    }),
  }),
);

// Mock StoryPlayerScreen hooks
jest.mock(
  '@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryAudioRecordingsUpdate',
  () => ({
    useStoryAudioRecordingsUpdate: jest.fn(),
  }),
);

jest.mock('@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryCoverAnimation', () => ({
  useStoryCoverAnimation: jest.fn().mockReturnValue({
    coverAnimatedStyles: {},
    storyContainerAnimatedStyles: {},
  }),
}));

jest.mock(
  '@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryCoverGestureHandler',
  () => ({
    useStoryCoverGestureHandler: jest.fn().mockReturnValue({
      onEnd: jest.fn().mockReturnThis(),
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
    }),
  }),
);

jest.mock(
  '@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryPlayerScreenLayout',
  () => ({
    useStoryPlayerScreenLayout: jest.fn().mockReturnValue({
      buttonHeight: 50,
      buttonImageSize: 30,
      coverBorderRadius: 16,
      playerImageSize: 40,
    }),
  }),
);

jest.mock('@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryPlayerTheme', () => ({
  useStoryPlayerTheme: jest.fn().mockReturnValue({
    backgroundGradientColors: ['#170634', '#0A0118'],
    bottomGradientColors1: ['rgba(23,6,52,0)', '#170634'],
    bottomGradientColors2: ['rgba(23,6,52,0)', '#170634'],
    gradientColor: '#170634',
  }),
}));

jest.mock('@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryShare', () => ({
  useStoryShare: jest.fn().mockReturnValue({
    handleSharePress: jest.fn(),
  }),
}));

// Mock VoiceSettingsModal hooks
jest.mock(
  '@/screens/StoryPlayerScreens/VoiceSettingsModal/components/AudioRecording/hooks/useAudioRecordingLayout',
  () => ({
    useAudioRecordingLayout: jest.fn().mockReturnValue({
      audioRecordingSize: 100,
      numColumns: 3,
    }),
  }),
);

// Mock default list navigation hook
jest.mock('@/screens/HomeScreen/components/DefaultList/hooks/useDefaultListNavigation', () => ({
  useDefaultListNavigation: jest.fn().mockReturnValue({
    handleSeeAllTales: jest.fn(),
    handleSeeFeaturingTales: jest.fn(),
    handleSeeFreeTales: jest.fn(),
    handleSeePopularTales: jest.fn(),
  }),
}));

// Mock SplashViewModal layout hook
jest.mock('@/screens/SplashViewModal/hooks/useSplashViewModalLayout', () => ({
  useSplashViewModalLayout: jest.fn().mockReturnValue({
    moonLogoSize: 100,
  }),
}));

// Mock SmallStoriesList layout hook
jest.mock('@/components/Lists/SmallStoriesList/hooks/useSmallStoriesListLayout', () => ({
  useSmallStoriesListLayout: jest.fn().mockReturnValue({
    numColumns: 2,
  }),
}));

// Mock progress bar gesture handler
jest.mock(
  '@/screens/StoryPlayerScreens/StoryPlayerScreen/components/StoryPlayer/components/ProgressBar/hooks/useProgressBarGestureHandler',
  () => ({
    useProgressBarGestureHandler: jest.fn().mockReturnValue({
      gestureHandler: {},
      localPlayedTime: 0,
    }),
  }),
);

// Mock screen image files
jest.mock('@/screens/GetStartedScreen/images/firstStep/firstStep.png', () => 'step1-image', {
  virtual: true,
});
jest.mock('@/screens/GetStartedScreen/images/secondStep/secondStep.png', () => 'step2-image', {
  virtual: true,
});
jest.mock('@/screens/GetStartedScreen/images/thirdStep/thirdStep.png', () => 'step3-image', {
  virtual: true,
});
jest.mock('@/screens/GetStartedScreen/images/fourthStep/fourthStep.png', () => 'step4-image', {
  virtual: true,
});
jest.mock('@/screens/SplashViewModal/images/launchLogo/launchLogo.png', () => 'launch-logo-image', {
  virtual: true,
});
jest.mock('@/screens/SplashViewModal/images/stars/stars.png', () => 'stars-image', {
  virtual: true,
});
jest.mock(
  '@/screens/PaywallModal/images/background/background.png',
  () => 'paywall-background-image',
  { virtual: true },
);
jest.mock('@/screens/PaywallModal/images/voices/voices.png', () => 'paywall-voices-image', {
  virtual: true,
});
jest.mock(
  '@/screens/PaywallModal/images/voicesLandscape/voicesLandscape.png',
  () => 'paywall-voices-landscape-image',
  { virtual: true },
);
jest.mock(
  '@/screens/PaywallModal/components/PaywallBackground/images/scrollableBackground/scrollableBackground.png',
  () => 'scrollable-background-image',
  { virtual: true },
);
jest.mock(
  '@/screens/SettingsScreen/components/PromotionBanner/images/bannerBackground/bannerBackground.png',
  () => 'settings-banner-image',
  { virtual: true },
);
jest.mock(
  '@/screens/HomeScreen/components/EmptySearch/images/noSearchResults/noSearchResults.png',
  () => 'no-search-results-image',
  { virtual: true },
);

// Mock react-native-adapty (extend with purchase methods)
jest.mock('react-native-adapty', () => ({
  adapty: {
    getPaywall: jest.fn().mockResolvedValue({}),
    getPaywallProducts: jest.fn().mockResolvedValue([]),
    getProfile: jest.fn().mockResolvedValue({ accessLevels: {} }),
    makePurchase: jest.fn().mockResolvedValue({ type: 'success' }),
    restorePurchases: jest.fn().mockResolvedValue({ accessLevels: {} }),
  },
}));

// Mock DevMenu navigator
jest.mock('@/navigation/DebugNavigator/DevMenuNavigator', () => ({
  DevMenuNavigator: 'DevMenuNavigator',
}));

// Mock ModalHeader component
jest.mock('@/components/Headers/ModalHeader/ModalHeader', () => ({
  ModalHeader: 'ModalHeader',
}));

// Mock ScreenHeader component
jest.mock('@/components/Headers/ScreenHeader/ScreenHeader', () => ({
  ScreenHeader: 'ScreenHeader',
}));

// Mock list components from shared components
jest.mock('@/components/Lists/LargeStoriesList/LargeStoriesList', () => {
  /* eslint-disable global-require, @typescript-eslint/no-var-requires */
  const React = require('react');
  const { View } = require('react-native');
  /* eslint-enable global-require, @typescript-eslint/no-var-requires */
  return {
    LargeStoriesList: ({ ListHeaderComponent, children }: any) =>
      React.createElement(View, null, ListHeaderComponent, children),
  };
});

jest.mock('@/components/Lists/MediumStoriesList/MediumStoriesList', () => {
  /* eslint-disable global-require, @typescript-eslint/no-var-requires */
  const React = require('react');
  const { View } = require('react-native');
  /* eslint-enable global-require, @typescript-eslint/no-var-requires */
  return {
    MediumStoriesList: ({ ListHeaderComponent, children }: any) =>
      React.createElement(View, null, ListHeaderComponent, children),
  };
});

jest.mock('@/components/Lists/SmallStoriesList/SmallStoriesList', () => {
  /* eslint-disable global-require, @typescript-eslint/no-var-requires */
  const React = require('react');
  const { View } = require('react-native');
  /* eslint-enable global-require, @typescript-eslint/no-var-requires */
  return {
    SmallStoriesList: ({ ListHeaderComponent, children }: any) =>
      React.createElement(View, null, ListHeaderComponent, children),
  };
});

jest.mock('@/components/Lists/SmallStoriesPlainList/SmallStoriesPlainList', () => {
  /* eslint-disable global-require, @typescript-eslint/no-var-requires */
  const React = require('react');
  const { View } = require('react-native');
  /* eslint-enable global-require, @typescript-eslint/no-var-requires */
  return {
    SmallStoriesPlainList: ({ ListHeaderComponent, children }: any) =>
      React.createElement(View, null, ListHeaderComponent, children),
  };
});

jest.mock('@/components/Lists/MoreTalesComingFooter/MoreTalesComingFooter', () => ({
  MoreTalesComingFooter: 'MoreTalesComingFooter',
}));

// Mock GradientButton
jest.mock('@/components/GradientButton/GradientButton', () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const React = require('react');
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const { Text, TouchableOpacity } = require('react-native');
  return {
    GradientButton: ({
      children,
      onPress,
      ...props
    }: {
      children: React.ReactNode;
      onPress?: () => void;
    }) =>
      React.createElement(
        TouchableOpacity,
        { onPress, ...props },
        typeof children === 'string' ? React.createElement(Text, null, children) : children,
      ),
  };
});

// Mock AbsoluteSpinnerView
jest.mock('@/components/AbsoluteSpinnerView/AbsoluteSpinnerView', () => ({
  AbsoluteSpinnerView: 'AbsoluteSpinnerView',
}));

// Mock ScrollShadow component
jest.mock('@/components/Primitives/ScrollShadow/ScrollShadow', () => ({
  ScrollShadow: 'ScrollShadow',
}));

// Mock PromotionBanner from shared components
jest.mock('@/components/PromotionBanner/PromotionBanner', () => ({
  PromotionBanner: 'PromotionBanner',
}));

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
      ease: jest.fn(),
      linear: jest.fn(),
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
    useAnimatedScrollHandler: jest.fn(),
    useAnimatedStyle: jest.fn().mockReturnValue({}),
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
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn((cb: () => void) => cb()),
  useNavigation: jest.fn().mockReturnValue({
    goBack: jest.fn(),
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
  useRoute: jest.fn().mockReturnValue({ params: {} }),
}));

// Mock react-native-adapty
jest.mock('react-native-adapty', () => ({
  adapty: {
    getPaywall: jest.fn().mockResolvedValue({}),
    getPaywallProducts: jest.fn().mockResolvedValue([]),
    getProfile: jest.fn().mockResolvedValue({ accessLevels: {} }),
  },
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
jest.mock('react-native-webview', () => 'WebView');

// Mock rn-dominant-color
jest.mock('rn-dominant-color', () => ({
  getColorFromURL: jest.fn(),
}));

// Mock react-native-adjust
jest.mock('react-native-adjust', () => ({
  Adjust: {
    initSdk: jest.fn(),
    trackEvent: jest.fn(),
  },
  AdjustConfig: jest.fn(),
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
          black: '#000',
          dark: '#2D2D2D',
          darkBlack: '#141C1A',
          gradientButtonEnd: '#D44BED',
          gradientButtonMiddle: '#CC9DF3',
          gradientButtonStart: '#CC9DF3',
          green: '#247F8A',
          lightPurple: '#1F0647',
          opacityDarkPurple: (f: number) => `rgba(8, 12, 17, ${f})`,
          opacityLightPurple: (f: number) => `rgba(31, 6, 71, ${f})`,
          orange: '#EC7748',
          purple: '#170634',
          white: '#FFFFFF',
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
      black: '#000',
      dark: '#2D2D2D',
      gradientButtonEnd: '#D44BED',
      gradientButtonMiddle: '#CC9DF3',
      gradientButtonStart: '#CC9DF3',
      green: '#247F8A',
      lightPurple: '#1F0647',
      opacityDarkPurple: (f: number) => `rgba(8, 12, 17, ${f})`,
      opacityLightPurple: (f: number) => `rgba(31, 6, 71, ${f})`,
      orange: '#EC7748',
      purple: '#170634',
      white: '#FFFFFF',
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

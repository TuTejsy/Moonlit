import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';

import { IS_ANDROID, IS_IOS } from '@/constants/common';
import { ITheme } from '@/hooks/theme/useTheme';

// import { ModalHeader } from '@/components/Headers/ModalHeader/ModalHeader';
// import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';

export const rootOptions = ({ colors }: ITheme): StackNavigationOptions => ({
  cardStyle: {
    backgroundColor: colors.white,
  },
  headerShadowVisible: false,
  headerShown: true,
  presentation: IS_ANDROID ? 'transparentModal' : 'card',
});

export const rootModalOptions = ({ colors }: ITheme): StackNavigationOptions => ({
  cardStyle: {
    backgroundColor: IS_IOS ? colors.transparent : colors.darkPurple,
  },
  headerShadowVisible: false,
  headerShown: false,
  presentation: IS_IOS ? 'transparentModal' : 'modal',
  ...(IS_IOS ? TransitionPresets.ModalSlideFromBottomIOS : undefined),
});

export const paywallOptions: StackNavigationOptions = {
  gestureEnabled: false,
};

export const voiceSettingsModalOptions: StackNavigationOptions = {
  cardOverlay: () => null,
  cardOverlayEnabled: false,
  presentation: 'transparentModal',
};

export const tabOptions: StackNavigationOptions = {
  headerShown: false,
};

export const storyPlayerOptions: StackNavigationOptions = {
  headerShown: false,
};

export const getStartedScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

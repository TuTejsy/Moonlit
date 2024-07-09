import {
  StackNavigationOptions,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';

import { IS_ANDROID, IS_IOS } from '@/constants/common';
import { ITheme } from '@/hooks/theme/useTheme';
import {
  ANIMATION_DAMPING,
  ANIMATION_STIFFNESS,
} from '@/screens/GetStartedScreen/GetStartedScreen.constants';

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
  ...(IS_IOS ? TransitionPresets.ModalSlideFromBottomIOS : TransitionPresets.FadeFromBottomAndroid),
});

export const paywallOptions: StackNavigationOptions = {
  gestureEnabled: false,
};

export const voiceSettingsModalOptions: StackNavigationOptions = {
  ...(IS_IOS && { cardOverlay: () => null, cardOverlayEnabled: false }),
  presentation: IS_IOS ? 'transparentModal' : 'card',
};

export const splashViewModalOptions: StackNavigationOptions = {
  cardOverlay: () => null,
  cardOverlayEnabled: false,
  presentation: 'transparentModal',
  ...TransitionPresets.ModalSlideFromBottomIOS,
  transitionSpec: {
    close: {
      animation: 'timing',
      config: {
        duration: 0,
      },
    },
    open: TransitionSpecs.TransitionIOSSpec,
  },
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

export const webPageScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

export const paywallScreenOptions: StackNavigationOptions = {
  headerShown: false,
  transitionSpec: {
    close: TransitionSpecs.TransitionIOSSpec,
    open: {
      animation: 'spring',
      config: {
        ...TransitionSpecs.TransitionIOSSpec.config,
        damping: ANIMATION_DAMPING,
        mass: 1.2,
        stiffness: ANIMATION_STIFFNESS,
      },
    },
  },
};

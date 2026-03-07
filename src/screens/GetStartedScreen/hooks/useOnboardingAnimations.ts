import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { ANIMATION_DAMPING, ANIMATION_STIFFNESS } from '../GetStartedScreen.constants';

interface UseOnboardingAnimationsProps {
  currentStepSharedValue: SharedValue<number>;
  windowWidth: number;
}

export const useOnboardingAnimations = ({
  currentStepSharedValue,
  windowWidth,
}: UseOnboardingAnimationsProps) => {
  const currentTranslateXSharedValue = useDerivedValue(
    () => -currentStepSharedValue.value * windowWidth,
  );

  const stepImagesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1,
        }),
      },
    ],
  }));

  const stepTagsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1.3,
          stiffness: ANIMATION_STIFFNESS,
        }),
      },
    ],
  }));

  const stepTitlesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1.3,
          stiffness: ANIMATION_STIFFNESS,
        }),
      },
    ],
  }));

  const stepDescriptionsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1.7,
          stiffness: ANIMATION_STIFFNESS,
        }),
      },
    ],
  }));

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(currentStepSharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

  return {
    backButtonAnimatedStyle,
    stepDescriptionsAnimatedStyle,
    stepImagesAnimatedStyle,
    stepTagsAnimatedStyle,
    stepTitlesAnimatedStyle,
  };
};

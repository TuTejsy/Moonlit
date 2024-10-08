import {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { useLayout } from '@/hooks/theme/useLayout';

import { useStoryPlayerScreenLayout } from './useStoryPlayerScreenLayout';

export function useStoryCoverAnimation(
  storyPlayingSharedValue: SharedValue<number>,
  storyContainerMinHeight: number,
) {
  const insets = useSafeAreaInsets();
  const { windowHeight, windowWidth } = useLayout();
  const { storyContainerMinWidth, storyCoverMinHeight } = useStoryPlayerScreenLayout();
  const imageScaleSharedValue = useSharedValue(1);

  const storyContainerAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [storyContainerMinHeight, windowHeight],
        Extrapolation.CLAMP,
      ),
      marginTop: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [DEFAULT_HEADER_HEIGHT + insets.top + 8, 0],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [storyContainerMinWidth, windowWidth],
        Extrapolation.CLAMP,
      ),
    };
  });

  const coverAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [storyCoverMinHeight, windowHeight],
        Extrapolation.CLAMP,
      ),
      transform: [{ scale: imageScaleSharedValue.value }],
    };
  });

  useAnimatedReaction(
    () => {
      return storyPlayingSharedValue.value;
    },
    (storyPlayingSharedValue, previousStoryPlayingSharedValue) => {
      if (storyPlayingSharedValue === 1) {
        imageScaleSharedValue.value = withRepeat(withTiming(1.05, { duration: 3000 }), -1, true);
      } else if (
        storyPlayingSharedValue === 0 ||
        (previousStoryPlayingSharedValue &&
          storyPlayingSharedValue < previousStoryPlayingSharedValue)
      ) {
        imageScaleSharedValue.value = withTiming(1);
      }
    },
    [],
  );

  return {
    coverAnimatedStyles,
    storyContainerAnimatedStyles,
  };
}

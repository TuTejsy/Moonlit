import { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';

import { STORY_CONTAINER_MIN_WIDTH, STORY_COVER_MIN_HEIGHT } from '../StoryPlayerScreen.constants';

export function useStoryCoverAnimation(
  storyPlayingSharedValue: SharedValue<number>,
  storyContainerMinHeight: number,
) {
  const insets = useSafeAreaInsets();

  const storyContainerAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [storyContainerMinHeight, SCREEN_HEIGHT],
        Extrapolate.CLAMP,
      ),
      marginTop: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [DEFAULT_HEADER_HEIGHT + insets.top + 8, 0],
        Extrapolate.CLAMP,
      ),
      width: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [STORY_CONTAINER_MIN_WIDTH, SCREEN_WIDTH],
        Extrapolate.CLAMP,
      ),
    };
  });

  const coverAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [STORY_COVER_MIN_HEIGHT, SCREEN_HEIGHT - insets.bottom],
        Extrapolate.CLAMP,
      ),
    };
  });

  return {
    coverAnimatedStyles,
    storyContainerAnimatedStyles,
  };
}

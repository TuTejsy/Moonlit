import { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';

import {
  EXTROPOLATION_CONFIG,
  STORY_CONTAINER_MIN_WIDTH,
  STORY_COVER_MIN_HEIGHT,
} from '../StoryPlayerScreen.constants';

function useStoryCoverAnimation(
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
        EXTROPOLATION_CONFIG,
      ),
      marginTop: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [DEFAULT_HEADER_HEIGHT + insets.top + 16, 0],
        EXTROPOLATION_CONFIG,
      ),
      width: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [STORY_CONTAINER_MIN_WIDTH, SCREEN_WIDTH],
        EXTROPOLATION_CONFIG,
      ),
    };
  });

  const coverAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [STORY_COVER_MIN_HEIGHT, SCREEN_HEIGHT],
        EXTROPOLATION_CONFIG,
      ),
      width: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [STORY_CONTAINER_MIN_WIDTH, SCREEN_WIDTH],
        EXTROPOLATION_CONFIG,
      ),
    };
  });

  return {
    coverAnimatedStyles,
    storyContainerAnimatedStyles,
  };
}

export default useStoryCoverAnimation;

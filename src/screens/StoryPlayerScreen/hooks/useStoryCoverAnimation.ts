import {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  processColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { useTheme } from '@/hooks/theme/useTheme';

import { STORY_CONTAINER_MIN_WIDTH, STORY_COVER_MIN_HEIGHT } from '../StoryPlayerScreen.constants';

function useStoryCoverAnimation(
  storyPlayingSharedValue: SharedValue<number>,
  storyContainerMinHeight: number,
) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const storyContainerAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        storyPlayingSharedValue.value,
        [0, 1],
        [colors.dark_grey, colors.black],
        'RGB',
      ),
      height: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [storyContainerMinHeight, SCREEN_HEIGHT],
        Extrapolate.CLAMP,
      ),
      marginTop: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [DEFAULT_HEADER_HEIGHT + insets.top + 16, 0],
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

  const topGradientAnimatedProps = useAnimatedProps(() => {
    const colorOpacity = interpolate(
      storyPlayingSharedValue.value,
      [0, 0.7, 1],
      [0, 0, 1],
      Extrapolate.CLAMP,
    );

    return {
      colors: [processColor(`rgba(0, 0, 0, ${colorOpacity})`), processColor(`rgba(0, 0, 0, 0)`)],
      locations: [0, 1],
    };
  });

  const bottomGradientAnimatedProps = useAnimatedProps(() => {
    const color = interpolate(storyPlayingSharedValue.value, [0, 1], [26, 0], Extrapolate.CLAMP);

    const animatedLocation = interpolate(
      storyPlayingSharedValue.value,
      [0, 1],
      [0.5319, 0.3723],
      Extrapolate.CLAMP,
    );

    return {
      colors: [
        processColor(`rgba(${color}, ${color}, ${color}, 0)`),
        processColor(`rgba(${color}, ${color}, ${color}, 1)`),
      ],
      locations: [animatedLocation, 1],
    };
  });

  return {
    bottomGradientAnimatedProps,
    coverAnimatedStyles,
    storyContainerAnimatedStyles,
    topGradientAnimatedProps,
  };
}

export default useStoryCoverAnimation;

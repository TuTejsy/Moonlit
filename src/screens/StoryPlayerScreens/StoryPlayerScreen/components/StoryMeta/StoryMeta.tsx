import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';

import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { formatSecondsToMins } from '@/utils/formatters/formatSecondsToMins';

import { makeStyles } from './StoryMeta.styles';
import { useStoryPlayerScreenLayout } from '../../hooks/useStoryPlayerScreenLayout';

interface StoryMetaPropTypes {
  description: string;
  duration: number;
  storyPlayingSharedValue: SharedValue<number>;
  style?: ViewStyle;
}

export function StoryMeta({
  description,
  duration,
  storyPlayingSharedValue,
  style,
}: StoryMetaPropTypes) {
  const storyPlayerScreenLayout = useStoryPlayerScreenLayout()
  const styles = useMakeStyles(makeStyles, storyPlayerScreenLayout);

  const formattedDuration = useMemo(() => formatSecondsToMins(duration), [duration]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.storyMetaContainer, style, animatedTextStyle]}>
      <TextView style={styles.durationTitle}>
        Story duration: <TextView style={styles.durationText}>{formattedDuration} min</TextView>
      </TextView>
      <TextView style={styles.storyText}>{description}</TextView>
    </Animated.View>
  );
}

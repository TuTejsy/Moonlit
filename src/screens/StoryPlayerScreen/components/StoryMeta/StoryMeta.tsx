import React, { useMemo } from 'react';

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { formatSecondsToMins } from '@/utils/formatters/formatSecondsToMins';

import { makeStyles } from './StoryMeta.styles';

interface StoryMetaPropTypes {
  description: string;
  duration: number;
  storyPlayingSharedValue: SharedValue<number>;
}

export function StoryMeta({ description, duration, storyPlayingSharedValue }: StoryMetaPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const formattedDuration = useMemo(() => formatSecondsToMins(duration), [duration]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.storyMetaContainer, animatedTextStyle]}>
      <TextView style={styles.durationTitle}>
        Story duration: <TextView style={styles.durationText}>{formattedDuration} min</TextView>
      </TextView>
      <TextView style={styles.storyText}>{description}</TextView>
    </Animated.View>
  );
}

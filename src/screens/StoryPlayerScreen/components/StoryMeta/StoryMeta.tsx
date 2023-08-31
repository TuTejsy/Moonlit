import React from 'react';
import { View } from 'react-native';

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './StoryMeta.styles';

interface StoryMetaPropTypes {
  description: StorySchema['description'];
  duration: number;
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryMeta({ description, duration, storyPlayingSharedValue }: StoryMetaPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.storyMetaContainer, animatedTextStyle]}>
      <TextView style={styles.durationTitle}>
        Story duration: <TextView style={styles.durationText}>{duration} min</TextView>
      </TextView>
      <TextView style={styles.storyText}>{description}</TextView>
    </Animated.View>
  );
}

export default StoryMeta;

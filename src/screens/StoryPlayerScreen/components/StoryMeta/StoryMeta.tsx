import React from 'react';
import { View } from 'react-native';

import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './StoryMeta.styles';

const CATEGORIES = ['10min', 'Princes', 'Wishes and Magic'];

interface StoryMetaPropTypes {
  description: string;
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryMeta({ description, storyPlayingSharedValue }: StoryMetaPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const animatedCategoriesStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [0, -SCREEN_HEIGHT / 2 + 50],
        Extrapolate.CLAMP,
      ),

      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(storyPlayingSharedValue.value, [0, 1], [24, 40], Extrapolate.CLAMP),

      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <View style={styles.storyMetaContainer}>
      <Animated.View style={[styles.categoriesContainer, animatedCategoriesStyle]}>
        {CATEGORIES.map((category) => (
          <View key={category} style={styles.category}>
            <TextView style={styles.categoryText}>{category}</TextView>
          </View>
        ))}
      </Animated.View>
      <Animated.View style={animatedTextStyle}>
        <TextView style={styles.storyText}>{description}</TextView>
      </Animated.View>
    </View>
  );
}

export default StoryMeta;

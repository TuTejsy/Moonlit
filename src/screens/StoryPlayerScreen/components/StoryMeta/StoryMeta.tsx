import React from 'react';
import { View } from 'react-native';

import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { EXTROPOLATION_CONFIG } from '../../StoryPlayerScreen.constants';

import { makeStyles } from './StoryMeta.styles';

const CATEGORIES = ['10min', 'Princes', 'Wishes and Magic'];

interface StoryMetaPropTypes {
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryMeta({ storyPlayingSharedValue }: StoryMetaPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const animatedCategoriesStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [0, -SCREEN_HEIGHT / 2 + 50],
        EXTROPOLATION_CONFIG,
      ),

      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], EXTROPOLATION_CONFIG),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(storyPlayingSharedValue.value, [0, 1], [24, 40], EXTROPOLATION_CONFIG),

      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], EXTROPOLATION_CONFIG),
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
        <TextView style={styles.storyText}>
          Once upon a time, in a land far, far away, a young girl named Ella lived with her wicked
          stepmother and two stepsisters. One day a royal invitation arrived, a young girl named
          Ella lived with her wicked, announcing a grand ball at the palace...
        </TextView>
      </Animated.View>
    </View>
  );
}

export default StoryMeta;

import React, { useCallback } from 'react';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  withTiming,
  Easing,
  withDecay,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SCREEN_HEIGHT } from '@/constants/layout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { EXTROPOLATION_CONFIG } from '../../StoryPlayerScreen.constants';

import { makeStyles } from './StoryActions.styles';

interface StoryActionsPropTyps {
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryActions({ storyPlayingSharedValue }: StoryActionsPropTyps) {
  const styles = useMakeStyles(makeStyles);

  const areActionsDisabled = storyPlayingSharedValue.value !== 0;

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [24, SCREEN_HEIGHT / 2],
        EXTROPOLATION_CONFIG,
      ),

      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], EXTROPOLATION_CONFIG),
    };
  });

  const handlePlayStoryPress = useCallback(() => {
    storyPlayingSharedValue.value = withTiming(1, {
      easing: Easing.bezier(0.76, 0, 0.84, 0.89),
    });
  }, [storyPlayingSharedValue]);

  return (
    <Animated.View style={[styles.actionsContainer, animatedContainerStyle]}>
      <PressableView disabled={areActionsDisabled} style={styles.button}>
        <Icons.Favorite />
      </PressableView>
      <PressableView disabled={areActionsDisabled} style={styles.button}>
        <Icons.Download />
      </PressableView>
      <PressableView
        disabled={areActionsDisabled}
        style={styles.listenButton}
        onPress={handlePlayStoryPress}
      >
        <Icons.PlaySmall />
        <TextView bold style={styles.listenText}>
          Listen Story
        </TextView>
      </PressableView>
    </Animated.View>
  );
}

export default StoryActions;

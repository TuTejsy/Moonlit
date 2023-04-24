import React, { useCallback } from 'react';

import { BlurView } from '@react-native-community/blur';
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
import { useTheme } from '@/hooks/theme/useTheme';

import { EXTROPOLATION_CONFIG } from '../../StoryPlayerScreen.constants';

import { makeStyles } from './StoryActions.styles';

interface StoryActionsPropTyps {
  isStoryPlaying: SharedValue<boolean>;
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryActions({ isStoryPlaying, storyPlayingSharedValue }: StoryActionsPropTyps) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const areActionsDisabled = isStoryPlaying.value;

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
    storyPlayingSharedValue.value = withTiming(1);
  }, [storyPlayingSharedValue]);

  return (
    <Animated.View style={[styles.actionsContainer, animatedContainerStyle]}>
      <BlurView
        blurAmount={5}
        blurType='light'
        reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
        style={styles.button}
      >
        <Icons.Favorite />
      </BlurView>
      <BlurView
        blurAmount={5}
        blurType='light'
        reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
        style={styles.button}
      >
        <Icons.Download />
      </BlurView>
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

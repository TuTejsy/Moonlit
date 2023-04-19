import React from 'react';
import { View } from 'react-native';

import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { EXTROPOLATION_CONFIG } from '../../StoryPlayerScreen.constants';

import ProgressBar from './components/ProgressBar/ProgressBar';
import { makeStyles } from './StoryPlayer.styles';

interface StoryPlayerPropTypes {
  isStoryPlaying: SharedValue<boolean>;
  storyPlayingSharedValue: SharedValue<number>;
}

const DURATION = 5 * 60;

function StoryPlayer({ isStoryPlaying, storyPlayingSharedValue }: StoryPlayerPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const insets = useSafeAreaInsets();

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [insets.bottom + 60, insets.bottom + 100],
        EXTROPOLATION_CONFIG,
      ),

      opacity: storyPlayingSharedValue.value,
    };
  });

  const animatedActionsContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            storyPlayingSharedValue.value,
            [0, 1],
            [-insets.bottom + 100, 0],
            EXTROPOLATION_CONFIG,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.playerContainer, animatedContainerStyle]}>
      <View style={styles.playerControllsContainer}>
        <Icons.GoBack />
        <Icons.PauseBig />
        <Icons.GoForward />
      </View>

      <ProgressBar duration={DURATION} isStoryPlaying={isStoryPlaying} />

      <Animated.View style={[styles.playerActionsContainer, animatedActionsContainerStyle]}>
        <Icons.Clock />
        <Icons.DownloadRound />
        <Icons.Favorite />
      </Animated.View>
    </Animated.View>
  );
}

export default StoryPlayer;
import React from 'react';
import { View } from 'react-native';

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { useHandleStoryFavorite } from '@/hooks/database/useHandleStoryFavorite';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import ProgressBar from './components/ProgressBar/ProgressBar';
import { makeStyles } from './StoryPlayer.styles';

interface StoryPlayerPropTypes {
  isStoryPlaying: SharedValue<boolean>;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
}

const DURATION = 5 * 60;

function StoryPlayer({ isStoryPlaying, storyId, storyPlayingSharedValue }: StoryPlayerPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const insets = useSafeAreaInsets();

  const { handleStoryFavoritePress, isFavorite } = useHandleStoryFavorite(storyId);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [insets.bottom + 60, insets.bottom + 100],
        Extrapolate.CLAMP,
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
            Extrapolate.CLAMP,
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
        <Icons.Favorite
          inactiveOpacity={0.5}
          isFavorite={isFavorite}
          onPress={handleStoryFavoritePress}
        />
      </Animated.View>
    </Animated.View>
  );
}

export default StoryPlayer;

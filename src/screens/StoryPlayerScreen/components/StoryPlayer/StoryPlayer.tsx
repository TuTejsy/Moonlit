import React, { useCallback } from 'react';
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
  isStoryPlaying: boolean;
  moveStoryPlayingToTime: (playedTime: number) => void;
  pauseStoryPlaying: () => void;
  playedTime: number;
  setPlayedTime: (playedTime: number) => void;
  startStoryPlaying: () => void;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
}

const DURATION = 4 * 60 + 2;

function StoryPlayer({
  isStoryPlaying,
  moveStoryPlayingToTime,
  pauseStoryPlaying,
  playedTime,
  setPlayedTime,
  startStoryPlaying,
  storyId,
  storyPlayingSharedValue,
}: StoryPlayerPropTypes) {
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

  const handleGoBackPress = useCallback(() => {
    moveStoryPlayingToTime(playedTime - 15);
  }, [moveStoryPlayingToTime, playedTime]);

  const handleGoForwardPress = useCallback(() => {
    moveStoryPlayingToTime(playedTime + 15);
  }, [moveStoryPlayingToTime, playedTime]);

  return (
    <Animated.View style={[styles.playerContainer, animatedContainerStyle]}>
      <View style={styles.playerControllsContainer}>
        <Icons.GoBack onPress={handleGoBackPress} />

        {isStoryPlaying ? (
          <Icons.PauseBig onPress={pauseStoryPlaying} />
        ) : (
          <Icons.PlayBig onPress={startStoryPlaying} />
        )}
        <Icons.GoForward onPress={handleGoForwardPress} />
      </View>

      <ProgressBar
        duration={DURATION}
        isStoryPlaying={isStoryPlaying}
        moveToTime={moveStoryPlayingToTime}
        playedTime={playedTime}
        setPlayedTime={setPlayedTime}
      />

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

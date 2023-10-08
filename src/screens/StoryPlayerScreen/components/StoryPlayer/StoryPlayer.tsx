import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useHandleStoryFavorite } from '@/hooks/database/useHandleStoryFavorite';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import Loader from './components/Loader/Loader';
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
  storyName?: string;
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
  storyName,
  storyPlayingSharedValue,
}: StoryPlayerPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const { handleStoryFavoritePress, isFavorite } = useHandleStoryFavorite(storyId);

  const [isStoryLoading, setIsStoryLoading] = useState(true);

  const animatedBlurViewContainerStyle = useAnimatedStyle(() => {
    return {
      display: storyPlayingSharedValue.value === 0 ? 'none' : 'flex',
      opacity: storyPlayingSharedValue.value,
    };
  });

  const animatedPlayerContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [insets.bottom + 60, insets.bottom + 100],
        Extrapolate.CLAMP,
      ),
      display: storyPlayingSharedValue.value === 0 ? 'none' : 'flex',
      opacity: storyPlayingSharedValue.value,
    };
  });

  const animatedActionsContainerStyle = useAnimatedStyle(() => {
    return {
      display: storyPlayingSharedValue.value === 0 ? 'none' : 'flex',
      opacity: storyPlayingSharedValue.value,
      transform: [
        {
          translateY: interpolate(
            storyPlayingSharedValue.value,
            [0, 1],
            [30, 0],
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
    <>
      <Animated.View
        pointerEvents='none'
        style={[styles.blurViewContainer, animatedBlurViewContainerStyle]}
      >
        <BlurView
          blurAmount={3}
          blurType='dark'
          pointerEvents='none'
          reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
          style={styles.blurView}
        />
      </Animated.View>

      {!isStoryLoading && (
        <Animated.View style={[styles.playerActionsContainer, animatedActionsContainerStyle]}>
          <Icons.FavoriteBig
            inactiveOpacity={0.5}
            isFavorite={isFavorite}
            onPress={handleStoryFavoritePress}
          />

          <Icons.DownloadRound />
        </Animated.View>
      )}

      <Animated.View style={[styles.playerContainer, animatedPlayerContainerStyle]}>
        <TextView numberOfLines={2} style={styles.title} type='bold'>
          {storyName}
        </TextView>

        {isStoryLoading ? (
          <Loader />
        ) : (
          <>
            <ProgressBar
              duration={DURATION}
              isStoryPlaying={isStoryPlaying}
              moveToTime={moveStoryPlayingToTime}
              playedTime={playedTime}
              setPlayedTime={setPlayedTime}
            />

            <View style={styles.playerControllsContainer}>
              <PressableView onPress={handleGoBackPress}>
                <Icons.GoBack />
              </PressableView>

              {isStoryPlaying ? (
                <Icons.PauseBig onPress={pauseStoryPlaying} />
              ) : (
                <Icons.PlayBig onPress={startStoryPlaying} />
              )}

              <PressableView onPress={handleGoForwardPress}>
                <Icons.GoForward />
              </PressableView>
            </View>
          </>
        )}
      </Animated.View>
    </>
  );
}

export default StoryPlayer;

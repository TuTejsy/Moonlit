import React, { useCallback } from 'react';
import { View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
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
import { MOVE_TO_PROPS } from '@/hooks/useStoryPlayer/useStoryPlayers.types';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { getHitSlop } from '@/utils/getHitSlop';

import { Loader } from './components/Loader/Loader';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { makeStyles } from './StoryPlayer.styles';

interface StoryPlayerPropTypes {
  audioRecordingDuration: number;
  isStoryLoading: boolean;
  isStoryPlaying: boolean;
  moveStoryPlayingToTime: (props: MOVE_TO_PROPS) => void;
  pauseStoryPlaying: () => void;
  playedTime: number;
  startStoryPlaying: () => void;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
  tab: TabEventType;
  storyName?: string;
}

export function StoryPlayer({
  audioRecordingDuration,
  isStoryLoading,
  isStoryPlaying,
  moveStoryPlayingToTime,
  pauseStoryPlaying,
  playedTime,
  startStoryPlaying,
  storyId,
  storyName,
  storyPlayingSharedValue,
  tab,
}: StoryPlayerPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const { handleStoryFavoritePress, isFavorite } = useHandleStoryFavorite({
    source: SOURCE.TALE_PLAYER,
    storyId,
    storyName: storyName ?? '',
    tab,
  });

  const animatedBlurViewContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: storyPlayingSharedValue.value,
    };
  });

  const animatedPlayerContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [insets.bottom + 60, insets.bottom + 100],
        Extrapolation.CLAMP,
      ),
      opacity: storyPlayingSharedValue.value,
    };
  });

  const animatedActionsContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: storyPlayingSharedValue.value,
      transform: [
        {
          translateY: interpolate(
            storyPlayingSharedValue.value,
            [0, 1],
            [30, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const handleGoBackPress = useCallback(() => {
    moveStoryPlayingToTime({ moveGap: -15 });
  }, [moveStoryPlayingToTime]);

  const handleGoForwardPress = useCallback(() => {
    moveStoryPlayingToTime({ moveGap: +15 });
  }, [moveStoryPlayingToTime]);

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
          <PressableView hitSlop={getHitSlop(10)} onPress={handleStoryFavoritePress}>
            <Icons.FavoriteBig inactiveOpacity={0.5} isFavorite={isFavorite} />
          </PressableView>
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
              duration={audioRecordingDuration}
              isStoryPlaying={isStoryPlaying}
              moveToTime={moveStoryPlayingToTime}
              playedTime={playedTime}
            />

            <View style={styles.playerControllsContainer}>
              <TouchableOpacity onPress={handleGoBackPress}>
                <Icons.GoBack />
              </TouchableOpacity>

              {isStoryPlaying ? (
                <Icons.PauseBig onPress={pauseStoryPlaying} />
              ) : (
                <Icons.PlayBig onPress={startStoryPlaying} />
              )}

              <TouchableOpacity onPress={handleGoForwardPress}>
                <Icons.GoForward />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>
    </>
  );
}

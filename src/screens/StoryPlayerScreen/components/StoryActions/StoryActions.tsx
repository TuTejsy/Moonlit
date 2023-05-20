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
  Extrapolate,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SCREEN_HEIGHT } from '@/constants/layout';
import { useHandleStoryFavorite } from '@/hooks/database/useHandleStoryFavorite';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './StoryActions.styles';

interface StoryActionsPropTyps {
  isStoryPlaying: SharedValue<boolean>;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
}

function StoryActions({ isStoryPlaying, storyId, storyPlayingSharedValue }: StoryActionsPropTyps) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const areActionsDisabled = isStoryPlaying.value;

  const { handleStoryFavoritePress, isFavorite } = useHandleStoryFavorite(storyId);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        storyPlayingSharedValue.value,
        [0, 1],
        [24, SCREEN_HEIGHT / 2],
        Extrapolate.CLAMP,
      ),

      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  const handlePlayStoryPress = useCallback(() => {
    storyPlayingSharedValue.value = withTiming(1);
  }, [storyPlayingSharedValue]);

  return (
    <Animated.View style={[styles.actionsContainer, animatedContainerStyle]}>
      <PressableView onPress={handleStoryFavoritePress}>
        <BlurView
          blurAmount={5}
          blurType='light'
          reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
          style={styles.button}
        >
          <Icons.Favorite isFavorite={isFavorite} />
        </BlurView>
      </PressableView>
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
        <TextView style={styles.listenText} type='bold'>
          Listen Story
        </TextView>
      </PressableView>
    </Animated.View>
  );
}

export default StoryActions;

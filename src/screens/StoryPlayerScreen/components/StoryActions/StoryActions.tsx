import React from 'react';
import { View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useHandleStoryFavorite } from '@/hooks/database/useHandleStoryFavorite';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './StoryActions.styles';

interface StoryActionsPropTyps {
  startStoryPlaying: () => void;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
  storyTitle: string;
}

export const StoryActions = ({
  startStoryPlaying,
  storyId,
  storyPlayingSharedValue,
  storyTitle,
}: StoryActionsPropTyps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const { handleStoryFavoritePress, isFavorite } = useHandleStoryFavorite(storyId);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      display: storyPlayingSharedValue.value === 1 ? 'none' : 'flex',
      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.actionsContainer, animatedContainerStyle]}>
      <TextView style={styles.title} type='bold'>
        {storyTitle}
      </TextView>

      <View style={styles.actions}>
        <PressableView style={styles.listenButton} onPress={startStoryPlaying}>
          <Icons.PlaySmall style={styles.playIcon} />
          <TextView style={styles.listenText} type='bold'>
            Listen Story
          </TextView>
        </PressableView>

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
      </View>
    </Animated.View>
  );
};

import React from 'react';
import { View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { IS_IOS } from '@/constants/common';
import { useHandleStoryFavorite } from '@/hooks/database/useHandleStoryFavorite';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';

import { makeStyles } from './StoryActions.styles';

interface StoryActionsPropTyps {
  startStoryPlaying: () => void;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
  storyTitle: string;
  tab: TabEventType;
}

export const StoryActions = ({
  startStoryPlaying,
  storyId,
  storyPlayingSharedValue,
  storyTitle,
  tab,
}: StoryActionsPropTyps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const { handleStoryFavoritePress, isFavorite } = useHandleStoryFavorite({
    source: SOURCE.TALE_PREVIEW,
    storyId,
    storyName: storyTitle,
    tab,
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(storyPlayingSharedValue.value, [0, 1], [1, 0], Extrapolation.CLAMP),
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

        <PressableView style={styles.button} onPress={handleStoryFavoritePress}>
          {IS_IOS && (
            <BlurView
              blurAmount={5}
              blurType='light'
              reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
              style={styles.buttonBlurView}
            />
          )}
          <Icons.Favorite isFavorite={isFavorite} />
        </PressableView>
      </View>
    </Animated.View>
  );
};

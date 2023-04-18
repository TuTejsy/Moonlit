import React, { useCallback } from 'react';
import { View } from 'react-native';

import { noop } from 'lodash';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import Animated, { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import StoryActions from './components/StoryActions/StoryActions';
import StoryMeta from './components/StoryMeta/StoryMeta';
import StoryPlayer from './components/StoryPlayer/StoryPlayer';
import VoiceSettingsButton from './components/VoiceSettingsButton/VoiceSettingsButton';
import useStoryCoverAnimation from './hooks/useStoryCoverAnimation';
import useStoryCoverGestureHandler from './hooks/useStoryCoverGestureHandler';
import storyImage from './images/story/story.png';
import { makeStyles } from './StoryPlayerScreen.styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent<
  Omit<LinearGradientProps, 'colors'>
>(LinearGradient as any);

function StoryPlayerScreen() {
  const insets = useSafeAreaInsets();
  const storyContainerMinHeight =
    WINDOW_HEIGHT - DEFAULT_HEADER_HEIGHT - insets.top - insets.bottom - 90;

  const styles = useMakeStyles(makeStyles, { storyContainerMinHeight });

  const storyPlayingSharedValue = useSharedValue(0);

  const isStoryPlaying = useDerivedValue(() => storyPlayingSharedValue.value > 0);

  const { coverAnimatedStyles, gradientAnimatedProps, storyContainerAnimatedStyles } =
    useStoryCoverAnimation(storyPlayingSharedValue, storyContainerMinHeight);

  const gesture = useStoryCoverGestureHandler(storyPlayingSharedValue);

  const handleGoBack = useCallback(() => {
    noop();
  }, []);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        renderRight={<Icons.Share />}
        style={styles.header}
        subtitle='Wishes and Magic'
        title='Little Red Riding Hood'
        onGoBack={handleGoBack}
      />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.storyContainer, storyContainerAnimatedStyles]}>
          <View style={styles.imageContainer}>
            <Animated.Image
              resizeMode='cover'
              source={storyImage}
              style={[styles.cover, coverAnimatedStyles]}
            />

            <AnimatedLinearGradient
              angle={180}
              animatedProps={gradientAnimatedProps}
              pointerEvents='none'
              style={styles.gradient}
            />
            <StoryActions
              isStoryPlaying={isStoryPlaying}
              storyPlayingSharedValue={storyPlayingSharedValue}
            />
          </View>
          <StoryMeta storyPlayingSharedValue={storyPlayingSharedValue} />
        </Animated.View>
      </GestureDetector>

      <StoryPlayer
        isStoryPlaying={isStoryPlaying}
        storyPlayingSharedValue={storyPlayingSharedValue}
      />
      <VoiceSettingsButton />
    </View>
  );
}

export default StoryPlayerScreen;

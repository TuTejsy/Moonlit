import React, { useCallback } from 'react';
import { View } from 'react-native';

import { noop } from 'lodash';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import StoryActions from './components/StoryActions/StoryActions';
import StoryMeta from './components/StoryMeta/StoryMeta';
import VoiceSettingsButton from './components/VoiceSettingsButton/VoiceSettingsButton';
import useStoryCoverAnimation from './hooks/useStoryCoverAnimation';
import useStoryCoverGestureHandler from './hooks/useStoryCoverGestureHandler';
import storyImage from './images/story/story.png';
import { makeStyles } from './StoryPlayerScreen.styles';

function StoryPlayerScreen() {
  const insets = useSafeAreaInsets();
  const storyContainerMinHeight =
    WINDOW_HEIGHT - DEFAULT_HEADER_HEIGHT - insets.top - insets.bottom - 90;

  const styles = useMakeStyles(makeStyles, { storyContainerMinHeight });

  const storyPlayingSharedValue = useSharedValue(0);

  const { coverAnimatedStyles, storyContainerAnimatedStyles } = useStoryCoverAnimation(
    storyPlayingSharedValue,
    storyContainerMinHeight,
  );

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
            <StoryActions storyPlayingSharedValue={storyPlayingSharedValue} />
          </View>
          <StoryMeta storyPlayingSharedValue={storyPlayingSharedValue} />
        </Animated.View>
      </GestureDetector>

      <VoiceSettingsButton />
    </View>
  );
}

export default StoryPlayerScreen;

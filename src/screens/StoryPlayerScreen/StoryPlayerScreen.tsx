import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureDetector } from 'react-native-gesture-handler';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import Animated, { runOnJS, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import useStory from '@/hooks/database/useStory';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

import StoryActions from './components/StoryActions/StoryActions';
import StoryMeta from './components/StoryMeta/StoryMeta';
import StoryPlayer from './components/StoryPlayer/StoryPlayer';
import VoiceSettingsModal from './components/VoiceSettingsModal/VoiceSettingsModal';
import useStoryCoverAnimation from './hooks/useStoryCoverAnimation';
import useStoryCoverGestureHandler from './hooks/useStoryCoverGestureHandler';
import { useStoryPlayer } from './hooks/useStoryPlayer';
import { useStoryPlayNotify } from './hooks/useStoryPlayNotify';
import { makeStyles } from './StoryPlayerScreen.styles';
import { NavigationType, RouteType } from './StoryPlayerScreen.types';

const AnimatedLinearGradient = Animated.createAnimatedComponent<
  Omit<LinearGradientProps, 'colors'>
>(LinearGradient as any);

function StoryPlayerScreen() {
  const insets = useSafeAreaInsets();
  const storyContainerMinHeight =
    WINDOW_HEIGHT - DEFAULT_HEADER_HEIGHT - insets.top - insets.bottom - 90;

  const stylesContext = useMemo(() => ({ storyContainerMinHeight }), [storyContainerMinHeight]);

  const styles = useMakeStyles(makeStyles, stylesContext);
  const { colors } = useTheme();

  const [isAnimatedGradientLoaded, setIsAnimatedGradientLoaded] = useState(false);

  const {
    isStoryPlaying,
    isStoryPlayingSharedValue,
    moveStoryPlayingToTime,
    pauseStoryPlaying,
    playedTime,
    setPlayedTime,
    startStoryPlaying,
    stopStoryPlaying,
    storyPlayingSharedValue,
  } = useStoryPlayer();

  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteType>();
  const { storyId } = route.params;

  const [story, storyVersion] = useStory(storyId, ['full_cover_url', 'name', 'description']);

  const coverURL = useMemo(
    () => (story ? formatServerFileURLToAbsolutePath(story.full_cover_url) : ''),
    [story?.full_cover_url],
  );

  const {
    bottomGradientAnimatedProps,
    coverAnimatedStyles,
    storyContainerAnimatedStyles,
    topGradientAnimatedProps,
  } = useStoryCoverAnimation(storyPlayingSharedValue, storyContainerMinHeight);

  const gesture = useStoryCoverGestureHandler(storyPlayingSharedValue);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAnimatedGradientLoaded = useCallback(() => {
    setIsAnimatedGradientLoaded(true);
  }, []);

  useStoryPlayNotify(storyId);

  useAnimatedReaction(
    () => {
      return isStoryPlayingSharedValue.value;
    },
    (isStoryPlayingSharedValue, previousIsStoryPlayingSharedValue) => {
      if (isStoryPlayingSharedValue !== previousIsStoryPlayingSharedValue) {
        if (!isStoryPlayingSharedValue) {
          runOnJS(stopStoryPlaying);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (isStoryPlaying) {
      storyPlayingSharedValue.value = withTiming(1);
    }
  });

  return (
    <LinearGradient
      angle={180}
      colors={[colors.opacityGreen(0.3), colors.opacityGreen(0)]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <ScreenHeader
        renderRight={<Icons.Share />}
        style={styles.header}
        subtitle='Wishes and Magic'
        title={story?.name}
        onGoBack={handleGoBack}
      />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.storyContainer, storyContainerAnimatedStyles]}>
          <View style={styles.imageContainer}>
            <Animated.Image
              resizeMode='cover'
              source={{ uri: coverURL }}
              style={[styles.cover, coverAnimatedStyles]}
            />

            <AnimatedLinearGradient
              angle={180}
              animatedProps={topGradientAnimatedProps}
              pointerEvents='none'
              style={styles.topGradient}
            />
            <AnimatedLinearGradient
              angle={180}
              animatedProps={bottomGradientAnimatedProps}
              pointerEvents='none'
              style={styles.bottomGradient}
              onLayout={handleAnimatedGradientLoaded}
            />
            {!isAnimatedGradientLoaded && (
              <LinearGradient
                angle={180}
                colors={['rgba(26,26, 26, 0)', 'rgba(26,26, 26, 1)']}
                locations={[0.531, 1]}
                pointerEvents='none'
                style={styles.bottomGradient}
              />
            )}

            <StoryActions
              isStoryPlayingSharedValue={isStoryPlayingSharedValue}
              startStoryPlaying={startStoryPlaying}
              storyId={storyId}
              storyPlayingSharedValue={storyPlayingSharedValue}
            />
          </View>
          <StoryMeta
            description={story?.description ?? ''}
            storyPlayingSharedValue={storyPlayingSharedValue}
          />
        </Animated.View>
      </GestureDetector>

      <StoryPlayer
        isStoryPlaying={isStoryPlaying}
        moveStoryPlayingToTime={moveStoryPlayingToTime}
        pauseStoryPlaying={pauseStoryPlaying}
        playedTime={playedTime}
        setPlayedTime={setPlayedTime}
        startStoryPlaying={startStoryPlaying}
        storyId={storyId}
        storyPlayingSharedValue={storyPlayingSharedValue}
      />

      <VoiceSettingsModal />
    </LinearGradient>
  );
}

export default StoryPlayerScreen;

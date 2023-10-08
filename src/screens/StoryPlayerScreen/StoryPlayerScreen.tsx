import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { runOnJS, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import useStory from '@/hooks/database/useStory';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useStoryPlayer } from '@/hooks/useStoryPlayer';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

import StoryActions from './components/StoryActions/StoryActions';
import StoryMeta from './components/StoryMeta/StoryMeta';
import StoryPlayer from './components/StoryPlayer/StoryPlayer';
import VoiceSettingsModal from './components/VoiceSettingsModal/VoiceSettingsModal';
import { useStoryAudioRecordingsUpdate } from './hooks/useStoryAudioRecordingsUpdate';
import useStoryCoverAnimation from './hooks/useStoryCoverAnimation';
import useStoryCoverGestureHandler from './hooks/useStoryCoverGestureHandler';
import { useStoryPlayNotify } from './hooks/useStoryPlayNotify';
import { makeStyles } from './StoryPlayerScreen.styles';
import { NavigationType, RouteType } from './StoryPlayerScreen.types';

function StoryPlayerScreen() {
  const insets = useSafeAreaInsets();
  const storyContainerMinHeight =
    WINDOW_HEIGHT - DEFAULT_HEADER_HEIGHT - insets.top - insets.bottom - 102;

  const { colors } = useTheme();

  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteType>();
  const { storyId } = route.params;

  const [story, storyVersion] = useStory(storyId, [
    'full_cover_url',
    'name',
    'description',
    'small_preview_cover_cached_name',
  ]);

  const [areRecordingsLoading] = useStoryAudioRecordingsUpdate(storyId);

  const coverURL = useMemo(
    () => (story ? formatServerFileURLToAbsolutePath(story.full_cover_url) : ''),
    [story],
  );

  const gradientColor = useMemo(
    () => story?.colors?.primary ?? colors.imagePurple,
    [colors.imagePurple, story?.colors?.primary],
  );

  const stylesContext = useMemo(
    () => ({ gradientColor, storyContainerMinHeight }),
    [gradientColor, storyContainerMinHeight],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);

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
  } = useStoryPlayer(story?.name ?? '', coverURL);

  const { coverAnimatedStyles, storyContainerAnimatedStyles } = useStoryCoverAnimation(
    storyPlayingSharedValue,
    storyContainerMinHeight,
  );

  const gesture = useStoryCoverGestureHandler(storyPlayingSharedValue, pauseStoryPlaying);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useStoryPlayNotify(storyId);

  useAnimatedReaction(
    () => {
      return isStoryPlayingSharedValue.value;
    },
    (isStoryPlayingSharedValue, previousIsStoryPlayingSharedValue) => {
      if (isStoryPlayingSharedValue !== previousIsStoryPlayingSharedValue) {
        if (!isStoryPlayingSharedValue) {
          runOnJS(pauseStoryPlaying);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (isStoryPlaying) {
      storyPlayingSharedValue.value = withTiming(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStoryPlaying]);

  useEffect(
    () => {
      return () => {
        stopStoryPlaying();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <LinearGradient
      angle={180}
      colors={[gradientColor, colors.black]}
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

            <LinearGradient
              angle={180}
              colors={[colors.opacityBlack(0), gradientColor]}
              locations={[0, 1]}
              pointerEvents='none'
              style={styles.bottomGradient}
            />

            <StoryActions
              startStoryPlaying={startStoryPlaying}
              storyId={storyId}
              storyPlayingSharedValue={storyPlayingSharedValue}
              storyTitle={story?.name ?? ''}
            />
          </View>
          <StoryMeta
            duration={4}
            storyPlayingSharedValue={storyPlayingSharedValue}
            description={
              'Once upon a time, in a land far, far away, a young girl named Ella lived with her wicked stepmother and two stepsisters. One day, a royal invitation arrived, announcing a grand ball at the palace...' ??
              story?.description ??
              ''
            }
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
        storyName={story?.name}
        storyPlayingSharedValue={storyPlayingSharedValue}
      />

      <VoiceSettingsModal storyColor={gradientColor} storyId={storyId} />
    </LinearGradient>
  );
}

export default StoryPlayerScreen;

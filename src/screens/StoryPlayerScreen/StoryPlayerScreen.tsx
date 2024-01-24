import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Share } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { runOnJS, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { MOONLIT_APP_LINK, SANDBOX } from '@/constants/common';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { CATEGORY_IDS, CATEGORY_NAMES } from '@/constants/stories';
import { useSelectedAudioRecording } from '@/hooks/database/useSelectedAudioRecording';
import { useStory } from '@/hooks/database/useStory';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useStoryPlayer } from '@/hooks/useStoryPlayer/useStoryPlayer';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { getHitSlop } from '@/utils/getHitSlop';

import { StoryActions } from './components/StoryActions/StoryActions';
import { StoryMeta } from './components/StoryMeta/StoryMeta';
import { StoryPlayer } from './components/StoryPlayer/StoryPlayer';
import { VoiceSettingsModal } from './components/VoiceSettingsModal/VoiceSettingsModal';
import { useStoryAudioRecordingsUpdate } from './hooks/useStoryAudioRecordingsUpdate';
import { useStoryCoverAnimation } from './hooks/useStoryCoverAnimation';
import { useStoryCoverGestureHandler } from './hooks/useStoryCoverGestureHandler';
import { makeStyles } from './StoryPlayerScreen.styles';

export const StoryPlayerScreen = () => {
  const insets = useSafeAreaInsets();
  const storyContainerMinHeight =
    WINDOW_HEIGHT - DEFAULT_HEADER_HEIGHT - insets.top - insets.bottom - 102;

  const { colors } = useTheme();

  const navigation = useAppNavigation<RootRoutes.STORY_PLAYER>();
  const route = useAppRoute<RootRoutes.STORY_PLAYER>();
  const { storyId } = route.params;

  const [story, storyVersion] = useStory(storyId, [
    'full_cover_url',
    'name',
    'description',
    'small_cover_cached_name',
  ]);

  const { selectedAudioRecording, selectedAudioRecordingVersion, setSelectedAudioRecording } =
    useSelectedAudioRecording(storyId);

  const [areRecordingsLoading] = useStoryAudioRecordingsUpdate(storyId);

  const coverURL = useMemo(
    () => (story ? `file://${SANDBOX.DOCUMENTS.FULL_COVER}/${story.full_cover_cached_name}` : ''),
    [story],
  );

  const smallCoverURL = useMemo(
    () =>
      story ? `file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${story.small_cover_cached_name}` : '',
    [story],
  );

  const storyCategories = useMemo(
    () => story?.category_ids.map((categoryId: CATEGORY_IDS) => CATEGORY_NAMES[categoryId]),
    [story?.category_ids],
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
    isStoryLoading,
    isStoryPlaying,
    isStoryPlayingSharedValue,
    moveStoryPlayingToTime,
    pauseStoryPlaying,
    playedTime,
    startStoryPlaying,
    storyPlayingSharedValue,
  } = useStoryPlayer({
    audioRecordingId: selectedAudioRecording?.id,
    coverPath: smallCoverURL,
    storyId,
    title: story?.name ?? '',
  });

  const { coverAnimatedStyles, storyContainerAnimatedStyles } = useStoryCoverAnimation(
    storyPlayingSharedValue,
    storyContainerMinHeight,
  );

  const gesture = useStoryCoverGestureHandler(storyPlayingSharedValue, pauseStoryPlaying);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSharePress = useCallback(() => {
    Share.share({
      message: `Explore ${story?.name} and more amazing stories in the Moonlit app. ${MOONLIT_APP_LINK}`,
      url: smallCoverURL,
    });
  }, [story?.name, smallCoverURL]);

  const handleSelectAudioRecording = useCallback(
    (audioRecordingId: number) => {
      setSelectedAudioRecording(audioRecordingId);

      if (isStoryPlaying) {
        pauseStoryPlaying();
      }
    },
    [pauseStoryPlaying, setSelectedAudioRecording, isStoryPlaying],
  );

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

  return (
    <LinearGradient
      angle={180}
      colors={[gradientColor, colors.black]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <ScreenHeader
        style={styles.header}
        subtitle={storyCategories?.[0]}
        title={story?.name}
        renderRight={
          <PressableView hitSlop={getHitSlop(10)} onPress={handleSharePress}>
            <Icons.Share />
          </PressableView>
        }
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
            <LinearGradient
              angle={180}
              colors={[colors.opacityBlack(0), colors.opacityBlack(0.4)]}
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
            description={story?.description_large ?? ''}
            duration={selectedAudioRecording?.duration ?? 0}
            storyPlayingSharedValue={storyPlayingSharedValue}
          />
        </Animated.View>
      </GestureDetector>

      <StoryPlayer
        audioRecordingDuration={selectedAudioRecording?.duration || 0}
        isStoryLoading={isStoryLoading}
        isStoryPlaying={isStoryPlaying}
        moveStoryPlayingToTime={moveStoryPlayingToTime}
        pauseStoryPlaying={pauseStoryPlaying}
        playedTime={playedTime}
        startStoryPlaying={startStoryPlaying}
        storyId={storyId}
        storyName={story?.name}
        storyPlayingSharedValue={storyPlayingSharedValue}
      />

      <VoiceSettingsModal
        selectedAudioRecordingId={selectedAudioRecording?.id}
        selectedAudioRecordingName={selectedAudioRecording?.voice_name}
        selectedAudioRecordingVersion={selectedAudioRecordingVersion}
        selectedVoiceCoverUrl={selectedAudioRecording?.cover_url}
        storyColor={gradientColor}
        storyId={storyId}
        onSelectAudioRecording={handleSelectAudioRecording}
      />
    </LinearGradient>
  );
};

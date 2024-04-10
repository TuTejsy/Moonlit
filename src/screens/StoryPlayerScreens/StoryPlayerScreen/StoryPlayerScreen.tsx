import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Share } from 'react-native';

import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { runOnJS, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { IS_IOS, MOONLIT_IOS_APP_LINK, SANDBOX } from '@/constants/common';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { CATEGORY_IDS, MAP_CATEGORY_ID_TO_NAMES } from '@/constants/stories';
import { useSelectedAudioRecording } from '@/hooks/database/useSelectedAudioRecording';
import { useStory } from '@/hooks/database/useStory';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useStoryPlayer } from '@/hooks/useStoryPlayer/useStoryPlayer';
import { ShareIOS } from '@/native_modules/MNTShare/NativeShareManager';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { getHitSlop } from '@/utils/getHitSlop';
import { dh } from '@/utils/sizes';

import { StoryActions } from './components/StoryActions/StoryActions';
import { StoryMeta } from './components/StoryMeta/StoryMeta';
import { StoryPlayer } from './components/StoryPlayer/StoryPlayer';
import { VoiceSettingsButton } from './components/VoiceSettingsButton/VoiceSettingsButton';
import {
  BUTTON_BOTTOM_PADDING,
  BUTTON_HEIGHT,
} from './components/VoiceSettingsButton/VoiceSettingsButton.constants';
import { useStoryAudioRecordingsUpdate } from './hooks/useStoryAudioRecordingsUpdate';
import { useStoryCoverAnimation } from './hooks/useStoryCoverAnimation';
import { useStoryCoverGestureHandler } from './hooks/useStoryCoverGestureHandler';
import { makeStyles } from './StoryPlayerScreen.styles';

export const StoryPlayerScreen = () => {
  const insets = useSafeAreaInsets();
  const storyContainerMinHeight =
    WINDOW_HEIGHT -
    DEFAULT_HEADER_HEIGHT -
    insets.top -
    insets.bottom -
    BUTTON_HEIGHT -
    BUTTON_BOTTOM_PADDING -
    dh(24);

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
    () =>
      story?.category_ids.map((categoryId: CATEGORY_IDS) => MAP_CATEGORY_ID_TO_NAMES[categoryId]),
    [story?.category_ids],
  );

  const gradientColor = useMemo(
    () => story?.colors?.primary ?? colors.imagePurple,
    [colors.imagePurple, story?.colors?.primary],
  );

  const backgroundColor = useMemo(() => convertHEXtoRGBA(gradientColor, 0.3), [gradientColor]);

  const stylesContext = useMemo(
    () => ({ gradientColor, storyContainerMinHeight }),
    [gradientColor, storyContainerMinHeight],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);

  const {
    isCurrentStoryPlaying,
    isStoryLoading,
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
    if (IS_IOS) {
      ShareIOS?.share({
        message: `Explore ${story?.name} and more amazing stories in the Moonlit app. ${MOONLIT_IOS_APP_LINK}`,
        subtitle: 'and more amazing stories in the Moonlit app.',
        title: `Explore ${story?.name}`,
        url: smallCoverURL,
      });
    } else {
      Share.share(
        {
          message: `Explore ${story?.name} and more amazing stories in the Moonlit app. ${MOONLIT_IOS_APP_LINK}`,
        },
        {
          dialogTitle: `Explore ${story?.name}`,
        },
      );
    }
  }, [smallCoverURL, story?.name]);

  const handleVoiceSettingsPress = useCallback(() => {
    if (selectedAudioRecording) {
      navigation.navigate(RootRoutes.VOICE_SETTINGS_MODAL, {
        onSelectAudioRecording: (audioRecordingId: number) => {
          setSelectedAudioRecording(audioRecordingId);
          pauseStoryPlaying();
        },
        selectedAudioRecordingId: selectedAudioRecording.id,
        storyColor: gradientColor,
        storyId,
      });
    }
  }, [
    gradientColor,
    navigation,
    pauseStoryPlaying,
    selectedAudioRecording,
    setSelectedAudioRecording,
    storyId,
  ]);

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
    if (isCurrentStoryPlaying) {
      storyPlayingSharedValue.value = withTiming(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentStoryPlaying]);

  return (
    <LinearGradient
      angle={180}
      colors={[backgroundColor, colors.black]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <ScreenHeader
        style={styles.header}
        subtitle={storyCategories?.[0]}
        title={story?.name}
        renderRight={
          <TouchableOpacity hitSlop={getHitSlop(10)} onPress={handleSharePress}>
            <Icons.Share />
          </TouchableOpacity>
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
              locations={[0.5, 1]}
              pointerEvents='none'
              style={styles.bottomGradient}
            />

            <LinearGradient
              angle={180}
              colors={[colors.opacityBlack(0), colors.opacityBlack(0.4)]}
              locations={[0.5, 1]}
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
            style={styles.storyMeta}
          />
        </Animated.View>
      </GestureDetector>

      <StoryPlayer
        audioRecordingDuration={selectedAudioRecording?.duration || 0}
        isStoryLoading={isStoryLoading}
        isStoryPlaying={isCurrentStoryPlaying}
        moveStoryPlayingToTime={moveStoryPlayingToTime}
        pauseStoryPlaying={pauseStoryPlaying}
        playedTime={playedTime}
        startStoryPlaying={startStoryPlaying}
        storyId={storyId}
        storyName={story?.name}
        storyPlayingSharedValue={storyPlayingSharedValue}
      />

      <VoiceSettingsButton
        storyColor={gradientColor}
        voiceName={selectedAudioRecording?.voice_name}
        voiceCoverUrl={
          selectedAudioRecording &&
          formatServerFileURLToAbsolutePath(selectedAudioRecording.cover_url)
        }
        onPress={handleVoiceSettingsPress}
      />
    </LinearGradient>
  );
};

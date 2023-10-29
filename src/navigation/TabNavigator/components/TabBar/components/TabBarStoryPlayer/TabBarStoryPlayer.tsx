import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Image, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { SANDBOX } from '@/constants/common';
import { useSelectedAudioRecording } from '@/hooks/database/useSelectedAudioRecording';
import { useStory } from '@/hooks/database/useStory';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useStoryPlayer } from '@/hooks/useStoryPlayer/useStoryPlayer';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { getHitSlop } from '@/utils/getHitSlop';

import { makeStyles } from './TabBarStoryPlayer.styles';

interface TabBarStoryPlayerProps {
  storyId: number;
}

export const TabBarStoryPlayer = memo(({ storyId }: TabBarStoryPlayerProps) => {
  const { colors } = useTheme();

  const [story, _storyVersion] = useStory(storyId, ['name', 'small_cover_cached_name']);

  const { _selectedAudioRecordingVersion, selectedAudioRecording } =
    useSelectedAudioRecording(storyId);

  const storyColor = useMemo(() => {
    return story?.colors?.primary ?? colors.imagePurple;
  }, [colors.imagePurple, story?.colors?.primary]);

  const stylesContext = useMemo(
    () => ({
      storyColor,
    }),
    [storyColor],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);

  const coverURL = useMemo(
    () => (story ? `file://${SANDBOX.DOCUMENTS.FULL_COVER}/${story.full_cover_cached_name}` : ''),
    [story],
  );

  const { isStoryPlaying, pauseStoryPlaying, playedTime, startStoryPlaying } = useStoryPlayer({
    audioRecordingId: selectedAudioRecording?.id,
    coverPath: coverURL,
    storyId,
    title: story?.name ?? '',
  });

  const progressSharedValue = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressSharedValue.value}%`,
  }));

  const handlePreviewPress = useCallback(() => {
    navigationService.navigate(RootRoutes.STORY_PLAYER, {
      storyId,
    });
  }, [storyId]);

  useEffect(() => {
    if (!selectedAudioRecording) {
      return;
    }

    progressSharedValue.value = (playedTime / selectedAudioRecording.duration) * 100;

    if (isStoryPlaying) {
      progressSharedValue.value = withTiming(100, {
        duration: (selectedAudioRecording.duration - playedTime) * 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStoryPlaying, playedTime, selectedAudioRecording?.duration]);

  if (!story) {
    return null;
  }

  return (
    <BlurView
      blurAmount={5}
      blurType='light'
      reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
      style={styles.blurView}
    >
      <PressableView style={styles.container} onPress={handlePreviewPress}>
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{
            uri: `file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${story.small_cover_cached_name}`,
          }}
        />
        <TextView style={styles.title} type='medium'>
          {story.name}
        </TextView>

        {isStoryPlaying ? (
          <PressableView hitSlop={getHitSlop(10)} onPress={pauseStoryPlaying}>
            <Icons.PauseSmall fillCirlce={colors.opacityWhite(0.1)} />
          </PressableView>
        ) : (
          <PressableView hitSlop={getHitSlop(10)} onPress={startStoryPlaying}>
            <Icons.PlaySmall fillCirlce={colors.opacityWhite(0.1)} hitSlop={getHitSlop(10)} />
          </PressableView>
        )}

        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressBarValue, animatedProgressStyle]} />
        </View>
      </PressableView>
    </BlurView>
  );
});

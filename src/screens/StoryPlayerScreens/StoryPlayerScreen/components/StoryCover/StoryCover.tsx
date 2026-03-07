import React, { useMemo } from 'react';
import { ImageStyle, View, StyleProp } from 'react-native';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { SharedValue, StyleProps, AnimatedStyle } from 'react-native-reanimated';

import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useStoryPlayerScreenLayout } from '@/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryPlayerScreenLayout';
import { TabEventType } from '@/services/analytics/analytics.types';

import { StoryActions } from '../StoryActions/StoryActions';
import { StoryMeta } from '../StoryMeta/StoryMeta';

import { makeStyles } from './StoryCover.styles';

const BOTTOM_GRADIENT_LOCATIONS = [0.5, 1];

interface StoryCoverProps {
  bottomGradientColors1: (string | number)[];
  bottomGradientColors2: (string | number)[];
  coverAnimatedStyles: AnimatedStyle<StyleProp<ImageStyle>>;
  coverURL: string;
  gesture: ReturnType<typeof Gesture.Pan>;
  gradientColor: string;
  startStoryPlaying: () => void;
  storyContainerAnimatedStyles: StyleProps;
  storyContainerMinHeight: number;
  storyDescription: string;
  storyId: number;
  storyPlayingSharedValue: SharedValue<number>;
  storyTitle: string;
  tab: TabEventType;
  selectedAudioRecording?: AudioRecordingSchema | null;
}

export const StoryCover = ({
  bottomGradientColors1,
  bottomGradientColors2,
  coverAnimatedStyles,
  coverURL,
  gesture,
  gradientColor,
  selectedAudioRecording,
  startStoryPlaying,
  storyContainerAnimatedStyles,
  storyContainerMinHeight,
  storyDescription,
  storyId,
  storyPlayingSharedValue,
  storyTitle,
  tab,
}: StoryCoverProps) => {
  const storyPlayerScreenLayout = useStoryPlayerScreenLayout();

  const stylesContext = useMemo(
    () => ({ gradientColor, storyContainerMinHeight, ...storyPlayerScreenLayout }),
    [gradientColor, storyContainerMinHeight, storyPlayerScreenLayout],
  );

  const styles = useMakeStyles(makeStyles, stylesContext);

  return (
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
            colors={bottomGradientColors1}
            locations={BOTTOM_GRADIENT_LOCATIONS}
            pointerEvents='none'
            style={styles.bottomGradient}
          />

          <LinearGradient
            angle={180}
            colors={bottomGradientColors2}
            locations={BOTTOM_GRADIENT_LOCATIONS}
            pointerEvents='none'
            style={styles.bottomGradient}
          />

          <StoryActions
            startStoryPlaying={startStoryPlaying}
            storyId={storyId}
            storyPlayingSharedValue={storyPlayingSharedValue}
            storyTitle={storyTitle}
            tab={tab}
          />
        </View>
        <StoryMeta
          description={storyDescription}
          duration={selectedAudioRecording?.duration ?? 0}
          storyPlayingSharedValue={storyPlayingSharedValue}
          style={styles.storyMeta}
        />
      </Animated.View>
    </GestureDetector>
  );
};

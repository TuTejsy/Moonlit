import React, { useCallback } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { TextView } from '@/components/Primitives/TextView/TextView';
import VoiceWaveform from '@/components/VoiceWaveform/VoiceWaveform';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

import { FairyTaleTextBlock } from './components/FairyTaleTextBlock/FairyTaleTextBlock';
import { RecordingActionButtons } from './components/RecordingActionButtons/RecordingActionButtons';
import { RecordingIndicator } from './components/RecordingIndicator/RecordingIndicator';
import { RecordingProgressBar } from './components/RecordingProgressBar/RecordingProgressBar';
import {
  FAIRY_TALE_PARAGRAPHS,
  WAVEFORM_FRAMES,
  WAVEFORM_GRADIENT_COLORS,
  WAVEFORM_MAX_HEIGHT,
  WAVEFORM_MIN_HEIGHT,
} from './CreateVoiceSecondStep.constants';
import { makeStyles } from './CreateVoiceSecondStep.styles';
import { CreateVoiceSecondStepProps } from './CreateVoiceSecondStep.types';
import { useAutoScrollText } from './hooks/useAutoScrollText';
import { useVoiceRecordingMock } from './hooks/useVoiceRecordingMock';

export const CreateVoiceSecondStep = (_props: CreateVoiceSecondStepProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();
  const navigation = useAppNavigation();

  const { formattedTime, progress, isRecording, totalDuration, voicePowerSharedValue } =
    useVoiceRecordingMock();

  const { activeParagraphIndex, handleParagraphLayout, scrollRef } = useAutoScrollText(
    isRecording,
    FAIRY_TALE_PARAGRAPHS.length,
  );

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSavePress = useCallback(() => {
    navigation.navigate(RootRoutes.CREATE_VOICE_THIRD_STEP, {
      storyName: 'The Elves and the Shoemaker',
    });
  }, [navigation]);

  return (
    <LinearGradient colors={[colors.purple, colors.darkPurple]} style={styles.container}>
      <ScreenHeader title={localize('common', 'createYourVoice')} />

      <View style={styles.contentContainer}>
        <RecordingIndicator formattedTime={formattedTime} totalDuration={totalDuration} />

        <RecordingProgressBar progress={progress} />

        <FairyTaleTextBlock
          activeParagraphIndex={activeParagraphIndex}
          paragraphs={FAIRY_TALE_PARAGRAPHS}
          scrollRef={scrollRef}
          onParagraphLayout={handleParagraphLayout}
        />

        <View style={styles.waveformContainer}>
          <VoiceWaveform
            gradientColors={WAVEFORM_GRADIENT_COLORS}
            maxHeight={WAVEFORM_MAX_HEIGHT}
            minHeight={WAVEFORM_MIN_HEIGHT}
            numberOfFrames={WAVEFORM_FRAMES}
            voicePowerSharedValue={voicePowerSharedValue}
          />
        </View>

        <View style={styles.hintTextContainer}>
          <TextView style={styles.hintText}>{localize('createVoice', 'readTextOutLoud')}</TextView>
        </View>
      </View>

      <RecordingActionButtons onBackPress={handleBackPress} onSavePress={handleSavePress} />
    </LinearGradient>
  );
};

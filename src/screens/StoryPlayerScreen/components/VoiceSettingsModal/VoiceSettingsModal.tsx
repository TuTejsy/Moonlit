import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { useAudioRecordings } from '@/hooks/database/useAudioRecordings';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import AudioRecording from './components/AudioRecording/AudioRecording';
import Header from './components/Header/Header';
import VoiceSettingsButton from './components/VoiceSettingsButton/VoiceSettingsButton';
import { makeStyles } from './VoiceSettingsModal.styles';

interface VoiceSettingsModalProps {
  selectedAudioRecordingId: number;
  selectedAudioRecordingVersion: number;
  setSelectedAudioRecording: (selectedAudioRecordingId: number) => void;
  storyColor: string;
  storyId: number;
}

function VoiceSettingsModal({
  selectedAudioRecordingId,
  selectedAudioRecordingVersion,
  setSelectedAudioRecording,
  storyColor,
  storyId,
}: VoiceSettingsModalProps) {
  const { colors } = useTheme();

  const stylesContext = useMemo(() => ({ storyColor }), [storyColor]);

  const styles = useMakeStyles(makeStyles, stylesContext);

  const isModalExpandedSharedValue = useSharedValue(0);

  const modalContainerAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 0 ? 'none' : 'flex',
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, 1]),
  }));

  const [audioRecordings, auidioRecoridngsVersion] = useAudioRecordings(`story_id = '${storyId}'`);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AudioRecordingSchema>) => {
      return (
        <AudioRecording
          coverUrl={item.cover_url}
          isSelected={selectedAudioRecordingId === item.id}
          name={item.voice_name}
          recordingId={item.id}
          onSelect={setSelectedAudioRecording}
        />
      );
    },
    [selectedAudioRecordingId, setSelectedAudioRecording],
  );

  const handleCloseIconPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  const keyExtractor = useCallback((item: AudioRecordingSchema) => `${item.id}`, []);

  return (
    <>
      <Animated.View style={[styles.modalContainer, modalContainerAnimatedStyle]}>
        <BlurView
          blurAmount={15}
          blurType='dark'
          reducedTransparencyFallbackColor={colors.opacityBlack(0.6)}
          style={styles.modal}
        >
          <Header onCloseIconPress={handleCloseIconPress} />

          <FlatList
            contentContainerStyle={styles.audioRecordingsListContainer}
            data={audioRecordings}
            extraData={auidioRecoridngsVersion + selectedAudioRecordingVersion}
            keyExtractor={keyExtractor}
            numColumns={2}
            renderItem={renderItem}
            style={styles.audioRecordingsList}
          />
        </BlurView>
      </Animated.View>

      <VoiceSettingsButton
        isModalExpandedSharedValue={isModalExpandedSharedValue}
        storyColor={storyColor}
      />
    </>
  );
}

export default VoiceSettingsModal;

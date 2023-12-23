import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { UnlockButton } from '@/components/Buttons/UnlockButton/UnlockButton';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { useAudioRecordings } from '@/hooks/database/useAudioRecordings';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';

import { AudioRecording } from './components/AudioRecording/AudioRecording';
import { Header } from './components/Header/Header';
import { MoreVoicesPlaceholder } from './components/MoreVoicesPlaceholder/MoreVoicesPlaceholder';
import { VoiceSettingsButton } from './components/VoiceSettingsButton/VoiceSettingsButton';
import { MORE_VOICES_PLACEHOLDER } from './VoiceSettingsModal.constants';
import { makeStyles } from './VoiceSettingsModal.styles';

interface VoiceSettingsModalProps {
  onSelectAudioRecording: (selectedAudioRecordingId: number) => void;
  selectedAudioRecordingId: number;
  selectedAudioRecordingName: string;
  selectedAudioRecordingVersion: number;
  selectedVoiceCoverUrl: string;
  storyColor: string;
  storyId: number;
}

export function VoiceSettingsModal({
  onSelectAudioRecording,
  selectedAudioRecordingId,
  selectedAudioRecordingName,
  selectedAudioRecordingVersion,
  selectedVoiceCoverUrl,
  storyColor,
  storyId,
}: VoiceSettingsModalProps) {
  const { colors } = useTheme();
  const stylesContext = useMemo(() => ({ storyColor }), [storyColor]);
  const styles = useMakeStyles(makeStyles, stylesContext);

  const isFullVersion = useAppSelector(selectIsFullVersion);

  const [arePointerEventsEnabled, setArePointerEventsEnabled] = useState(false);

  const isModalExpandedSharedValue = useSharedValue(0);

  useDerivedValue(() => {
    if (isModalExpandedSharedValue.value === 0) {
      runOnJS(setArePointerEventsEnabled)(false);
    } else {
      runOnJS(setArePointerEventsEnabled)(true);
    }
  });

  const modalContainerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, 1]),
  }));

  const [audioRecordings, auidioRecoridngsVersion] = useAudioRecordings(`story_id = '${storyId}'`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const flatListData = useMemo(
    () => [...audioRecordings, MORE_VOICES_PLACEHOLDER],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auidioRecoridngsVersion],
  );

  const handleClosePress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  const handleSelectAudioRecording = useCallback(
    (audioRecordingnId: number) => {
      onSelectAudioRecording(audioRecordingnId);
      handleClosePress();
    },
    [handleClosePress, onSelectAudioRecording],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AudioRecordingSchema | typeof MORE_VOICES_PLACEHOLDER>) => {
      if (item.id === MORE_VOICES_PLACEHOLDER.id) {
        return <MoreVoicesPlaceholder />;
      }

      const audioRecording = item as AudioRecordingSchema;

      return (
        <AudioRecording
          coverUrl={formatServerFileURLToAbsolutePath(audioRecording.cover_url)}
          isFree={audioRecording.is_free}
          isSelected={selectedAudioRecordingId === item.id}
          name={audioRecording.voice_name}
          recordingId={audioRecording.id}
          onSelect={handleSelectAudioRecording}
        />
      );
    },
    [handleSelectAudioRecording, selectedAudioRecordingId],
  );

  const keyExtractor = useCallback(
    (item: AudioRecordingSchema | typeof MORE_VOICES_PLACEHOLDER) => `${item.id}`,
    [],
  );

  return (
    <>
      <Animated.View
        pointerEvents={arePointerEventsEnabled ? 'auto' : 'none'}
        style={[styles.modalContainer, modalContainerAnimatedStyle]}
      >
        <BlurView
          blurAmount={15}
          blurType='dark'
          reducedTransparencyFallbackColor={colors.opacityBlack(0.6)}
          style={styles.modal}
        >
          <Header onCloseIconPress={handleClosePress} />

          <FlatList
            contentContainerStyle={styles.audioRecordingsListContainer}
            data={flatListData}
            extraData={auidioRecoridngsVersion + selectedAudioRecordingVersion}
            keyExtractor={keyExtractor}
            numColumns={2}
            renderItem={renderItem}
            style={styles.audioRecordingsList}
          />

          <LinearGradient
            angle={180}
            colors={[colors.opacityLightPurple(0), colors.opacityLightPurple(1)]}
            locations={[0, 1]}
            pointerEvents='none'
            style={styles.gradient}
          />

          {!isFullVersion && (
            <UnlockButton style={styles.unlockButton}>Unlock all voices</UnlockButton>
          )}
        </BlurView>
      </Animated.View>

      <VoiceSettingsButton
        isModalExpandedSharedValue={isModalExpandedSharedValue}
        storyColor={storyColor}
        voiceCoverUrl={formatServerFileURLToAbsolutePath(selectedVoiceCoverUrl)}
        voiceName={selectedAudioRecordingName}
      />
    </>
  );
}

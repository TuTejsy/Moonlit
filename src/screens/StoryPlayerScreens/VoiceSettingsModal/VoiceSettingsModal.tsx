import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

import { UnlockButton } from '@/components/Buttons/UnlockButton/UnlockButton';
import { IS_IOS } from '@/constants/common';
import { WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { AudioRecordingsDB } from '@/database';
import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';
import { useAudioRecordings } from '@/hooks/database/useAudioRecordings';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { AudioRecording } from './components/AudioRecording/AudioRecording';
import { AUDIO_RECORDING_WIDTH } from './components/AudioRecording/AudioRecording.constants';
import { Header } from './components/Header/Header';
import { MoreVoicesPlaceholder } from './components/MoreVoicesPlaceholder/MoreVoicesPlaceholder';
import { MORE_VOICES_PLACEHOLDER } from './VoiceSettingsModal.constants';
import { makeStyles } from './VoiceSettingsModal.styles';

export function VoiceSettingsModal() {
  const {
    params: {
      onSelectAudioRecording,
      selectedAudioRecordingId,
      source,
      storyColor,
      storyId,
      storyName,
      tab,
    },
  } = useAppRoute<RootRoutes.VOICE_SETTINGS_MODAL>();

  const navigation = useAppNavigation<RootRoutes.VOICE_SETTINGS_MODAL>();

  const { colors } = useTheme();
  const stylesContext = useMemo(() => ({ storyColor }), [storyColor]);
  const styles = useMakeStyles(makeStyles, stylesContext);

  const isFullVersion = useAppSelector(selectIsFullVersion);

  const [audioRecordings, auidioRecoridngsVersion] = useAudioRecordings(`story_id = '${storyId}'`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const flatListData = useMemo(
    () => [...audioRecordings, MORE_VOICES_PLACEHOLDER],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auidioRecoridngsVersion],
  );

  const handleClosePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectAudioRecording = useCallback(
    (audioRecordingnId: number, newRecordingName: string) => {
      const currentRecording = AudioRecordingsDB.object(selectedAudioRecordingId);

      if (currentRecording) {
        AnalyticsService.logVoiceChangeEvent({
          from: currentRecording.voice_name,
          name: storyName,
          source,
          tab,
          to: newRecordingName,
        });
      }

      onSelectAudioRecording(audioRecordingnId);
      handleClosePress();
    },
    [handleClosePress, onSelectAudioRecording, selectedAudioRecordingId, source, storyName, tab],
  );

  const numColumns = useMemo(() => {
    return Math.floor(WINDOW_WIDTH / (AUDIO_RECORDING_WIDTH + HORIZONTAL_PADDING));
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AudioRecordingSchema | typeof MORE_VOICES_PLACEHOLDER>) => {
      if (item.id === MORE_VOICES_PLACEHOLDER.id) {
        return <MoreVoicesPlaceholder />;
      }

      const audioRecording = item as AudioRecordingSchema;

      return (
        <AudioRecording
          coverUrl={audioRecording.cover_url}
          isFree={audioRecording.is_free}
          isSelected={selectedAudioRecordingId === item.id}
          name={audioRecording.voice_name}
          recordingId={audioRecording.id}
          onSelect={handleSelectAudioRecording}
        />
      );
    },
    [selectedAudioRecordingId, handleSelectAudioRecording],
  );

  const keyExtractor = useCallback(
    (item: AudioRecordingSchema | typeof MORE_VOICES_PLACEHOLDER) => `${item.id}`,
    [],
  );

  useEffect(() => {
    AnalyticsService.logVoiceViewEvent({ name: storyName, source, tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.modalContainer}>
      {IS_IOS && (
        <BlurView
          blurAmount={15}
          blurType='dark'
          reducedTransparencyFallbackColor={colors.opacityBlack(0.6)}
          style={styles.blurView}
        />
      )}

      <LinearGradient
        angle={180}
        colors={[colors.opacityLightPurple(0), colors.opacityLightPurple(1)]}
        locations={[0, 1]}
        pointerEvents='none'
        style={styles.gradient}
      />

      <Header onCloseIconPress={handleClosePress} />

      <FlatList
        contentContainerStyle={styles.audioRecordingsListContainer}
        data={flatListData}
        extraData={auidioRecoridngsVersion}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.audioRecordingsList}
      />
      {!isFullVersion && (
        <UnlockButton source={SOURCE.ALL_VOICES} style={styles.unlockButton}>
          Unlock all voices
        </UnlockButton>
      )}
    </View>
  );
}

import React, { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './AudioRecording.styles';

interface AudioRecordingProps {
  coverUrl: string;
  isSelected: boolean;
  name: string;
  onSelect: (recordingId: number) => void;
  recordingId: number;
}

function AudioRecording({
  coverUrl,
  isSelected,
  name,
  onSelect,
  recordingId,
}: AudioRecordingProps) {
  const stylesContext = useMemo(() => ({ isSelected }), [isSelected]);
  const styles = useMakeStyles(makeStyles, stylesContext);
  const { colors } = useTheme();

  const handleSelect = useCallback(() => {
    onSelect(recordingId);
  }, [onSelect, recordingId]);

  return (
    <PressableView style={styles.audioRecordingContainer} onPress={handleSelect}>
      <View style={styles.indicatorsContainer} />
      <Image source={{ uri: coverUrl }} style={styles.voiceAvatar} />
      <TextView style={styles.text} type='bold'>
        {name}
      </TextView>
    </PressableView>
  );
}

export default AudioRecording;

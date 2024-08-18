import React, { memo } from 'react';
import { Image, View } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { useAudioRecordingLayout } from '../AudioRecording/hooks/useAudioRecordingLayout';

import moreVoicesCommingImage from './images/moreVoicesComming/moreVoicesComming.png';
import { makeStyles } from './MoreVoicesPlaceholder.styles';

export const MoreVoicesPlaceholder = memo(() => {
  const audioRecordingLayout = useAudioRecordingLayout();
  const styles = useMakeStyles(makeStyles, audioRecordingLayout);

  return (
    <View style={styles.audioRecordingContainer}>
      <Image source={moreVoicesCommingImage} style={styles.image} />
    </View>
  );
});

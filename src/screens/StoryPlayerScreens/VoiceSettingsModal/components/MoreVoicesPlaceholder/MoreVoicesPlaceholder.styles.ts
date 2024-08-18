import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { AuidioRecordingLayout } from '../AudioRecording/hooks/useAudioRecordingLayout';

export const makeStyles = (
  { colors, dw, windowMaxWidth }: MakeStylesProps,
  { audioRecordingHeight, audioRecordingMargin, audioRecordingWidth }: AuidioRecordingLayout,
) =>
  StyleSheet.create({
    audioRecordingContainer: {
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: dw(16, windowMaxWidth),
      height: audioRecordingHeight,
      marginBottom: 16,
      marginHorizontal: audioRecordingMargin / 2,
      overflow: 'hidden',
      width: audioRecordingWidth,
    },
    image: {
      height: audioRecordingHeight,
      width: audioRecordingWidth,
    },
  });

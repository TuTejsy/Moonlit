import { StyleSheet } from 'react-native';

import { WINDOW_MAX_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import {
  AUDIO_RECORDING_HEIGHT,
  AUDIO_RECORDING_WIDTH,
} from '../AudioRecording/AudioRecording.constants';

export const makeStyles = ({ colors, dw }: MakeStylesProps) =>
  StyleSheet.create({
    audioRecordingContainer: {
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: dw(16, WINDOW_MAX_WIDTH),
      height: AUDIO_RECORDING_HEIGHT,
      marginBottom: 16,
      marginHorizontal: dw(7.5),
      overflow: 'hidden',
      width: AUDIO_RECORDING_WIDTH,
    },
    image: {
      height: AUDIO_RECORDING_HEIGHT,
      width: AUDIO_RECORDING_WIDTH,
    },
  });

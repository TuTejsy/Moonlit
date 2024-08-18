import { StyleSheet } from 'react-native';

import { WINDOW_MAX_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { AUDIO_RECORDING_HEIGHT, AUDIO_RECORDING_WIDTH } from './AudioRecording.constants';

interface Context {
  isSelected: boolean;
}

export const makeStyles = ({ colors, dw, fonts }: MakeStylesProps, { isSelected }: Context) =>
  StyleSheet.create({
    audioRecordingContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(isSelected ? 1 : 0.05),
      borderRadius: dw(16, WINDOW_MAX_WIDTH),
      height: AUDIO_RECORDING_HEIGHT,
      justifyContent: 'center',
      marginBottom: 16,
      marginHorizontal: dw(7.5),
      overflow: 'hidden',
      width: AUDIO_RECORDING_WIDTH,
    },
    freeLabel: {
      ...fonts.size_14,
      backgroundColor: colors.opacityBlack(0.1),
      borderRadius: 12,
      color: colors.black,
      left: dw(8),
      overflow: 'hidden',
      paddingHorizontal: 25,
      paddingVertical: 2,
      position: 'absolute',
    },
    indicatorsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 24,
      position: 'relative',
      width: '100%',
    },
    rightIcon: {
      position: 'absolute',
      right: dw(8),
    },
    text: {
      ...fonts.size_16,
      color: isSelected ? colors.black : colors.opacityWhite(0.5),
    },
    voiceAvatar: {
      height: dw(102, WINDOW_MAX_WIDTH),
      marginBottom: 16,
      paddingHorizontal: 8,
      paddingVertical: 8,
      width: dw(88, WINDOW_MAX_WIDTH),
    },
  });

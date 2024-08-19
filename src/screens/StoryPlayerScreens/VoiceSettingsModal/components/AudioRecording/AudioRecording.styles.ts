import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { AuidioRecordingLayout } from './hooks/useAudioRecordingLayout';

interface Context extends AuidioRecordingLayout {
  isSelected: boolean;
}

export const makeStyles = (
  { colors, dw, fonts, windowMaxWidth }: MakeStylesProps,
  { audioRecordingHeight, audioRecordingWidth, cellSpace, isSelected }: Context,
) =>
  StyleSheet.create({
    audioRecordingContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(isSelected ? 1 : 0.05),
      borderRadius: dw(16, windowMaxWidth),
      height: audioRecordingHeight,
      justifyContent: 'center',
      marginBottom: 16,
      marginHorizontal: cellSpace / 2,
      overflow: 'hidden',
      width: audioRecordingWidth,
    },
    freeLabel: {
      ...fonts.size_14,
      backgroundColor: colors.opacityBlack(0.1),
      borderRadius: 12,
      color: colors.black,
      left: dw(8, windowMaxWidth),
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
      right: dw(8, windowMaxWidth),
    },
    text: {
      ...fonts.size_16,
      color: isSelected ? colors.black : colors.opacityWhite(0.5),
    },
    voiceAvatar: {
      height: dw(102, windowMaxWidth),
      marginBottom: 16,
      paddingHorizontal: 8,
      paddingVertical: 8,
      width: dw(88, windowMaxWidth),
    },
  });

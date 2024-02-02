import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  isSelected: boolean;
}

export const makeStyles = ({ colors, dw, fonts }: MakeStylesProps, { isSelected }: Context) =>
  StyleSheet.create({
    audioRecordingContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(isSelected ? 1 : 0.05),
      borderRadius: dw(16),
      height: dw(184),
      justifyContent: 'center',
      marginBottom: 16,
      marginHorizontal: dw(7.5),
      overflow: 'hidden',
      width: dw(163),
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
      height: dw(102),
      marginBottom: 16,
      paddingHorizontal: 8,
      paddingVertical: 8,
      width: dw(88),
    },
  });

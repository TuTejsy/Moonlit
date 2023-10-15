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
      marginBottom: 16,
      marginHorizontal: dw(7.5),
      overflow: 'hidden',
      width: dw(163),
    },
    text: {
      ...fonts.size_16,
      color: isSelected ? colors.black : colors.opacityWhite(0.5),
    },
  });

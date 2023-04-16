import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.white_20,
      borderRadius: 32,
      bottom: insets.bottom + 10,
      flexDirection: 'row',
      height: 48,
      justifyContent: 'center',
      left: 16,
      position: 'absolute',
      width: WINDOW_WIDTH - 32,
    },
    text: {
      ...fonts.size_16,
      marginRight: 12,
    },
  });

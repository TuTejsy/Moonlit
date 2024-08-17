import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      marginTop: dh(16),
    },
    content: {
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: insets.top,
      overflow: 'hidden',
      paddingBottom: insets.bottom,
      paddingHorizontal: 34,
      paddingTop: dh(24),
      position: 'relative',
    },
    screen: {
      backgroundColor: colors.purple,
      flex: 1,
      maxWidth: WINDOW_HEIGHT * 0.7,
    },
    skipText: {
      ...fonts.size_14,
      color: colors.white,
      left: 32,
      position: 'absolute',
      top: 24,
    },
  });

import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    actionsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      position: 'absolute',
      width: WINDOW_WIDTH - 32,
      zIndex: 10,
    },
    button: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.2),
      borderRadius: 24,
      height: 48,
      justifyContent: 'center',
      width: 48,
    },
    listenButton: {
      alignItems: 'center',
      backgroundColor: colors.orange,
      borderRadius: 24,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 8,
      width: 183,
    },
    listenText: {
      ...fonts.size_16,
      marginLeft: 19,
    },
  });

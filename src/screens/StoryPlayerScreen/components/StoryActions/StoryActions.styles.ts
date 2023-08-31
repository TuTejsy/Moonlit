import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    actions: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    actionsContainer: {
      bottom: 0,
      paddingHorizontal: 16,
      position: 'absolute',
      width: WINDOW_WIDTH - 32,
      zIndex: 10,
    },
    button: {
      alignItems: 'center',
      backgroundColor: colors.opacityBlack(0.3),
      borderRadius: 24,
      height: 48,
      justifyContent: 'center',
      width: 48,
    },
    listenButton: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 24,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 8,
      width: 183,
    },
    listenText: {
      ...fonts.size_16,
      color: colors.darkBlack,
      marginLeft: 19,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      marginBottom: 32,
    },
  });

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
      borderRadius: 24,
      height: 48,
      justifyContent: 'center',
      width: 48,
    },
    listenButton: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 24,
      flex: 1,
      flexDirection: 'row',
      height: 48,
      justifyContent: 'center',
      marginRight: 16,
      paddingHorizontal: 8,
      position: 'relative',
    },
    listenText: {
      ...fonts.size_16,
      color: colors.darkBlack,
      marginLeft: 19,
    },
    playIcon: {
      left: 8,
      position: 'absolute',
      top: 8,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      marginBottom: 32,
    },
  });

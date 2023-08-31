import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    blurView: {
      flex: 1,
    },
    blurViewContainer: {
      height: WINDOW_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: WINDOW_WIDTH,
    },
    playerActionsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: 96,
      position: 'absolute',
      top: insets.top + DEFAULT_HEADER_HEIGHT + 42,
      width: 96,
    },
    playerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      position: 'absolute',
      width: WINDOW_WIDTH,
    },
    playerControllsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 48,
      width: 216,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      marginBottom: 48,
      textAlign: 'center',
    },
  });

import { StyleSheet } from 'react-native';

import { IS_ANDROID } from '@/constants/common';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT, HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    blurView: {
      flex: 1,
    },
    blurViewContainer: StyleSheet.flatten([
      {
        height: WINDOW_HEIGHT,
        left: 0,
        position: 'absolute',
        top: 0,
        width: WINDOW_WIDTH,
      },
      IS_ANDROID && {
        backgroundColor: colors.opacityBlack(0.7),
      },
    ]),
    playerActionsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: insets.top + DEFAULT_HEADER_HEIGHT + 42,
    },
    playerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: HORIZONTAL_PADDING,
      position: 'absolute',
      width: WINDOW_WIDTH,
    },
    playerControllsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 48,
      marginTop: 24,
      width: 216,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      marginBottom: 48,
      textAlign: 'center',
    },
  });

import { StyleSheet } from 'react-native';

import { IS_ANDROID } from '@/constants/common';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  fonts,
  horizontalPadding,
  insets,
  windowHeight,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    blurView: {
      flex: 1,
    },
    blurViewContainer: StyleSheet.flatten([
      {
        height: windowHeight,
        left: 0,
        position: 'absolute',
        top: 0,
        width: windowWidth,
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
      paddingHorizontal: horizontalPadding,
      position: 'absolute',
      width: windowWidth,
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

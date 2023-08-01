import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    addVoiceButton: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 24,
      flex: 1,
      height: 48,
      justifyContent: 'center',
      marginHorizontal: HORIZONTAL_PADDING,
    },
    addVoiceText: {
      ...fonts.size_14,
      color: colors.opacityBlack(0.7),
    },
    bottomBar: {
      height: 64,
      marginBottom: insets.bottom,
      width: SCREEN_WIDTH,
    },
    bottomBarContent: {
      alignItems: 'center',
      marginTop: 26,
    },
    bottomText: {
      ...fonts.size_16,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
    },
    modal: {
      backgroundColor: colors.opacityBlack(0.3),
      borderRadius: 24,
      width: '100%',
    },
    modalContainer: {
      left: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 12,
    },
    overlay: {
      backgroundColor: colors.black,
      height: SCREEN_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: SCREEN_WIDTH,
      zIndex: 11,
    },
    scrollView: {},
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      flex: 1,
      maxHeight: 1,
    },
  });

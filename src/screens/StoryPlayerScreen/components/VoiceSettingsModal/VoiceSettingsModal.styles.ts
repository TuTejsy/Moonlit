import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  storyColor: string;
}

export const makeStyles = (
  { colors, fonts, insets, zIndex }: MakeStylesProps,
  { storyColor }: Context,
) =>
  StyleSheet.create({
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
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
    },
    modalContainer: {
      height: SCREEN_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: SCREEN_WIDTH,
      zIndex: zIndex.max,
    },
  });

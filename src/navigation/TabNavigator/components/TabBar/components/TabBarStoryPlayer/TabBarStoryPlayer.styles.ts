import { StyleSheet } from 'react-native';

import { IS_ANDROID } from '@/constants/common';
import { TAB_BAR_STORY_PLAYER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

interface Context {
  storyColor: string;
}

export const makeStyles = (
  { colors, fonts, insets, windowWidth }: MakeStylesProps,
  { storyColor }: Context,
) =>
  StyleSheet.create({
    blurView: {
      backgroundColor: storyColor ? convertHEXtoRGBA(storyColor, 0.3) : colors.imagePurple,
      height: TAB_BAR_STORY_PLAYER_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: windowWidth - 14,
    },
    container: StyleSheet.flatten([
      {
        alignItems: 'center',
        borderRadius: 16,
        bottom: insets.bottom + TAB_BAR_STORY_PLAYER_HEIGHT + 3,
        flex: 1,
        flexDirection: 'row',
        height: TAB_BAR_STORY_PLAYER_HEIGHT,
        left: 7,
        overflow: 'hidden',
        paddingHorizontal: 12,
        position: 'absolute',
        width: windowWidth - 14,
      },
      IS_ANDROID && {
        backgroundColor: storyColor || colors.imagePurple,
      },
    ]),
    image: {
      borderRadius: 16,
      height: 32,
      width: 32,
    },
    progressBar: {
      backgroundColor: colors.opacityWhite(0.2),
      bottom: 1,
      height: 2,
      left: 12,
      position: 'absolute',
      width: '100%',
    },
    progressBarValue: {
      backgroundColor: colors.white,
      height: 2,
    },
    title: {
      ...fonts.size_14,
      color: colors.white,
      flex: 1,
      marginHorizontal: 12,
    },
  });

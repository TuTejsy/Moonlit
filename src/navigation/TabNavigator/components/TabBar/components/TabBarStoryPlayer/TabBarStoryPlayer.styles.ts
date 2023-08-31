import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { TAB_BAR_STORY_PLAYER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

interface Context {
  storyColor: string;
}

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps, { storyColor }: Context) =>
  StyleSheet.create({
    blurView: {
      backgroundColor: convertHEXtoRGBA(storyColor, 0.6),
      borderRadius: 16,
      bottom: insets.bottom + TAB_BAR_STORY_PLAYER_HEIGHT + 3,
      height: TAB_BAR_STORY_PLAYER_HEIGHT,
      left: 7,
      position: 'absolute',
      width: WINDOW_WIDTH - 14,
    },
    container: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 12,
      position: 'relative',
    },
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

import { StyleSheet } from 'react-native';

import { SCREEN_MAX_WIDTH, WINDOW_WIDTH } from '@/constants/layout';
import { TAB_BAR_STORY_PLAYER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    backgroundImage: {
      height: dw(597),
      left: 0,
      position: 'absolute',
      top: 0,
      width: WINDOW_WIDTH,
    },
    button: {
      marginTop: dh(20),
      width: dw(213, SCREEN_MAX_WIDTH),
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      marginTop: 40,
      paddingBottom: insets.bottom + TAB_BAR_STORY_PLAYER_HEIGHT,
      position: 'relative',
      width: WINDOW_WIDTH,
    },
    logoImage: {
      height: dw(78, SCREEN_MAX_WIDTH),
      marginTop: dw(64),
      width: dw(88, SCREEN_MAX_WIDTH),
    },
    title: {
      ...fonts.size_24,
      color: colors.white,
      textAlign: 'center',
    },
  });

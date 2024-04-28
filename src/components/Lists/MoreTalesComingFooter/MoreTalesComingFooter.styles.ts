import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { TAB_BAR_STORY_PLAYER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    backgroundImage: {
      height: dw(571),
      left: 0,
      position: 'absolute',
      top: 0,
      width: WINDOW_WIDTH,
    },
    button: {
      marginTop: dh(20),
      width: dw(213),
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      marginTop: 40,
      position: 'relative',
    },
    logoImage: {
      height: dw(78),
      marginTop: dw(64),
      width: dw(88),
    },
    title: {
      ...fonts.size_24,
      color: colors.white,
      textAlign: 'center',
    },
  });

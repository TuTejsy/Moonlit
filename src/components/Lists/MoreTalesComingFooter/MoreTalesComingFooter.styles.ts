import { StyleSheet } from 'react-native';

import { TAB_BAR_STORY_PLAYER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  insets,
  windowMaxWidth,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    backgroundImage: {
      height: dw(597),
      left: 0,
      position: 'absolute',
      top: 0,
      width: windowWidth,
    },
    button: {
      marginTop: dh(20),
      width: dw(213, windowMaxWidth),
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      marginTop: 40,
      paddingBottom: insets.bottom + TAB_BAR_STORY_PLAYER_HEIGHT,
      position: 'relative',
      width: windowWidth,
    },
    logoImage: {
      height: dw(78, windowMaxWidth),
      marginTop: dw(64),
      width: dw(88, windowMaxWidth),
    },
    title: {
      ...fonts.size_24,
      color: colors.white,
      textAlign: 'center',
    },
  });

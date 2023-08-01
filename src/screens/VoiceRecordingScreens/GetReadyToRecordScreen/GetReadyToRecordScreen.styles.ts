import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      alignItems: 'center',
      backgroundColor: colors.black,
      flex: 1,
      maxHeight: SCREEN_HEIGHT,
      maxWidth: SCREEN_WIDTH,
      paddingTop: insets.top,
      position: 'relative',
    },
  });

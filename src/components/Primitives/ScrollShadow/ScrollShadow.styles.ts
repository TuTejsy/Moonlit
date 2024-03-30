import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, insets }: MakeStylesProps) =>
  StyleSheet.create({
    gradient: {
      height: insets.top + 68,
      width: SCREEN_WIDTH,
    },
    gradientContainer: {
      left: 0,
      position: 'absolute',
      shadowColor: colors.black,
      shadowOffset: { height: 0, width: -4 },
      shadowOpacity: 0.25,
      shadowRadius: 100,
      top: 0,
    },
  });

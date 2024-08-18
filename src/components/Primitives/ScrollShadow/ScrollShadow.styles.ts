import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, insets, windowWidth }: MakeStylesProps) =>
  StyleSheet.create({
    gradient: {
      height: insets.top + 68,
      width: windowWidth,
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

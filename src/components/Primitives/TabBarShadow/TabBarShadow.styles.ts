import { StyleSheet } from 'react-native';

import { PURE_TAB_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw, zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    view: {
      backgroundColor: colors.white,
      bottom: -PURE_TAB_HEIGHT,
      elevation: dw(24),
      height: PURE_TAB_HEIGHT,
      position: 'absolute',
      shadowColor: colors.shadow,
      shadowOffset: {
        height: -dw(2),
        width: 0,
      },
      shadowOpacity: 1,
      shadowRadius: dw(20),
      width: '100%',
      zIndex: zIndex.shadow,
    },
  });
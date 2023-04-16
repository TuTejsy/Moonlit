import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw }: MakeStylesProps) =>
  StyleSheet.create({
    badge: {
      backgroundColor: colors.pink500,
      borderColor: colors.white,
      borderRadius: dw(10),
      borderWidth: dw(3),
      height: dw(20),
      justifyContent: 'center',
      left: dw(23),
      minWidth: dw(20),
      overflow: 'hidden',
      paddingHorizontal: dw(2),
      position: 'absolute',
      top: dw(-3),
    },
    badgeValue: {
      color: colors.white,
      fontSize: dw(9),
      fontWeight: 'bold',
      lineHeight: dw(12),
      textAlign: 'center',
    },
  });

import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh }: MakeStylesProps) =>
  StyleSheet.create({
    indicator: {
      backgroundColor: colors.white,
      borderRadius: dh(3),
      height: dh(6),
      marginHorizontal: 4,
      width: dh(6),
    },
  });

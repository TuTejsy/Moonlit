import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    indicator: {
      backgroundColor: colors.white,
      borderRadius: 3,
      height: 6,
      marginHorizontal: 4,
      width: 6,
    },
  });

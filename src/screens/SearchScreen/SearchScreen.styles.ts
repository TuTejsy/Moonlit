import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.black,
      flex: 1,
    },
    searchScreen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.black,
    },
  });

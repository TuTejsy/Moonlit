import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    homeScreen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.black,
    },
    screen: {
      backgroundColor: colors.black,
      flex: 1,
    },
  });

import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {}

// eslint-disable-next-line no-empty-pattern
export const makeStyles = ({ colors, dw, insets }: MakeStylesProps, {}: Context) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.black,
      flex: 1,
    },
  });

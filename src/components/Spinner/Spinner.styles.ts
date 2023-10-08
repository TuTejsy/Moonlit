import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  size: number;
}

export const makeStyles = (_: MakeStylesProps, { size }: Context) =>
  StyleSheet.create({
    container: {
      height: size,
      width: size,
    },
  });

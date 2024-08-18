import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  numColumns: number;
}

export const makeStyles = (_: MakeStylesProps, { numColumns }: Context) =>
  StyleSheet.create({
    listContent: {
      alignItems: numColumns > 2 ? 'center' : 'flex-start',
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    separator: {
      height: 34,
    },
  });

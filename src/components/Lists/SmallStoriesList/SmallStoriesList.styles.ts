import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  numColumns: number;
}

export const makeStyles = ({ horizontalPadding }: MakeStylesProps, { numColumns }: Context) =>
  StyleSheet.create({
    listContent: {
      alignItems: numColumns > 2 ? 'center' : 'flex-start',
      paddingHorizontal: horizontalPadding,
    },
    separator: {
      height: 34,
    },
  });

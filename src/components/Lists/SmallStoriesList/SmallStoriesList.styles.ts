import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    listContent: {
      alignItems: 'flex-start',
      paddingHorizontal: horizontalPadding / 2,
    },
    separator: {
      height: 34,
    },
  });

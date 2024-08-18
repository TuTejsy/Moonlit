import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    list: {},
    listContent: {
      paddingLeft: horizontalPadding,
    },
  });

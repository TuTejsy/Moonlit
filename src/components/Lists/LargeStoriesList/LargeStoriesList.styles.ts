import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    list: {
      marginTop: 12,
    },
    listContent: {
      paddingLeft: horizontalPadding,
    },
  });

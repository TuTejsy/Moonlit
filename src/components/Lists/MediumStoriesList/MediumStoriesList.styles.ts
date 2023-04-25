import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    list: {
      marginBottom: 40,
      marginTop: 16,
    },
    listContent: {
      paddingLeft: HORIZONTAL_PADDING,
    },
  });

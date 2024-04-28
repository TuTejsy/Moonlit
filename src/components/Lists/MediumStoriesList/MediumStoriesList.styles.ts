import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = (_: MakeStylesProps) =>
  StyleSheet.create({
    list: {},
    listContent: {
      paddingLeft: HORIZONTAL_PADDING,
    },
  });

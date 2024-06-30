import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.darkPurple,
    },
    screen: {
      flex: 1,
    },
    scrollView: {},
    scrollViewContent: {
      paddingHorizontal: HORIZONTAL_PADDING,
    },
  });

import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    itemText: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.6),
      marginTop: 32,
    },
    popularSearchContainer: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: 38,
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      marginVertical: 8,
      width: '100%',
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });

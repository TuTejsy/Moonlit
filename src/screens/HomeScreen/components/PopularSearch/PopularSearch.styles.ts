import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT, HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    itemText: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.6),
      marginTop: dh(32),
    },
    popularSearchContainer: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + dh(48),
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      marginVertical: dh(8),
      width: '100%',
    },
    titleText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });

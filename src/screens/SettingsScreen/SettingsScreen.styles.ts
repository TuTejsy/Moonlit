import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: insets.top,
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      marginVertical: 32,
      width: '100%',
    },
    title: {
      ...fonts.size_24,
      color: colors.white,
      marginTop: 16,
    },
  });

import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts, horizontalPadding, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: horizontalPadding,
      paddingTop: insets.top,
    },
    separator: {
      backgroundColor: colors.opacityWhite(0.1),
      height: 1,
      marginVertical: dh(32),
      width: '100%',
    },
    title: {
      ...fonts.size_24,
      color: colors.white,
      marginBottom: dh(24),
      marginTop: dh(16),
    },
  });

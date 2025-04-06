import { StyleSheet, ColorValue } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  isScrollable: boolean;
}

export const makeStyles = (
  { colors, dh, fonts, insets, isLandscape, isSquareScreen }: MakeStylesProps,
  { isScrollable }: Context,
) =>
  StyleSheet.create({
    content: {
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      justifyContent: isLandscape || isSquareScreen ? 'center' : 'flex-end',
      marginTop: insets.top,
      overflow: 'hidden',
      paddingBottom: insets.bottom,
      paddingHorizontal: isScrollable ? 0 : 34,
      paddingTop: dh(24),
      position: 'relative',
    },
    screen: {
      backgroundColor: isScrollable ? colors.darkGradientPurple : colors.purple,
      flex: 1,
    },
    skipText: {
      ...fonts.size_14,
      color: colors.white,
      left: 32,
      position: 'absolute',
      top: 24,
    },
  });

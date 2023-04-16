import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  disableShadow?: boolean;
}

export const makeStyles = (
  { colors, dw, insets }: MakeStylesProps,
  { disableShadow = false }: Context,
) =>
  StyleSheet.create({
    cartIcon: {
      right: dw(1),
    },
    icon: {
      color: colors.gray600,
    },
    iconFocused: {
      color: colors.pink500,
    },
    shapeIcon: {
      backgroundColor: colors.white,
      borderRadius: dw(20),
      paddingHorizontal: dw(12),
      paddingVertical: dw(4),
      position: 'relative',
    },
    shapeIconFocused: {
      backgroundColor: colors.pink300,
    },
    shapeIconWrapper: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: dw(10),
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    tabBarWrapper: {
      backgroundColor: colors.white,
      elevation: disableShadow ? 0 : dw(24),
      paddingBottom: insets.bottom,
      shadowColor: colors.shadow,
      shadowOffset: {
        height: dw(-2),
        width: 0,
      },
      shadowOpacity: disableShadow ? 0 : 1,
      shadowRadius: dw(20),
    },
  });

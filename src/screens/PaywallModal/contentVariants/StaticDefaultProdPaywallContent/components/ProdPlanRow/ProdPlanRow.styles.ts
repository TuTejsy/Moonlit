import { StyleSheet } from 'react-native';

import type { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, zIndex }: MakeStylesProps) =>
  StyleSheet.create({
    badge: {
      backgroundColor: colors.pink,
      borderRadius: 999,
      overflow: 'hidden',
      paddingHorizontal: dw(9),
      paddingVertical: 3,
      position: 'absolute',
      right: dw(15),
      top: -dh(10),
      zIndex: zIndex.overMain,
    },
    badgeLabel: {
      ...fonts.size_10,
      color: colors.white,
      fontWeight: '600',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
    },
    badgeSheen: {
      backgroundColor: colors.opacityWhite(0.2),
      borderRadius: 999,
      height: 9,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    container: {
      alignItems: 'center',
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      paddingHorizontal: dw(15),
      paddingVertical: dh(8),
    },
    detail: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    left: {
      gap: 2,
    },
    name: {
      ...fonts.size_15,
      color: colors.white,
      fontWeight: '700',
    },
    price: {
      ...fonts.size_16,
      color: colors.white,
      fontWeight: '700',
    },
    priceRow: {
      alignItems: 'baseline',
      flexDirection: 'row',
      gap: 2,
    },
    priceUnit: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    selected: {
      borderColor: colors.pink,
    },
    selectedGradientOverlay: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    unselected: {
      backgroundColor: colors.opacityWhite(0.05),
      borderColor: colors.opacityWhite(0.2),
      opacity: 0.6,
    },
    wrap: {
      position: 'relative',
    },
  });

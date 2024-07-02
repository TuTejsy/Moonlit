import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    checkbox: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.2),
      borderRadius: dw(12),
      borderWidth: 1,
      height: dw(24),
      justifyContent: 'center',
      width: dw(24),
    },
    checkboxMark: {
      backgroundColor: colors.white,
      borderRadius: dw(6),
      height: dw(12),
      width: dw(12),
    },
    freeTrialContainer: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.2),
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      height: dw(56),
      justifyContent: 'space-between',
      marginTop: dh(12),
      paddingLeft: HORIZONTAL_PADDING,
      paddingRight: 24,
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    freeTrialSwitch: {
      height: 28,
      width: 52,
    },
    freeTrialText: {
      ...fonts.size_12,
      color: colors.white,
    },
    fullBenifitLabel: {
      alignItems: 'center',
      borderRadius: 16,
      height: 16,
      justifyContent: 'center',
      left: SCREEN_WIDTH / 2 - HORIZONTAL_PADDING * 2 - 34,
      position: 'absolute',
      top: -8,
      width: 68,
    },
    fullBenifitLabelText: {
      ...fonts.size_10,
      color: colors.white,
    },
    price: {
      ...fonts.size_14,
      color: colors.white,
    },
    priceSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.6),
    },
    productContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderColor: colors.transparent,
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      height: dw(56),
      justifyContent: 'space-between',
      marginTop: dh(12),
      paddingLeft: HORIZONTAL_PADDING,
      paddingRight: 26,
      position: 'relative',
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    productDescription: {
      ...fonts.size_14,
      color: colors.white,
    },
    productNameContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    productPriceContainer: {
      paddingRight: 16,
    },
    productSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.8),
    },
    productTitle: {
      ...fonts.size_12,
      flex: 1,
    },
    promotionText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.2),
      marginTop: dh(16),
      textAlign: 'center',
    },
    selectedProductContainer: {
      borderColor: colors.pink,
    },
    subtitle: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      display: WINDOW_HEIGHT < 680 ? 'none' : 'flex',
      marginTop: dh(8),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_40,
      color: colors.white,
      textAlign: 'center',
    },
    voicesImage: {
      height: dw(140),
      marginBottom: dh(22),
      marginTop: dh(18),
      width: WINDOW_WIDTH,
    },
  });

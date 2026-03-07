import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  horizontalPadding,
  sufficientWindowWidth,
  windowMaxWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    checkbox: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.2),
      borderRadius: dw(12, windowMaxWidth),
      borderWidth: 1,
      height: dw(24, windowMaxWidth),
      justifyContent: 'center',
      width: dw(24, windowMaxWidth),
    },
    checkboxMark: {
      backgroundColor: colors.white,
      borderRadius: dw(6, windowMaxWidth),
      height: dw(12, windowMaxWidth),
      width: dw(12, windowMaxWidth),
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
      height: dw(56, windowMaxWidth),
      justifyContent: 'space-between',
      marginBottom: dh(12),
      paddingLeft: horizontalPadding,
      paddingRight: 26,
      position: 'relative',
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    productPriceContainer: {
      paddingRight: 16,
    },
    productTitle: {
      ...fonts.size_12,
      flex: 1,
    },
    selectedProductContainer: {
      borderColor: colors.pink,
    },
  });

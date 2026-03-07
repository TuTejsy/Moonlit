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
    priceSale: {
      ...fonts.size_20,
      color: colors.white,
    },
    priceSubtitle: {
      ...fonts.size_10,
      color: colors.opacityWhite(0.8),
    },
    productContainer: {
      alignItems: 'center',
      borderColor: colors.transparent,
      borderRadius: 16,
      borderWidth: 2,
      flexDirection: 'row',
      height: dw(56, windowMaxWidth),
      justifyContent: 'space-between',
      marginTop: dh(16),
      opacity: 0.5,
      overflow: 'hidden',
      paddingLeft: horizontalPadding,
      paddingRight: 26,
      position: 'relative',
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    productContainerImage: {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    productNameContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    productPriceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    productSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.8),
    },
    productTitle: {
      ...fonts.size_16,
      marginBottom: 1,
    },
    selectedProductContainer: {
      borderColor: colors.pink,
      opacity: 1,
    },
    separator: {
      backgroundColor: colors.pink,
      height: dw(40, windowMaxWidth),
      marginHorizontal: 18,
      width: 1,
    },
  });

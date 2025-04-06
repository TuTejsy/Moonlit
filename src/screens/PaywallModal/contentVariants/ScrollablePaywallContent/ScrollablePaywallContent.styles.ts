import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  horizontalPadding,
  sufficientWindowWidth,
  windowHeight,
  windowMaxWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      marginTop: dh(14),
    },
    content: {
      alignItems: 'center',
    },
    footerAction: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.2),
      textDecorationLine: 'underline',
    },
    footerActions: {
      height: 38,
    },
    freeTrialContainer: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      height: dw(72, windowMaxWidth),
      marginTop: dh(16),
      paddingLeft: horizontalPadding,
      paddingRight: 24,
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    freeTrialSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      marginTop: dh(4),
    },
    freeTrialSwitch: {
      height: 28,
      width: 52,
    },
    freeTrialTextContainer: {
      flex: 1,
    },
    freeTrialTitle: {
      ...fonts.size_16,
      color: colors.white,
    },
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
      marginTop: dh(16),
      height: dw(56, windowMaxWidth),
      justifyContent: 'space-between',
      paddingLeft: horizontalPadding,
      paddingRight: 26,
      opacity: 0.5,
      overflow: 'hidden',
      position: 'relative',
      width: sufficientWindowWidth - horizontalPadding * 4,
    },
    productContainerImage: {
      position: 'absolute',
      width: sufficientWindowWidth - horizontalPadding * 4,
      height: '100%',
      left: 0,
      top: 0,
    },
    productNameContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    productPriceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      backgroundColor: colors.pink,
      marginHorizontal: 18,
      width: 1,
      height: dw(40, windowMaxWidth),
    },
    productSubtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.8),
    },
    productTitle: {
      ...fonts.size_16,
      marginBottom: 1,
    },
    price: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.6),
      marginTop: dh(16),
    },
    promotionText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.3),
      marginTop: dh(16),
      textAlign: 'center',
    },
    selectedProductContainer: {
      borderColor: colors.pink,
      opacity: 1,
    },
    subscriptionInfo: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.3),
      flex: 1,
      paddingHorizontal: 32,
      textAlign: 'center',
    },
    subtitle: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      display: windowHeight < 680 ? 'none' : 'flex',
      marginTop: dh(8),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_40,
      color: colors.white,
      textAlign: 'center',
    },
    benefit: {
      flexDirection: 'row',
      marginTop: dh(18),
    },
    benefitText: {
      ...fonts.size_12_4,
      color: colors.white,
      marginLeft: 8,
    },
    benefitsContainer: {
      marginTop: dh(142),
      marginBottom: dh(24),
    },
  });

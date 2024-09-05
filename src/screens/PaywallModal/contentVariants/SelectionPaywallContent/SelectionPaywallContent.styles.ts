import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  horizontalPadding,
  isLandscape,
  isSquareScreen,
  sufficientWindowWidth,
  windowHeight,
  windowMaxWidth,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    block: StyleSheet.flatten([
      {
        alignItems: 'center',
      },
      isLandscape && {
        flex: 1,
        marginTop: windowHeight / 6,
      },
      isSquareScreen && {
        flex: 1,
        marginTop: dh(62),
      },
    ]),
    button: {
      marginTop: dh(16),
    },
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
    content: {
      flexDirection: isLandscape || isSquareScreen ? 'row' : 'column',
    },
    freeTrialContainer: {
      alignItems: 'center',
      borderColor: colors.opacityWhite(0.2),
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      height: dw(56, windowMaxWidth),
      justifyContent: 'space-between',
      paddingLeft: horizontalPadding,
      paddingRight: 24,
      width: sufficientWindowWidth - horizontalPadding * 4,
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
      left: sufficientWindowWidth / 2 - horizontalPadding * 2 - 34,
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
      height: dw(56, windowMaxWidth),
      justifyContent: 'space-between',
      marginBottom: dh(12),
      paddingLeft: horizontalPadding,
      paddingRight: 26,
      position: 'relative',
      width: sufficientWindowWidth - horizontalPadding * 4,
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
      display: windowHeight < 680 ? 'none' : 'flex',
      marginTop: dh(8),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_40,
      color: colors.white,
      textAlign: 'center',
    },
    voicesFullImage: StyleSheet.flatten([
      isSquareScreen && {
        height: ((windowWidth - horizontalPadding * 4) / 512) * 152,
        marginTop: dh(22),
        width: windowWidth - horizontalPadding * 4,
      },
      isLandscape && {
        marginTop: dh(40),
        maxWidth: windowWidth / 2 - horizontalPadding * 4,
      },
    ]),
    voicesImage: {
      height: dw(140),
      marginBottom: dh(22),
      marginTop: dh(40),
      width: windowWidth,
    },
  });

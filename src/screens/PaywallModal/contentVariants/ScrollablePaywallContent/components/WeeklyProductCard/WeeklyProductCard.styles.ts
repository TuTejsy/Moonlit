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
    productNameContainer: {
      flex: 1,
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
  });

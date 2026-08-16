import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { flattenStyle } from '@/utils/styles/flattenStyle';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  horizontalPadding,
  isLandscape,
  isSquareScreen,
  windowHeight,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    block: flattenStyle([
      {
        alignItems: 'center',
      },
      isSquareScreen
        ? {
            flex: 1,
            marginTop: dh(62),
          }
        : undefined,
      isLandscape
        ? {
            flex: 1,
            marginTop: windowHeight / 6,
          }
        : undefined,
    ]),
    button: {
      marginTop: dh(16),
    },
    content: {
      flexDirection: isSquareScreen || isLandscape ? 'row' : 'column',
    },
    productBlock: flattenStyle([{ justifyContent: 'flex-end' }, { marginBottom: dh(22) }]),
    promotionText: {
      ...fonts.size_14,
      color: colors.white,
      marginTop: !isLandscape && !isSquareScreen ? dh(32) : 0,
      textAlign: 'center',
    },
    subtitle: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.7),
      marginTop: dh(16),
      textAlign: 'center',
    },
    title: {
      ...fonts.size_40,
      color: colors.white,
      textAlign: 'center',
    },
    voicesFullImage: flattenStyle([
      isSquareScreen
        ? {
            height: ((windowWidth - horizontalPadding * 4) / 512) * 152,
            marginTop: dh(22),
            width: windowWidth - horizontalPadding * 4,
          }
        : undefined,
      isLandscape
        ? {
            marginTop: dh(40),
            maxWidth: windowWidth / 2 - horizontalPadding * 4,
          }
        : undefined,
    ]),
    voicesImage: {
      height: dw(140),
      marginTop: dh(40),
      width: windowWidth,
    },
  });

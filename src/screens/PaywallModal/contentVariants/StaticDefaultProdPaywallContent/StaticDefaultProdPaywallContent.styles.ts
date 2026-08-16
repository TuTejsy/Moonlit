import { StyleSheet } from 'react-native';

import type { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
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
    bottomBlock: {
      width: '100%',
    },
    content: flattenStyle([
      {
        flex: 1,
        flexDirection: isLandscape || isSquareScreen ? 'row' : 'column',
        width: '100%',
      },
    ]),
    ctaButton: {
      marginTop: dh(12),
    },
    footer: {
      marginTop: dh(4),
    },
    plans: {
      gap: dh(10),
      width: '100%',
    },
    productBlock: flattenStyle([
      {
        gap: dh(10),
        justifyContent: 'flex-end',
        width: '100%',
      },
      isLandscape || isSquareScreen
        ? {
            alignSelf: 'center',
            flex: 1,
            justifyContent: 'center',
            maxWidth: windowWidth / 2 - horizontalPadding * 2,
          }
        : undefined,
    ]),
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
    visualBlock: flattenStyle([
      {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: dh(16),
      },
      isLandscape || isSquareScreen
        ? {
            justifyContent: 'center',
            paddingBottom: 0,
          }
        : undefined,
    ]),
    voicesFullImage: flattenStyle([
      isSquareScreen
        ? {
            height: ((windowWidth - horizontalPadding * 4) / 512) * 152,
            width: windowWidth - horizontalPadding * 4,
          }
        : undefined,
      isLandscape
        ? {
            maxWidth: windowWidth / 2 - horizontalPadding * 4,
          }
        : undefined,
    ]),
    voicesImage: {
      height: dw(140),
      marginTop: dh(16),
      width: windowWidth,
    },
  });

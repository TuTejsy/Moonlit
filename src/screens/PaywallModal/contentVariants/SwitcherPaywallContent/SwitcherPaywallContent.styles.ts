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
  windowHeight,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    block: StyleSheet.flatten([
      {
        alignItems: 'center',
      },
      isSquareScreen && {
        flex: 1,
        marginTop: dh(62),
      },
      isLandscape && {
        flex: 1,
        marginTop: windowHeight / 6,
      },
    ]),
    button: {
      marginTop: dh(16),
    },
    content: {
      flexDirection: isSquareScreen || isLandscape ? 'row' : 'column',
    },
    productBlock: StyleSheet.flatten([{ justifyContent: 'flex-end' }, { marginBottom: dh(22) }]),
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
      marginTop: dh(40),
      width: windowWidth,
    },
  });

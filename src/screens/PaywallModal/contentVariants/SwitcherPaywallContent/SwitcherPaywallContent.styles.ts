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
    freeTrialContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      flexDirection: 'row',
      height: dw(72, windowMaxWidth),
      marginTop: dh(24),
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

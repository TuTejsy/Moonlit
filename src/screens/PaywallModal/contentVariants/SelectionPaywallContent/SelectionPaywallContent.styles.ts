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
  sufficientWindowWidth,
  windowHeight,
  windowMaxWidth,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    block: flattenStyle([
      {
        alignItems: 'center',
      },
      isLandscape
        ? {
            flex: 1,
            marginTop: windowHeight / 6,
          }
        : undefined,
      isSquareScreen
        ? {
            flex: 1,
            marginTop: dh(62),
          }
        : undefined,
    ]),
    button: {
      marginTop: dh(16),
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
      alignSelf: 'center',
    },
    freeTrialText: {
      ...fonts.size_12,
      color: colors.white,
    },
    promotionText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.2),
      marginTop: dh(16),
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
      marginBottom: dh(22),
      marginTop: dh(40),
      width: windowWidth,
    },
  });

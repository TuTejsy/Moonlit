import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { SpalshViewModalLayout } from './hooks/useSplashViewModalLayout';

export const makeStyles = (
  { colors, dw, insets, windowHeight, windowWidth }: MakeStylesProps,
  { launchLogoHeight, moonLogoSize, starsMarginTop }: SpalshViewModalLayout,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      position: 'relative',
    },
    gradientBackground: {
      backgroundColor: colors.purple,
      height: windowHeight,
      width: windowWidth,
    },
    gradientBackgroundContainer: {
      height: windowHeight,
      left: 0,
      position: 'absolute',
      top: 0,
      width: windowWidth,
    },
    launchLogo: {
      height: launchLogoHeight,
      paddingBottom: dw(13),
      position: 'absolute',
      width: dw(121),
    },
    logoContainer: {
      position: 'absolute',
      top: windowHeight / 2 - moonLogoSize - dw(42),
    },
    moonGradient: {
      height: moonLogoSize * 2,
      width: moonLogoSize,
    },
    moonGradientContainer: {
      marginTop: -moonLogoSize,
    },
    moonLogo: {
      height: moonLogoSize,
      width: moonLogoSize,
    },
    spinner: {
      bottom: insets.bottom + dw(27),
      position: 'absolute',
    },
    stars: {
      height: dw(398),
      marginTop: starsMarginTop,
      width: dw(347),
    },
  });

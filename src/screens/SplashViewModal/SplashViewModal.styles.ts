import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { SpalshViewModalLayout } from './hooks/useSplashViewModalLayout';

export const makeStyles = ({ colors, dw, insets }: MakeStylesProps, {launchLogoHeight, moonLogoSize, starsMarginTop}: SpalshViewModalLayout) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      position: 'relative',
    },
    gradientBackground: {
      backgroundColor: colors.purple,
      height: WINDOW_HEIGHT,
      width: WINDOW_WIDTH,
    },
    gradientBackgroundContainer: {
      height: WINDOW_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
      width: WINDOW_WIDTH,
    },
    launchLogo: {
      height: launchLogoHeight,
      paddingBottom: dw(13),
      position: 'absolute',
      width: dw(121),
    },
    logoContainer: {
      position: 'absolute',
      top: WINDOW_HEIGHT / 2 - moonLogoSize - dw(42),
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

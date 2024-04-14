import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { LAUNCH_LOGO_HEIGHT, MOON_LOGO_SIZE, STARS_MARGIN_TOP } from './SplashView.constants';

export const makeStyles = ({ colors, dh, dw, insets }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.purple,
      flex: 1,
      justifyContent: 'center',
      position: 'relative',
    },
    launchLogo: {
      height: LAUNCH_LOGO_HEIGHT,
      paddingBottom: dw(13),
      position: 'absolute',
      width: dw(121),
    },
    moonContainer: {
      position: 'absolute',
      top: WINDOW_HEIGHT / 2 - MOON_LOGO_SIZE - dw(42),
    },
    moonGradient: {
      height: MOON_LOGO_SIZE * 2,
      width: MOON_LOGO_SIZE,
    },
    moonGradientContainer: {
      position: 'absolute',
      top: WINDOW_HEIGHT / 2 - MOON_LOGO_SIZE - dw(42),
    },
    moonLogo: {
      height: MOON_LOGO_SIZE,
      width: MOON_LOGO_SIZE,
    },
    spinner: {
      bottom: insets.bottom + dw(27),
      position: 'absolute',
    },
    stars: {
      height: dw(398),
      marginTop: STARS_MARGIN_TOP,
      width: dw(347),
    },
  });

import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { LAUNCH_LOGO_HEIGHT } from './SplashView.constants';

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
      position: 'absolute',
      width: dw(121),
    },
    spinner: {
      bottom: insets.bottom + dw(27),
      position: 'absolute',
    },
    stars: {
      height: dw(408),
      width: dw(347),
    },
  });

import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { LAUNCH_LOGO_HEIGHT } from './SplashView.constants';

export const makeStyles = ({ colors, insets }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.purple,
      flex: 1,
      justifyContent: 'center',
      paddingBottom: insets.bottom,
      paddingHorizontal: 14,
      paddingTop: insets.top,
      position: 'relative',
    },
    launchLogo: {
      height: LAUNCH_LOGO_HEIGHT,
      position: 'absolute',
      width: 121,
    },
  });

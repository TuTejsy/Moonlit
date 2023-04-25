import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    activeTabTitle: {
      ...fonts.size_10,
      color: colors.white,
    },
    inactiveTabTitle: {
      ...fonts.size_10,
      color: colors.opacityWhite(0.5),
    },
    tabBar: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tabBarWrapper: {
      backgroundColor: colors.opacityWhite(0.3),
      borderRadius: 1000,
      bottom: 0,
      height: TAB_BAR_HEIGHT,
      left: 50,
      marginBottom: insets.bottom + 10,
      maxWidth: SCREEN_WIDTH - 100,
      overflow: 'hidden',
      position: 'absolute',
      right: 50,
    },
    tabContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

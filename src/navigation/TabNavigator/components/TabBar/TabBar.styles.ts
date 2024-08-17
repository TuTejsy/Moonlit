import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, SUFFICIENT_SCREEN_WIDTH } from '@/constants/layout';
import { TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  hasPlayer: boolean;
}

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps, { hasPlayer }: Context) =>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: insets.bottom,
      paddingHorizontal: 57,
      width: SUFFICIENT_SCREEN_WIDTH,
    },
    tabBarShadow: {
      bottom: 0,
      height: TAB_BAR_HEIGHT + insets.bottom,
      justifyContent: 'flex-end',
      left: 0,
      position: 'absolute',
      shadowColor: colors.black,
      shadowOffset: { height: 0, width: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 100,
    },
    tabBarWrapper: {
      alignItems: 'center',
      height: TAB_BAR_HEIGHT + insets.bottom,
      justifyContent: 'flex-end',
      width: SCREEN_WIDTH,
    },
    tabContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

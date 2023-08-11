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
      justifyContent: 'space-between',
    },
    tabBarShadow: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      shadowColor: colors.black,
      shadowOffset: { height: 0, width: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 100,
    },
    tabBarWrapper: {
      height: TAB_BAR_HEIGHT + insets.bottom,
      paddingHorizontal: 57,
      width: SCREEN_WIDTH,
    },
    tabContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

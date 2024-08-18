import { StyleSheet } from 'react-native';

import { TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  fonts,
  insets,
  sufficientWindowWidth,
  windowWidth,
}: MakeStylesProps) =>
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
      width: sufficientWindowWidth,
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
      width: windowWidth,
    },
    tabContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

interface Context {
  tabWidth: number;
}

export const makeStyles = (
  { colors, fonts, horizontalPadding, insets }: MakeStylesProps,
  { tabWidth }: Context,
) =>
  StyleSheet.create({
    blurViewContainer: {
      position: 'absolute',
      top: 0,
    },
    content: {
      backgroundColor: colors.black,
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 30,
    },
    contentContainer: {
      paddingHorizontal: horizontalPadding + 4,
      paddingTop: insets.top + 10,
      position: 'relative',
    },
    listContainer: {
      width: SCREEN_WIDTH,
    },
    listContent: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 30,
      paddingHorizontal: horizontalPadding,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 39,
    },
    listTitleText: {
      ...fonts.size_24,
      color: colors.white,
      marginBottom: 16,
    },
    screen: {
      alignItems: 'center',
      backgroundColor: colors.black,
      flex: 1,
      position: 'relative',
    },
    tabContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      flexDirection: 'row',
      height: 48,
      justifyContent: 'center',
      marginBottom: 10,
      marginLeft: 4,
      position: 'relative',
      width: tabWidth * 2,
    },
    tabIndicator: {
      backgroundColor: colors.orange,
      borderRadius: 12,
      height: 40,
      left: 0,
      position: 'absolute',
      width: tabWidth,
    },
    tabText: {
      ...fonts.size_16,
      color: colors.white,
      paddingVertical: 10,
      textAlign: 'center',
      width: tabWidth,
    },
    tabsGradient: {
      height: insets.top + DEFAULT_HEADER_HEIGHT + 38,
    },
  });

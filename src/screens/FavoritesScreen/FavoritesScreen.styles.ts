import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT, HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { TAB_WIDTH } from './FavoritesScreen.constants';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    blurViewContainer: {
      left: 0,
      position: 'absolute',
      top: 0,
    },
    content: {
      backgroundColor: colors.black,
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 30,
    },
    contentContainer: {
      paddingHorizontal: HORIZONTAL_PADDING + 4,
      paddingTop: insets.top + 10,
      position: 'relative',
    },
    listContainer: {
      width: SCREEN_WIDTH,
    },
    listContent: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 30,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 39,
    },
    listTitleText: {
      ...fonts.size_24,
      color: colors.white,
      marginBottom: 16,
    },
    screen: {
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
      width: TAB_WIDTH * 2,
    },
    tabIndicator: {
      backgroundColor: colors.orange,
      borderRadius: 12,
      height: 40,
      left: 0,
      position: 'absolute',
      width: TAB_WIDTH,
    },
    tabText: {
      ...fonts.size_16,
      color: colors.white,
      paddingVertical: 10,
      textAlign: 'center',
      width: TAB_WIDTH,
    },
    tabsGradient: {
      height: insets.top + DEFAULT_HEADER_HEIGHT + 38,
    },
  });

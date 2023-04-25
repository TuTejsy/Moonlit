import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { TAB_WIDTH } from './FavoritesScreen.constants';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.black,
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 30,
    },
    listContainer: {
      width: SCREEN_WIDTH,
    },
    listContent: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 30,
      paddingTop: 30,
    },
    listTitleText: {
      ...fonts.size_24,
      color: colors.white,
      marginBottom: 16,
    },
    screen: {
      backgroundColor: colors.black,
      flex: 1,
      paddingTop: insets.top + 10,
    },
    tabContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 100,
      flexDirection: 'row',
      height: 55,
      justifyContent: 'center',
      marginBottom: 10,
      marginLeft: HORIZONTAL_PADDING,
      position: 'relative',
      width: TAB_WIDTH * 2,
    },
    tabIndicator: {
      backgroundColor: colors.orange,
      borderRadius: 100,
      height: 47,
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
  });

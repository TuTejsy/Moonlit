import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PROMOTION_BANNER_HEIGHT, PROMOTION_BANNER_WIDTH } from './SearchScreen.constants';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 20,
      paddingTop: 38,
    },
    freeList: {
      marginBottom: 40,
      marginTop: 16,
    },
    gradient: {
      paddingTop: insets.top,
    },
    popularList: {
      marginTop: 16,
    },
    promotionBanner: {
      height: PROMOTION_BANNER_HEIGHT,
      marginBottom: 40,
      marginHorizontal: HORIZONTAL_PADDING,
      width: PROMOTION_BANNER_WIDTH,
    },
    screen: {
      backgroundColor: colors.black,
      flex: 1,
      paddingTop: insets.top + 10,
    },
    smallList: {
      marginTop: 16,
    },
  });

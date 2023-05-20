import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { PROMOTION_BANNER_HEIGHT, PROMOTION_BANNER_WIDTH } from './DefaultSearchList.constants';

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
    smallList: {
      marginTop: 16,
    },
  });

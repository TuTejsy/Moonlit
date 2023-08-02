import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT, HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 20,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 48,
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
      marginBottom: 40,
      marginHorizontal: HORIZONTAL_PADDING,
    },
    smallList: {
      marginTop: 16,
    },
  });

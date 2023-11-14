import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT, HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 20,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 40,
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
      marginHorizontal: HORIZONTAL_PADDING,
      marginVertical: 40,
    },
    smallList: {
      marginTop: 16,
    },
  });

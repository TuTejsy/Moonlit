import { StyleSheet } from 'react-native';

import {
  DEFAULT_HEADER_HEIGHT,
  TAB_BAR_HEIGHT,
  TAB_BAR_STORY_PLAYER_HEIGHT,
} from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ horizontalPadding, insets }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + TAB_BAR_STORY_PLAYER_HEIGHT,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 40,
    },
    freeList: {
      marginTop: 16,
    },
    gradient: {
      paddingTop: insets.top,
    },
    popularList: {
      marginBottom: 40,
      marginTop: 16,
    },
    promotionBanner: {
      alignSelf: 'center',
      marginHorizontal: horizontalPadding,
      marginVertical: 40,
    },
    smallList: {
      marginTop: 16,
    },
  });

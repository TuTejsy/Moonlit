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
    },
    createYourVoiceButton: {
      marginBottom: 41,
      marginHorizontal: horizontalPadding,
      marginTop: 34,
    },
    freeList: {
      marginTop: 16,
    },
    header: {
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 20,
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

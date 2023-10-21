import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, insets }: MakeStylesProps) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.black,
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 20,
    },
    gradient: {
      paddingTop: insets.top,
    },
    mediumList: {
      marginBottom: 40,
      marginTop: 16,
    },
    promotionBanner: {
      marginBottom: 40,
      marginHorizontal: HORIZONTAL_PADDING,
    },
    screen: {
      backgroundColor: colors.black,
      flex: 1,
    },
    smallList: {
      marginTop: 16,
    },
  });

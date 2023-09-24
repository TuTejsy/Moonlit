import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT, HORIZONTAL_PADDING, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, insets }: MakeStylesProps) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 16,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: insets.top + DEFAULT_HEADER_HEIGHT + 50,
    },
  });

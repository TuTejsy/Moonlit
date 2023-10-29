import { StyleSheet } from 'react-native';

import { TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    smallList: {
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT,
    },
  });

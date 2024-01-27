import { StyleSheet } from 'react-native';

import { LARGE_TITLE_HEIGHT } from '@/components/Headers/ScreenHeader/ScreenHeader.constants';
import { TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    smallListContainerStyle: {
      backgroundColor: colors.purple,
      marginTop: LARGE_TITLE_HEIGHT,
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 16,
    },
  });

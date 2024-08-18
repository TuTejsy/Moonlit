import { StyleSheet } from 'react-native';

import { LARGE_TITLE_HEIGHT } from '@/components/Headers/ScreenHeader/ScreenHeader.constants';
import { HORIZONTAL_PADDING, TAB_BAR_HEIGHT, TAB_BAR_STORY_PLAYER_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ insets }: MakeStylesProps) =>
  StyleSheet.create({
    footer: {
      marginLeft: -HORIZONTAL_PADDING,
    },
    screen: {
      flex: 1,
    },
    smallListContainerStyle: {
      marginTop: LARGE_TITLE_HEIGHT,
      paddingBottom: insets.bottom + TAB_BAR_HEIGHT + TAB_BAR_STORY_PLAYER_HEIGHT,
    },
  });

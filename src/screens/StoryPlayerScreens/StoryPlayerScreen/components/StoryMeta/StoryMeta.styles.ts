import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    durationText: {
      ...fonts.size_14,
      color: colors.opacityWhite(1),
    },
    durationTitle: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
    },
    storyMetaContainer: {
      backgroundColor: colors.opacityBlack(0.4),
      flex: 1,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: dh(32),
      width: SCREEN_WIDTH - 32,
    },
    storyText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      marginBottom: dh(32),
      marginTop: dh(14),
    },
  });

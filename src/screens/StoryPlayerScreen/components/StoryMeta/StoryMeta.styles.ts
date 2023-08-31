import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
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
      marginTop: 32,
      paddingHorizontal: 16,
      width: SCREEN_WIDTH - 32,
    },
    storyText: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
      height: 100,
      marginBottom: 32,
      marginTop: 14,
    },
  });

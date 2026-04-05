import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

const DOT_SIZE = 8;

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: horizontalPadding,
      paddingVertical: 8,
    },
    dot: {
      backgroundColor: colors.recordingRed,
      borderRadius: DOT_SIZE,
      height: DOT_SIZE,
      width: DOT_SIZE,
    },
    leftSection: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      gap: 8,
    },
    recordingText: {
      ...fonts.size_16,
      color: colors.recordingRed,
    },
    timeContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    timeText: {
      ...fonts.size_16,
      color: colors.white,
    },
    totalDurationText: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.5),
    },
  });

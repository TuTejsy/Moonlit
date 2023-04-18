import { StyleSheet } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    progressBar: {
      backgroundColor: colors.opacityGrey(0.4),
      borderRadius: 100,
      height: 4,
      width: '100%',
    },
    progressBarContainer: {
      width: '100%',
    },
    progressBarValue: {
      backgroundColor: colors.white,
      borderRadius: 100,
      height: '100%',
    },
    time: {
      ...fonts.size_10,
      color: colors.opacityWhite(0.7),
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
      width: '100%',
    },
  });

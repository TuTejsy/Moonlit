import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    cirlce: {
      backgroundColor: colors.white,
      borderRadius: 8,
      height: 16,
      position: 'absolute',
      right: -8,
      top: -6,
      width: 16,
    },
    progressBar: {
      backgroundColor: colors.opacityGrey(0.4),
      borderRadius: 10,
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
      position: 'relative',
    },
    time: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.7),
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      width: '100%',
    },
  });

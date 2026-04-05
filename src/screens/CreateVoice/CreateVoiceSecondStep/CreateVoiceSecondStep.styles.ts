import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingTop: 8,
    },
    hintText: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
      textAlign: 'center',
    },
    hintTextContainer: {
      paddingVertical: 8,
    },
    waveformContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: horizontalPadding,
    },
  });

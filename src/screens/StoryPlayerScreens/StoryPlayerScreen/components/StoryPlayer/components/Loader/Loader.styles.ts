import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    loaderContainer: {
      alignItems: 'center',
      flex: 1,
      marginBottom: 68,
    },
    text: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.6),
      marginTop: 24,
    },
  });

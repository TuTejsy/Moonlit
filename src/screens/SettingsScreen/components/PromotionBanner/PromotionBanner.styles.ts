import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.orange,
      borderRadius: 32,
      flex: 0,
      marginHorizontal: 8,
      paddingHorizontal: 32,
      paddingVertical: 8,
    },
    buttonText: {
      ...fonts.size_12,
      color: colors.white,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: 16,
      flexDirection: 'row',
      height: 94,
      justifyContent: 'space-between',
      marginBottom: 48,
      marginTop: 24,
      overflow: 'hidden',
      paddingHorizontal: HORIZONTAL_PADDING,
    },
    subtitle: {
      ...fonts.size_16,
      color: colors.white,
      marginTop: 4,
    },
    textContainer: {},
    title: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.5),
    },
  });

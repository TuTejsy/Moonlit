import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts, horizontalPadding }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.orange,
      borderRadius: dh(32),
      flex: 0,
      marginHorizontal: dh(8),
      paddingHorizontal: 32,
      paddingVertical: dh(8),
    },
    buttonText: {
      ...fonts.size_12,
      color: colors.white,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: dh(16),
      flexDirection: 'row',
      height: dh(94),
      justifyContent: 'space-between',
      marginBottom: dh(48),
      overflow: 'hidden',
      paddingHorizontal: horizontalPadding,
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

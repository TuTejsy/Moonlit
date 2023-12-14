import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: dw(205),
      width: dw(230),
    },
    text: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.4),
      marginTop: 17,
      textAlign: 'center',
    },
  });

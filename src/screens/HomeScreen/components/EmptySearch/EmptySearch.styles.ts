import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 205,
      width: 230,
    },
    text: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.4),
      marginTop: 17,
      textAlign: 'center',
    },
  });

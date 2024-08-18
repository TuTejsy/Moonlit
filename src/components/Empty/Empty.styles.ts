import { StyleSheet } from 'react-native';

import { DEFAULT_HEADER_HEIGHT, TAB_BAR_HEIGHT } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, fonts, insets, windowHeight }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      height: windowHeight - DEFAULT_HEADER_HEIGHT - TAB_BAR_HEIGHT - insets.top - 130,
      justifyContent: 'center',
      paddingHorizontal: 73,
    },
    image: {},
    text: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.4),
      marginTop: 17,
      textAlign: 'center',
    },
  });

import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    buttonGradient: {
      alignItems: 'center',
      borderRadius: dw(32),
      height: dw(48),
      justifyContent: 'center',
      width: '100%',
    },
    buttonText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });

import { StyleSheet } from 'react-native';

import { SCREEN_MAX_WIDTH, SUFFICIENT_SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    button: {
      width: SUFFICIENT_SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    buttonGradient: {
      alignItems: 'center',
      borderRadius: dw(32, SCREEN_MAX_WIDTH),
      height: dw(48, SCREEN_MAX_WIDTH),
      justifyContent: 'center',
      width: '100%',
    },
    buttonText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });

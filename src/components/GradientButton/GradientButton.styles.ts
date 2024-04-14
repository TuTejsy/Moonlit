import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dw, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    buttonGradient: {
      alignItems: 'center',
      borderRadius: dw(32),
      height: dw(48),
      justifyContent: 'center',
      width: SCREEN_WIDTH - HORIZONTAL_PADDING * 4,
    },
    buttonText: {
      ...fonts.size_16,
      color: colors.white,
    },
  });

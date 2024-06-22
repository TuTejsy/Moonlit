import { StyleSheet } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ insets }: MakeStylesProps) =>
  StyleSheet.create({
    bottomOverlayGradient: {
      bottom: 0,
      height: (WINDOW_HEIGHT * 2) / 3,
      left: 0,
      position: 'absolute',
      width: WINDOW_WIDTH,
    },
    image: {
      height: WINDOW_HEIGHT - insets.top - insets.bottom - 120,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    topOverlayGradient: {
      height: (WINDOW_HEIGHT * 2) / 3,
      left: 0,
      position: 'absolute',
      top: 0,
      width: WINDOW_WIDTH,
    },
  });

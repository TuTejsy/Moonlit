import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ insets, windowHeight, windowWidth }: MakeStylesProps) =>
  StyleSheet.create({
    bottomOverlayGradient: {
      bottom: 0,
      height: (windowHeight * 2) / 3,
      left: 0,
      position: 'absolute',
      width: windowWidth,
    },
    image: {
      height: windowHeight - insets.top - insets.bottom - 120,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    topOverlayGradient: {
      height: (windowHeight * 2) / 3,
      left: 0,
      position: 'absolute',
      top: 0,
      width: windowWidth,
    },
  });

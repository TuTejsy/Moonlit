import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ dh, dw, insets, windowHeight, windowWidth }: MakeStylesProps) =>
  StyleSheet.create({
    animatedImage: {
      height: windowHeight - insets.top - insets.bottom - 120,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    bottomOverlayGradient: {
      bottom: 0,
      height: (windowHeight * 2) / 3,
      left: 0,
      position: 'absolute',
      width: windowWidth,
    },
    image: {
      height: dw(507),
      left: 0,
      position: 'absolute',
      top: 0,
      width: windowWidth,
    },
    scrollableGradient: {
      bottom: 0,
      height: dw(330),
      left: 0,
      position: 'absolute',
      top: dh(96),
      width: windowWidth,
    },
    topOverlayGradient: {
      height: (windowHeight * 2) / 3,
      left: 0,
      position: 'absolute',
      top: 0,
      width: windowWidth,
    },
  });

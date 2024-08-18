import { useCallback } from 'react';
import { PixelRatio } from 'react-native';

import { DESIGN_HEIGHT, DESIGN_WIDTH } from '@/constants/layout';

import { useLayout } from './useLayout';

export const useRelativeSize = () => {
  const { windowHeight, windowWidth } = useLayout();

  const dw = useCallback(
    (size: number, maxWidth: number = windowWidth) => {
      return PixelRatio.roundToNearestPixel(
        (Math.min(maxWidth, windowWidth) / DESIGN_WIDTH) * size,
      );
    },
    [windowWidth],
  );

  const dh = useCallback(
    (size: number, maxHeight: number = windowHeight) => {
      return PixelRatio.roundToNearestPixel(
        (Math.min(maxHeight, windowHeight) / DESIGN_HEIGHT) * size,
      );
    },
    [windowHeight],
  );

  return { dh, dw };
};

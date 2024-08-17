import { PixelRatio } from 'react-native';

import { DESIGN_HEIGHT, DESIGN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';

export const dw = (size: number, maxWidth: number = SCREEN_WIDTH) => {
  return PixelRatio.roundToNearestPixel((Math.min(maxWidth, SCREEN_WIDTH) / DESIGN_WIDTH) * size);
};

export const dh = (size: number, maxHeight: number = SCREEN_HEIGHT) => {
  return PixelRatio.roundToNearestPixel(
    (Math.min(maxHeight, SCREEN_HEIGHT) / DESIGN_HEIGHT) * size,
  );
};

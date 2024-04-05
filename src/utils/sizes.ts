import { PixelRatio } from 'react-native';

import { DESIGN_HEIGHT, DESIGN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';

export const dw = (size: number) => {
  return PixelRatio.roundToNearestPixel((WINDOW_WIDTH / DESIGN_WIDTH) * size);
};

export const dh = (size: number) => {
  return PixelRatio.roundToNearestPixel((WINDOW_HEIGHT / DESIGN_HEIGHT) * size);
};

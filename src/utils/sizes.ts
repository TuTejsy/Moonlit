import { PixelRatio } from 'react-native';

import { DESIGN_HEIGHT, DESIGN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/layout';

export const dw = (size: number) => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH / DESIGN_WIDTH) * size);
};

export const dh = (size: number) => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / DESIGN_HEIGHT) * size);
};

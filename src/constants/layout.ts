import { Dimensions } from 'react-native';

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');
export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

export const [DESIGN_WIDTH, DESIGN_HEIGHT] = [375, 812];

export const SCREEN_MAX_WIDTH = Math.max(
  (DESIGN_WIDTH / DESIGN_HEIGHT) * SCREEN_HEIGHT,
  DESIGN_WIDTH,
);
export const SUFFICIENT_SCREEN_WIDTH = Math.min(SCREEN_WIDTH, SCREEN_MAX_WIDTH);

export const WINDOW_MAX_WIDTH = Math.max(
  (DESIGN_WIDTH / DESIGN_HEIGHT) * WINDOW_HEIGHT,
  DESIGN_WIDTH,
);
export const SUFFICIENT_WINDOW_WIDTH = Math.min(WINDOW_WIDTH, WINDOW_MAX_WIDTH);

export const IS_SQUARE_SCREEN = WINDOW_HEIGHT / WINDOW_WIDTH < 1.3;

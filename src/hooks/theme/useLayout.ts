import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { DESIGN_HEIGHT, DESIGN_WIDTH } from '@/constants/layout';

export interface Layout {
  isSquareScreen: boolean;
  sufficientWindowWidth: number;
  windowHeight: number;
  windowMaxWidth: number;
  windowWidth: number;
}

export const useLayout = (): Layout => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const layout = useMemo(() => {
    const windowMaxWidth = Math.max((DESIGN_WIDTH / DESIGN_HEIGHT) * windowHeight, DESIGN_WIDTH);
    const sufficientWindowWidth = Math.min(windowWidth, windowMaxWidth);
    const isSquareScreen = windowHeight / windowWidth < 1.3;

    return {
      isSquareScreen,
      sufficientWindowWidth,
      windowHeight,
      windowMaxWidth,
      windowWidth,
    };
  }, [windowHeight, windowWidth]);

  return layout;
};

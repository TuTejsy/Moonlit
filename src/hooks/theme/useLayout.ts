import { useCallback, useMemo } from 'react';
import { PixelRatio, useWindowDimensions } from 'react-native';

import { DESIGN_HEIGHT, DESIGN_WIDTH } from '@/constants/layout';

export interface Layout {
  dh: (size: number, maxHeight?: number) => number;
  dw: (size: number, maxWidth?: number) => number;
  horizontalPadding: number;
  isLandscape: boolean;
  isPortrait: boolean;
  isSquareScreen: boolean;
  sufficientWindowWidth: number;
  windowHeight: number;
  windowMaxWidth: number;
  windowWidth: number;
}

export const useLayout = (): Layout => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

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

  const layout = useMemo(() => {
    const windowMaxWidth = Math.max((DESIGN_WIDTH / DESIGN_HEIGHT) * windowHeight, DESIGN_WIDTH);
    const sufficientWindowWidth = Math.min(windowWidth, windowMaxWidth);

    const isLandscape = windowWidth > windowHeight;
    const isSquareScreen = isLandscape
      ? windowWidth / windowHeight < 1.3
      : windowHeight / windowWidth < 1.3;

    const isPortrait = !isLandscape;

    const horizontalPadding = dw(16, windowMaxWidth);
    const maxModalHeight = windowHeight - 81;

    return {
      dh,
      dw,
      horizontalPadding,
      isLandscape,
      isPortrait,
      isSquareScreen,
      maxModalHeight,
      sufficientWindowWidth,
      windowHeight,
      windowMaxWidth,
      windowWidth,
    };
  }, [dh, dw, windowHeight, windowWidth]);

  return layout;
};

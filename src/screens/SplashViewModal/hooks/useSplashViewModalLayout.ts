import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface SpalshViewModalLayout {
  launchLogoHeight: number;
  moonLogoSize: number;
  starsMarginTop: number;
}

export const useSplashViewModalLayout = (): SpalshViewModalLayout => {
  const { dw } = useLayout();

  const layout = useMemo(() => {
    const launchLogoHeight = dw(45);
    const moonLogoSize = dw(74);
    const starsMarginTop = -dw(64);

    return {
      launchLogoHeight,
      moonLogoSize,
      starsMarginTop,
    };
  }, [dw]);

  return layout;
};

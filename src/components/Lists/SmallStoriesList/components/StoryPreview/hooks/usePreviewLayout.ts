import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface PreviewLayout {
  previewSize: number;
}

export const usePreviewLayout = (): PreviewLayout => {
  const { horizontalPadding, sufficientWindowWidth } = useLayout();

  const layout = useMemo(() => {
    const previewSize = (sufficientWindowWidth - horizontalPadding * 3) / 2;

    return {
      previewSize,
    };
  }, [sufficientWindowWidth, horizontalPadding]);

  return layout;
};

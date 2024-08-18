import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface PreviewLayout {
  previewSize: number;
}

export const usePreviewLayout = (): PreviewLayout => {
  const { sufficientWindowWidth } = useLayout();

  const layout = useMemo(() => {
    const previewSize = (sufficientWindowWidth - 16 * 3) / 2;

    return {
      previewSize,
    };
  }, [sufficientWindowWidth]);

  return layout;
};

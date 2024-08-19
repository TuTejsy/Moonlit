import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface PromotionBannerLayout {
  promotionBannerHeight: number;
  promotionBannerWidth: number;
}

export const usePromotionBannerLayout = (): PromotionBannerLayout => {
  const { horizontalPadding, sufficientWindowWidth, windowWidth } = useLayout();

  const layout = useMemo(() => {
    const promotionBannerWidth = windowWidth - horizontalPadding * 2;
    const promotionBannerHeight = (sufficientWindowWidth / 343) * 480;

    return { promotionBannerHeight, promotionBannerWidth };
  }, [horizontalPadding, sufficientWindowWidth, windowWidth]);

  return layout;
};

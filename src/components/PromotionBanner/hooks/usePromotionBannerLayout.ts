import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface PromotionBannerLayout {
  promotionBannerHeight: number;
  promotionBannerWidth: number;
}

export const usePromotionBannerLayout = (): PromotionBannerLayout => {
  const { sufficientWindowWidth } = useLayout();

  const layout = useMemo(() => {
    const promotionBannerWidth = sufficientWindowWidth - 32;
    const promotionBannerHeight = (promotionBannerWidth / 343) * 480;

    return { promotionBannerHeight, promotionBannerWidth };
  }, [sufficientWindowWidth]);

  return layout;
};

import { memo, useCallback } from 'react';
import { ImageBackground, View } from 'react-native';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { selectFreeOfferDays } from '@/store/user/user.selector';

import bannerBackgroundImage from './images/bannerBackground/bannerBackground.png';
import { makeStyles } from './PromotionBanner.styles';

export const PromotionBanner = memo(() => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  const { showPaywallModal } = useShowPaywallModal();
  const freeOfferDays = useAppSelector(selectFreeOfferDays);

  const handlePromotionBannerPress = useCallback(() => {
    showPaywallModal({ contentName: 'Promotion banner', source: SOURCE.SETTINGS });
  }, [showPaywallModal]);

  return (
    <PressableView onPress={handlePromotionBannerPress}>
      <ImageBackground source={bannerBackgroundImage} style={styles.container}>
        <View style={styles.textContainer}>
          <TextView style={styles.title} type='bold'>
            {localize('common', 'subscription')}
          </TextView>
          <TextView style={styles.subtitle}>
            {localize('stories', 'freeDays', { count: freeOfferDays })}
          </TextView>
        </View>

        <View style={styles.button}>
          <TextView style={styles.buttonText} type='medium'>
            {localize('common', 'upgrade')}
          </TextView>
        </View>
      </ImageBackground>
    </PressableView>
  );
});

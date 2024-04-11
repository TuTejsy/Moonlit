import React, { useCallback } from 'react';
import { View, Image, ViewProps } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useImageSlideAnimation } from '@/hooks/useImageSlideAnimation';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { selectFreeOfferDays } from '@/store/user/user.selector';

import { UnlockButton } from '../Buttons/UnlockButton/UnlockButton';
import { TextView } from '../Primitives/TextView/TextView';

import bannerImage from './images/banner/banner.png';
import voicesImage from './images/voices/voices.png';
import { PROMOTION_BANNER_WIDTH } from './PromotionBanner.constants';
import { makeStyles } from './PromotionBanner.styles';

interface PromotionBannerPropTypes extends ViewProps {}

export function PromotionBanner({ style }: PromotionBannerPropTypes) {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const freeOfferDays = useAppSelector(selectFreeOfferDays);

  const { handleImageLayout, imageAnimatedStyle } = useImageSlideAnimation(PROMOTION_BANNER_WIDTH);

  const { showPaywallModal } = useShowPaywallModal();

  const handleBannerPress = useCallback(() => {
    showPaywallModal({ contentName: 'Promotion banner', source: SOURCE.HOME_VIEW });
  }, [showPaywallModal]);

  return (
    <TouchableWithoutFeedback style={[styles.container, style]} onPress={handleBannerPress}>
      <Animated.Image
        resizeMode='cover'
        source={bannerImage}
        style={[styles.image, imageAnimatedStyle]}
        onLayout={handleImageLayout}
      />
      <LinearGradient
        angle={180}
        colors={[colors.opacityLightPurple(0), colors.opacityLightPurple(1)]}
        locations={[0, 1]}
        style={styles.imageGradient}
      />

      <View style={styles.content}>
        <TextView style={styles.title} type='bold'>
          Unlock all fairytales
        </TextView>
        <TextView style={styles.subtitle}>
          and calming voices to{`\n`}gently lull your little one to sleep
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <UnlockButton source={SOURCE.HOME_VIEW}>Get {freeOfferDays} days free</UnlockButton>
      </View>
    </TouchableWithoutFeedback>
  );
}

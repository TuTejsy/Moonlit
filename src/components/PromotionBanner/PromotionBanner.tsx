import React from 'react';
import { View, Image, ViewProps } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useImageSlideAnimation } from '@/hooks/useImageSlideAnimation';
import { selectFreeOfferDays } from '@/store/user/user.selector';

import { UnlockButton } from '../Buttons/UnlockButton/UnlockButton';
import { PressableView } from '../Primitives/PressableView/PressableView';
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

  return (
    <PressableView style={[styles.container, style]} onPress={showPaywallModal}>
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
          Try {freeOfferDays} days{'\n'}for free
        </TextView>
        <TextView style={styles.subtitle}>
          and discover a library{'\n'}of stories and unique voiceovers
        </TextView>

        <Image source={voicesImage} style={styles.voicesImage} />

        <UnlockButton>Get {freeOfferDays} days free</UnlockButton>
      </View>
    </PressableView>
  );
}

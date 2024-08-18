import { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useHandleCheckSubscription } from '@/hooks/useHandleCheckSubscription';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { getStorageData } from '@/services/storage/storage';

import { useSplashViewModalLayout } from './hooks/useSplashViewModalLayout';
import launchLogoImage from './images/launchLogo/launchLogo.png';
import starsImage from './images/stars/stars.png';
import { makeStyles } from './SplashViewModal.styles';

export const SplashViewModal = () => {
  const { windowHeight } = useLayout();
  const spalshViewModalLayout = useSplashViewModalLayout();
  const { moonLogoSize } = spalshViewModalLayout;

  const styles = useMakeStyles(makeStyles, spalshViewModalLayout);
  const { colors } = useTheme();

  const navigation = useAppNavigation<RootRoutes.SPLASH_VIEW_MODAL>();

  const { areProductsLoaded, showPaywallModal } = useShowPaywallModal({
    animationType: 'modal',
    shouldReplace: true,
  });

  const { isOnboarded } = getStorageData();

  const handleSubscriptionCheck = useCallback(
    (isSubscriptionActive: boolean) => {
      if (isSubscriptionActive) {
        navigation.goBack();
      } else {
        showPaywallModal({ isSubscriptionExpired: true, source: SOURCE.COLD_START });
      }
    },
    [navigation, showPaywallModal],
  );

  const handleCheckSubscription = useHandleCheckSubscription(handleSubscriptionCheck);

  const animationProgress = useSharedValue(0);
  const pulseAnimationProgress = useSharedValue(0);

  const gradientBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 1], [1, 0]),
  }));

  const starsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 1], [1, 0]),
    transform: [
      { scale: interpolate(pulseAnimationProgress.value, [0, 1], [1, 0.9]) },
      {
        translateY: interpolate(animationProgress.value, [0, 1], [0, -windowHeight]),
      },
    ],
  }));

  const launchLogoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulseAnimationProgress.value, [0, 1], [1, 0.5]),
    transform: [
      { scale: interpolate(pulseAnimationProgress.value, [0, 1], [1, 0.8]) },
      {
        translateY: interpolate(animationProgress.value, [0, 1], [0, -windowHeight * 1.5]),
      },
    ],
  }));

  const moonGradientAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(pulseAnimationProgress.value, [0, 1], [0, -moonLogoSize * 2]),
      },
    ],
  }));

  const logoContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animationProgress.value, [0, 1], [0, -windowHeight * 1.5]),
      },
    ],
  }));

  useEffect(() => {
    if (areProductsLoaded) {
      animationProgress.value = withTiming(1, { duration: 1000 }, (finished?: boolean) => {
        'worklet';

        if (finished) {
          if (isOnboarded) {
            runOnJS(handleCheckSubscription)();
          } else {
            runOnJS(navigation.goBack)();
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areProductsLoaded]);

  useEffect(() => {
    pulseAnimationProgress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.out(Easing.poly(3)),
      }),
      -1,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gradientBackgroundContainer, gradientBackgroundAnimatedStyle]}>
        <LinearGradient
          angle={180}
          colors={[colors.purple, colors.darkPurple]}
          locations={[0.5, 1]}
          style={styles.gradientBackground}
        />
      </Animated.View>

      <Animated.View style={[styles.logoContainer, logoContainerAnimatedStyle]}>
        <Icons.Moon height={moonLogoSize} style={styles.moonLogo} width={moonLogoSize} />

        <Animated.View style={[styles.moonGradientContainer, moonGradientAnimatedStyle]}>
          <LinearGradient
            angle={180}
            colors={[colors.opacityPurple(1), colors.opacityPurple(0)]}
            locations={[0.5, 1]}
            style={styles.moonGradient}
          />
        </Animated.View>
      </Animated.View>

      <Animated.Image source={starsImage} style={[styles.stars, starsAnimatedStyle]} />

      <Animated.Image
        source={launchLogoImage}
        style={[styles.launchLogo, launchLogoAnimatedStyle]}
      />
    </View>
  );
};

import { useEffect } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  runOnJS,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import launchLogoImage from './images/launchLogo/launchLogo.png';
import starsImage from './images/stars/stars.png';
import { MOON_LOGO_SIZE } from './SplashView.constants';
import { makeStyles } from './SplashView.styles';

interface SplashViewProps {
  onAppReady: () => void;
}

export const SplashView = ({ onAppReady }: SplashViewProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const { areProductsLoaded } = useShowPaywallModal();

  const animationProgress = useSharedValue(0);
  const pulseAnimationProgress = useSharedValue(0);

  const starsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 1], [1, 0]),
    transform: [
      { scale: interpolate(pulseAnimationProgress.value, [0, 1], [1, 0.9]) },
      {
        translateY: interpolate(animationProgress.value, [0, 1], [0, -WINDOW_HEIGHT]),
      },
    ],
  }));

  const launchLogoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulseAnimationProgress.value, [0, 1], [1, 0.5]),
    transform: [
      { scale: interpolate(pulseAnimationProgress.value, [0, 1], [1, 0.8]) },
      {
        translateY: interpolate(animationProgress.value, [0, 1], [0, -WINDOW_HEIGHT * 1.5]),
      },
    ],
  }));

  const moonGradientAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(pulseAnimationProgress.value, [0, 1], [0, -MOON_LOGO_SIZE * 2]),
      },
    ],
  }));

  const logoContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animationProgress.value, [0, 1], [0, -WINDOW_HEIGHT * 1.5]),
      },
    ],
  }));

  useEffect(() => {
    if (areProductsLoaded) {
      animationProgress.value = withTiming(1, { duration: 1000 }, (finished?: boolean) => {
        'worklet';

        if (finished) {
          runOnJS(onAppReady)();
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
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0.5, 1]}
      style={styles.container}
    >
      <Animated.View style={[styles.logoContainer, logoContainerAnimatedStyle]}>
        <Icons.Moon height={MOON_LOGO_SIZE} style={styles.moonLogo} width={MOON_LOGO_SIZE} />

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
    </LinearGradient>
  );
};

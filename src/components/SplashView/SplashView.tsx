import { useEffect } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { WINDOW_HEIGHT } from '@/constants/layout';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import launchLogoImage from './images/launchLogo/launchLogo.png';
import starsImage from './images/stars/stars.png';
import { LAUNCH_LOGO_MARGIN_TOP, STARS_MARGIN_TOP } from './SplashView.constants';
import { makeStyles } from './SplashView.styles';

interface SplashViewProps {
  onAppReady: () => void;
}

export const SplashView = ({ onAppReady }: SplashViewProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const { areProductsLoaded } = useShowPaywallModal();

  const animationProgress = useSharedValue(0);

  const starsAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(animationProgress.value, [0, 1], [STARS_MARGIN_TOP, -WINDOW_HEIGHT]),
    opacity: interpolate(animationProgress.value, [0, 1], [1, 0]),
  }));

  const launchLogoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 1], [1, 0]),
    top: interpolate(
      animationProgress.value,
      [0, 1],
      [LAUNCH_LOGO_MARGIN_TOP, LAUNCH_LOGO_MARGIN_TOP / 2],
    ),
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

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0, 1]}
      style={styles.container}
    >
      <Animated.Image source={starsImage} style={starsAnimatedStyle} />
      <Animated.Image
        source={launchLogoImage}
        style={[styles.launchLogo, launchLogoAnimatedStyle]}
      />
    </LinearGradient>
  );
};

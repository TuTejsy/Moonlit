import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './Spinner.styles';

export interface SpinnerProps extends ViewProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const Spinner = ({
  children,
  color,
  size = 60,
  strokeWidth,
  style,
  ...props
}: SpinnerProps) => {
  const spinnerOffset = useSharedValue(0);

  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles, { size });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${spinnerOffset.value}deg` }],
  }));

  useEffect(() => {
    spinnerOffset.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
    );

    return () => cancelAnimation(spinnerOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[animStyle, style, styles.container]} {...props}>
      {children || (
        <Icons.Loader
          color={color || colors.white}
          height={size}
          strokeWidth={strokeWidth}
          width={size}
        />
      )}
    </Animated.View>
  );
};

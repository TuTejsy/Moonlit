import React, { useCallback } from 'react';

import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './Header.styles';

interface HeaderProps {
  isModalExpandedSharedValue: SharedValue<number>;
}

function Header({ isModalExpandedSharedValue }: HeaderProps) {
  const styles = useMakeStyles(makeStyles);

  const closeIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [0, 1]),
  }));

  const handleHeaderPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(1, {
      easing: Easing.in(Easing.ease),
    });
  }, [isModalExpandedSharedValue]);

  const handleCloseIconPress = useCallback(() => {
    isModalExpandedSharedValue.value = withTiming(0);
  }, [isModalExpandedSharedValue]);

  return (
    <PressableView style={styles.header} onPress={handleHeaderPress}>
      <TextView style={styles.text} type='bold'>
        Voice settings
      </TextView>

      <Icons.Waveframe />

      <Animated.View style={[styles.closeIconStyle, closeIconAnimatedStyle]}>
        <PressableView onPress={handleCloseIconPress}>
          <Icons.Close />
        </PressableView>
      </Animated.View>
    </PressableView>
  );
}

export default Header;

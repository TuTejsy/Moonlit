import React, { useCallback } from 'react';
import { View } from 'react-native';

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

  const buttonHeaderContainerAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 1 ? 'none' : 'flex',
    opacity: interpolate(isModalExpandedSharedValue.value, [0, 1], [1, 0]),
  }));

  const modalHeaderContainerAnimatedStyle = useAnimatedStyle(() => ({
    display: isModalExpandedSharedValue.value === 0 ? 'none' : 'flex',
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
      <Animated.View style={[styles.buttonHeaderContainer, buttonHeaderContainerAnimatedStyle]}>
        <Icons.Waveframe />

        <View style={styles.buttonTitleContainer}>
          <TextView style={styles.title} type='bold'>
            Grandpa Voice
          </TextView>

          <TextView style={styles.subTitle} type='regular'>
            Select voice
          </TextView>
        </View>
      </Animated.View>

      <Animated.View style={[styles.modalHeaderContainer, modalHeaderContainerAnimatedStyle]}>
        <View style={styles.modalTitleContainer}>
          <PressableView style={styles.closeIcon} onPress={handleCloseIconPress}>
            <Icons.Close />
          </PressableView>

          <TextView style={styles.title} type='medium'>
            Select voice
          </TextView>
        </View>
      </Animated.View>
    </PressableView>
  );
}

export default Header;

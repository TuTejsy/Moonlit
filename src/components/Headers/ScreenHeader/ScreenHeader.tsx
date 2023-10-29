import React, { ReactNode, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';

import { LARGE_TITLE_HEIGHT } from './ScreenHeader.constants';
import { makeStyles } from './ScreenHeader.styles';

export interface ScreenHeaderProps {
  color?: string;
  onGoBack?: () => void;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  scrollPositionSharedValue?: SharedValue<number>;
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  subtitle?: string;
  subtitleNumberOfLines?: number;
  subtitleTextStyles?: StyleProp<TextStyle>;
  title?: string;
  titleNumberOfLines?: number;
  titleTextStyles?: StyleProp<TextStyle>;
}

export const ScreenHeader = ({
  color,
  onGoBack,
  renderLeft,
  renderRight = null,
  scrollPositionSharedValue,
  style,
  subtitle,
  subtitleNumberOfLines = 1,
  subtitleTextStyles,
  title = '',
  titleNumberOfLines = 1,
  titleTextStyles,
}: ScreenHeaderProps) => {
  const navigation = useAppNavigation();

  const [horizontalInset, setHorizontalInset] = useState(0);
  const stylesContext = useMemo(() => ({ color, horizontalInset }), [horizontalInset, color]);

  const styles = useMakeStyles(makeStyles, stylesContext);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: scrollPositionSharedValue
      ? interpolate(
          scrollPositionSharedValue.value,
          [0, LARGE_TITLE_HEIGHT],
          [0, 1],
          Extrapolate.CLAMP,
        )
      : 1,
  }));

  const largeTitleAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: scrollPositionSharedValue
      ? interpolate(
          scrollPositionSharedValue.value,
          [0, LARGE_TITLE_HEIGHT],
          [0, -LARGE_TITLE_HEIGHT],
          Extrapolate.CLAMP,
        )
      : 0,
  }));

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setHorizontalInset((inset) => Math.max(nativeEvent.layout.width, inset));
  };

  const goBackHandler = () => {
    if (onGoBack) {
      onGoBack();
      return;
    }

    navigation.goBack();
  };

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        <View onLayout={onLayout}>
          {renderLeft === undefined ? (
            <PressableView hitSlop={EXTRA_TOUCH_AREA} onPress={goBackHandler}>
              <Icons.ArrowBack />
            </PressableView>
          ) : (
            renderLeft
          )}
        </View>

        <Animated.View pointerEvents='box-none' style={[styles.title, titleAnimatedStyle]}>
          <TextView numberOfLines={titleNumberOfLines} style={[styles.titleText, titleTextStyles]}>
            {title}
          </TextView>

          {subtitle && (
            <TextView
              numberOfLines={subtitleNumberOfLines}
              style={[styles.subtitleText, subtitleTextStyles]}
            >
              {subtitle}
            </TextView>
          )}
        </Animated.View>

        <View onLayout={onLayout}>{renderRight}</View>
      </View>

      {!!scrollPositionSharedValue && (
        <Animated.View style={[styles.largeTitleContainer, largeTitleAnimatedStyle]}>
          <TextView numberOfLines={titleNumberOfLines} style={styles.largeTitle} type='bold'>
            {title}
          </TextView>
        </Animated.View>
      )}
    </Animated.View>
  );
};

import React, { ReactNode, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';

import { LARGE_TITLE_HEIGHT } from './ScreenHeader.constants';
import { makeStyles } from './ScreenHeader.styles';

export interface ScreenHeaderProps {
  color?: string;
  onGoBack?: () => void;
  pointerEvents?: ViewProps['pointerEvents'];
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  scrollPositionSharedValue?: SharedValue<number>;
  style?: StyleProp<ViewStyle> | undefined;
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
  pointerEvents,
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
          Extrapolation.CLAMP,
        )
      : 1,
  }));

  const largeTitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: scrollPositionSharedValue
      ? interpolate(
          scrollPositionSharedValue.value,
          [0, LARGE_TITLE_HEIGHT],
          [1, 0],
          Extrapolation.CLAMP,
        )
      : 1,
    transform: [
      {
        translateY: scrollPositionSharedValue
          ? interpolate(
              scrollPositionSharedValue.value,
              [0, LARGE_TITLE_HEIGHT],
              [0, -LARGE_TITLE_HEIGHT],
              Extrapolation.CLAMP,
            )
          : 0,
      },
    ],
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
    <Animated.View pointerEvents={pointerEvents} style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        <View style={styles.controls} onLayout={onLayout}>
          {renderLeft === undefined ? (
            <TouchableOpacity hitSlop={EXTRA_TOUCH_AREA} onPress={goBackHandler}>
              <Icons.ArrowBack />
            </TouchableOpacity>
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
        <TextView
          animated
          numberOfLines={titleNumberOfLines}
          style={[styles.largeTitle, largeTitleAnimatedStyle]}
          type='bold'
        >
          {title}
        </TextView>
      )}
    </Animated.View>
  );
};

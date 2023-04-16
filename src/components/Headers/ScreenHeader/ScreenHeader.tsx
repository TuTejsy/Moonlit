import React, { ReactNode, useState } from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { EXTRA_TOUCH_AREA } from '../Headers.constants';
import { NavigationType } from '../Headers.types';

import { makeStyles } from './ScreenHeader.styles';

export interface ScreenHeaderProps {
  onGoBack?: () => void;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  subtitle?: string;
  subtitleNumberOfLines?: number;
  subtitleTextStyles?: StyleProp<TextStyle>;
  title?: string;
  titleNumberOfLines?: number;
  titleTextStyles?: StyleProp<TextStyle>;
}

export const ScreenHeader = ({
  onGoBack,
  renderLeft,
  renderRight = null,
  style,
  subtitle,
  subtitleNumberOfLines = 1,
  subtitleTextStyles,
  title = '',
  titleNumberOfLines = 1,
  titleTextStyles,
}: ScreenHeaderProps) => {
  const navigation = useNavigation<NavigationType>();

  const [horizontalInset, setHorizontalInset] = useState(0);
  const styles = useMakeStyles(makeStyles, { horizontalInset });

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
      <View onLayout={onLayout}>
        {renderLeft === undefined ? (
          <PressableView hitSlop={EXTRA_TOUCH_AREA} onPress={goBackHandler}>
            <Icons.ArrowBack />
          </PressableView>
        ) : (
          renderLeft
        )}
      </View>

      <View pointerEvents='box-none' style={styles.title}>
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
      </View>

      <View onLayout={onLayout}>{renderRight}</View>
    </Animated.View>
  );
};

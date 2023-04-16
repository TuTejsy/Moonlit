import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './ScrollShadow.styles';

interface Props {
  style: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
}

export const ScrollShadow = ({ style }: Props) => {
  const styles = useMakeStyles(makeStyles);

  return <Animated.View style={[styles.view, style]} />;
};

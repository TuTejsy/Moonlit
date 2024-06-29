/* eslint-disable no-restricted-imports */
import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import Animated from 'react-native-reanimated';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './TextView.styles';

export interface TextViewProps extends TextProps {
  animated?: boolean;
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
  type?: 'bold' | 'regular' | 'medium' | 'light';
}

export const TextView = ({
  animated = false,
  children,
  style,
  type = 'regular',
  ...props
}: TextViewProps) => {
  const styles = useMakeStyles(makeStyles);

  const textStyle = useMemo(() => {
    switch (type) {
      case 'bold': {
        return styles.bold;
      }

      case 'medium': {
        return styles.medium;
      }

      case 'light': {
        return styles.light;
      }

      default: {
        return styles.regular;
      }
    }
  }, [styles.bold, styles.light, styles.medium, styles.regular, type]);

  const TextComponent = animated ? Animated.Text : Text;

  return (
    <TextComponent
      suppressHighlighting
      allowFontScaling={false}
      style={[styles.text, textStyle, style]}
      textBreakStrategy='balanced'
      {...props}
    >
      {children}
    </TextComponent>
  );
};

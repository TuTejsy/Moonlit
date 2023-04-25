/* eslint-disable no-restricted-imports */
import React, { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './TextView.styles';

export interface TextViewProps extends TextProps {
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
  type?: 'bold' | 'regular' | 'medium';
}

export const TextView = ({ children, style, type = 'regular', ...props }: TextViewProps) => {
  const styles = useMakeStyles(makeStyles);

  const textStyle = useMemo(() => {
    switch (type) {
      case 'bold': {
        return styles.bold;
      }

      case 'medium': {
        return styles.medium;
      }

      default: {
        return styles.regular;
      }
    }
  }, [styles.bold, styles.medium, styles.regular, type]);

  return (
    <Text
      suppressHighlighting
      allowFontScaling={false}
      style={[styles.text, textStyle, style]}
      textBreakStrategy='balanced'
      {...props}
    >
      {children}
    </Text>
  );
};

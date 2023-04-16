/* eslint-disable no-restricted-imports */
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './TextView.styles';

export interface TextViewProps extends TextProps {
  bold?: boolean;
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

export const TextView = ({ bold, children, style, ...props }: TextViewProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <Text
      allowFontScaling={false}
      style={[styles.text, bold ? styles.bold : styles.regular, style]}
      textBreakStrategy='balanced'
      {...props}
    >
      {children}
    </Text>
  );
};

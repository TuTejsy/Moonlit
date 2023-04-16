import React from 'react';

import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { TextView, TextViewProps } from '../TextView/TextView';

import { makeStyles } from './GradientTextView.styles';

interface GradientTextProps extends TextViewProps {
  colors: string[];

  linearGradientProps?: Omit<LinearGradientProps, 'colors'>;
}

export const GradientTextView = ({ colors, linearGradientProps, ...props }: GradientTextProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <MaskedView maskElement={<TextView {...props} />}>
      <LinearGradient colors={colors} {...linearGradientProps}>
        <TextView {...props} style={[props.style, styles.text]} />
      </LinearGradient>
    </MaskedView>
  );
};

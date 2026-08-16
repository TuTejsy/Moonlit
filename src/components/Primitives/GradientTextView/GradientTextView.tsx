import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { TextStyle } from 'react-native';

import MaskedViewBase from '@react-native-masked-view/masked-view';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { TextView, TextViewProps } from '../TextView/TextView';

import { makeStyles } from './GradientTextView.styles';

const MaskedView = MaskedViewBase as unknown as ComponentType<{
  maskElement: ReactElement;
  children?: ReactNode;
}>;

type GradientTextViewProps = TextViewProps &
  Pick<LinearGradientProps, 'angle' | 'colors' | 'end' | 'locations' | 'start' | 'useAngle'> & {
    style?: TextStyle;
  };

export const GradientTextView = ({
  angle,
  children,
  colors,
  end,
  locations,
  start,
  style,
  useAngle,
  ...props
}: GradientTextViewProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <MaskedView
      maskElement={
        <TextView style={[style, styles.maskedText]} {...props}>
          {children}
        </TextView>
      }
    >
      <LinearGradient
        angle={angle}
        colors={colors}
        end={end}
        locations={locations}
        start={start}
        useAngle={useAngle}
      >
        <TextView style={[style, styles.text]} {...props}>
          {children}
        </TextView>
      </LinearGradient>
    </MaskedView>
  );
};

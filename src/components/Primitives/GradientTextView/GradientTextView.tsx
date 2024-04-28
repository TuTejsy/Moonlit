import { TextStyle } from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { TextView, TextViewProps } from '../TextView/TextView';

import { makeStyles } from './GradientTextView.styles';

interface GradientTextViewProps extends TextViewProps, LinearGradientProps {
  style?: TextStyle;
}

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

import { StyleProp, ViewStyle } from 'react-native';

import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

interface TrippleGradientProps extends LinearGradientProps {
  children?: React.ReactNode | React.ReactNode[];
  style?: StyleProp<ViewStyle>;
}

export const TrippleGradient = ({ children, style, ...props }: TrippleGradientProps) => {
  return (
    <LinearGradient {...props}>
      <LinearGradient {...props}>
        <LinearGradient {...props} style={style}>
          {children}
        </LinearGradient>
      </LinearGradient>
    </LinearGradient>
  );
};

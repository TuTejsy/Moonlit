import { memo, useMemo } from 'react';
import { ViewStyle } from 'react-native';

import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { PressableView } from '../Primitives/PressableView/PressableView';
import { TextView } from '../Primitives/TextView/TextView';

import { makeStyles } from './GradientButton.styles';

interface GradientButtonProps extends Omit<LinearGradientProps, 'colors'> {
  onPress: () => void;
  children?: string;
  colors?: Array<string>;
  style?: ViewStyle;
}

export const GradientButton = memo(
  ({ children, colors: gradientColors, onPress, style, ...props }: GradientButtonProps) => {
    const styles = useMakeStyles(makeStyles);

    const { colors } = useTheme();

    const defaultColors = useMemo(() => {
      return [colors.gradientButtonStart, colors.gradientButtonMiddle, colors.gradientButtonEnd];
    }, [colors.gradientButtonEnd, colors.gradientButtonMiddle, colors.gradientButtonStart]);

    return (
      <PressableView style={style} onPress={onPress}>
        <LinearGradient
          useAngle
          angle={45}
          colors={gradientColors || defaultColors}
          locations={[0, 0.5, 1]}
          style={styles.buttonGradient}
          {...props}
        >
          <TextView style={styles.buttonText} type='bold'>
            {children}
          </TextView>
        </LinearGradient>
      </PressableView>
    );
  },
);

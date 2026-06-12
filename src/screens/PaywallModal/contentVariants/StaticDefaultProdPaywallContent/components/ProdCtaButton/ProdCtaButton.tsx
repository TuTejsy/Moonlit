import React, { useCallback, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './ProdCtaButton.styles';
import type { ProdCtaButtonProps } from './ProdCtaButton.types';
import { useProdCtaAnimation } from './useProdCtaAnimation';

const GRADIENT_LOCATIONS: [number, number, number] = [0.052, 0.537, 0.999];

export const ProdCtaButton = ({ disabled = false, label, onPress, style }: ProdCtaButtonProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  const gradientColors: [string, string, string] = [
    colors.gradientPinkEnd,
    colors.iconPurple,
    colors.gradientButtonEnd,
  ];

  const { bleedStyle, chevronShakeStyle, shouldAnimate } = useProdCtaAnimation({
    containerWidth,
    disabled,
  });

  const handleLayout = useCallback(
    (width: number) => {
      if (width > 0 && width !== containerWidth) {
        setContainerWidth(width);
      }
    },
    [containerWidth],
  );

  return (
    <PressableView
      accessibilityRole='button'
      accessibilityState={{ disabled }}
      disabled={disabled}
      style={[styles.container, disabled ? styles.disabled : undefined, style]}
      testID='prod-cta-button'
      onPress={onPress}
    >
      <LinearGradient
        useAngle
        angle={97}
        colors={gradientColors}
        locations={GRADIENT_LOCATIONS}
        style={styles.inner}
        onLayout={(event) => {
          handleLayout(event.nativeEvent.layout.width);
        }}
      >
        <TextView style={styles.label}>{label}</TextView>

        <Animated.View pointerEvents='none' style={[styles.arrowContainer, chevronShakeStyle]}>
          <Icons.ChevronRight color={colors.white} size={24} />
        </Animated.View>

        {shouldAnimate && containerWidth > 0 ? (
          <Animated.View
            pointerEvents='none'
            style={[styles.bleedLayer, bleedStyle]}
            testID='prod-cta-bleed'
          >
            <Svg height='100%' width='100%'>
              <Defs>
                <SvgLinearGradient id='bleed' x1='0' x2='1' y1='0' y2='0'>
                  <Stop offset='0' stopColor={colors.white} stopOpacity={0} />
                  <Stop offset='0.35' stopColor={colors.white} stopOpacity={0.45} />
                  <Stop offset='0.5' stopColor={colors.white} stopOpacity={0.5} />
                  <Stop offset='0.65' stopColor={colors.white} stopOpacity={0.45} />
                  <Stop offset='1' stopColor={colors.white} stopOpacity={0} />
                </SvgLinearGradient>
              </Defs>
              <Rect fill='url(#bleed)' height='100%' width='100%' />
            </Svg>
          </Animated.View>
        ) : null}
      </LinearGradient>
    </PressableView>
  );
};

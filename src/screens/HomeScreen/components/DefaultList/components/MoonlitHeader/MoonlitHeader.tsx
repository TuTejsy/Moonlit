import React from 'react';
import { View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { GradientTextView } from '@/components/Primitives/GradientTextView/GradientTextView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import {
  MOONLIT_GRADIENT_ANGLE,
  MOONLIT_GRADIENT_COLORS,
  MOONLIT_GRADIENT_LOCATIONS,
} from './MoonlitHeader.constants';
import { makeStyles } from './MoonlitHeader.styles';
import { MoonlitHeaderProps } from './MoonlitHeader.types';
import { MoonlitStars } from './MoonlitStars';

export const MoonlitHeader = ({ style, ...props }: MoonlitHeaderProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.starsContainer}>
        <MoonlitStars />
      </View>

      <View style={styles.iconContainer}>
        <Icons.PlumpMoon height={81} width={81} />
      </View>

      <GradientTextView
        useAngle
        angle={MOONLIT_GRADIENT_ANGLE}
        colors={MOONLIT_GRADIENT_COLORS}
        locations={MOONLIT_GRADIENT_LOCATIONS}
        style={styles.title}
      >
        {localize('common', 'moonlit')}
      </GradientTextView>

      <TextView style={styles.subtitle}>
        {localize('common', 'moonlitFairytaleAtmosphere')}
      </TextView>
    </View>
  );
};

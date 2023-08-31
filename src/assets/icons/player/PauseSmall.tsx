import React from 'react';

import Svg, { SvgProps, Rect, Circle } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

interface PauseSmallProps extends SvgProps {
  fillCirlce?: string;
}

export const PauseSmall = ({ fillCirlce, ...props }: PauseSmallProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} fill='none' height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Circle cx={16} cy={16} fill={fillCirlce ?? colors.orange} r={16} />
      <Rect fill='currentColor' height={14} rx={1.38889} width={2.77777} x={11} y={9} />
      <Rect fill='currentColor' height={14} rx={1.38889} width={2.77777} x={18.2227} y={9} />
    </Svg>
  );
};

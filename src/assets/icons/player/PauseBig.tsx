import * as React from 'react';

import Svg, { SvgProps, Rect, Circle } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const PauseBig = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg height={72} viewBox='0 0 72 72' width={72} {...props}>
      <Circle cx={36} cy={36} fill={colors.white} r={36} />
      <Rect fill={colors.black} height={24} rx={2.5} width={5} x={27} y={24} />
      <Rect fill={colors.black} height={24} rx={2.5} width={5} x={27} y={24} />
      <Rect fill={colors.black} height={24} rx={2.5} width={5} x={40} y={24} />
      <Rect fill={colors.black} height={24} rx={2.5} width={5} x={40} y={24} />
    </Svg>
  );
};

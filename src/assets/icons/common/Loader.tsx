import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Loader = ({ stroke, strokeWidth = 5, ...props }: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} fill='none' height={60} viewBox='0 0 60 60' width={60} {...props}>
      <Path
        d='M30 7.5C42.4265 7.5 52.5 17.5736 52.5 30C52.5 42.4265 42.4265 52.5 30 52.5C17.5736 52.5 7.5 42.4265 7.5 30C7.5 17.5736 17.5736 7.5 30 7.5Z'
        stroke={stroke || colors.opacityWhite(0.3)}
        strokeLinecap='round'
        strokeWidth={strokeWidth}
      />
      <Path
        d='M30 7.5C42.4265 7.5 52.5 17.5736 52.5 30'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

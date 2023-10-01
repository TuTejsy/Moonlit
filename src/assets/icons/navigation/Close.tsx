import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Close = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={24} viewBox='0 0 24 24' width={24} {...props}>
      <Path
        d='M6 6L18 18M6 18L18 6'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      />
    </Svg>
  );
};

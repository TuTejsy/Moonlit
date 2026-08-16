import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

interface ChevronRightProps extends SvgProps {
  color?: string;
  size?: number;
}

export const ChevronRight = ({ color, size = 24, ...props }: ChevronRightProps) => {
  const { colors } = useTheme();
  const iconColor = color ?? colors.white;

  return (
    <Svg fill='none' height={size} viewBox='0 0 24 24' width={size} {...props}>
      <Path
        d='M9 18L15 12L9 6'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      />
    </Svg>
  );
};

import React from 'react';

import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const SettingsTab = ({ fill, ...props }: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} fill='none' height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Circle cx={16} cy={13} r={3} stroke='currentColor' strokeWidth={2} />

      <Path
        d='M9,24 C10,18 22,18 23,24'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      />
      <Circle cx={16} cy={16} r={11} stroke='currentColor' strokeWidth={2} />
    </Svg>
  );
};

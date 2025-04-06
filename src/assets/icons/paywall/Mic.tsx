import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Mic = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={16} viewBox='0 0 16 16' width={16} {...props}>
      <Path d="M10.3337 3.66732C10.3337 2.37865 9.28899 1.33398 8.00033 1.33398C6.71166 1.33398 5.66699 2.37865 5.66699 3.66732V8.00065C5.66699 9.28932 6.71166 10.334 8.00033 10.334C9.28899 10.334 10.3337 9.28932 10.3337 8.00065V3.66732Z" fill="white" stroke="white" strokeWidth="1.33333" strokeLinejoin="round"/>
      <Path d="M3 7.66699C3 10.4283 5.23867 12.667 8 12.667M8 12.667C10.7613 12.667 13 10.4283 13 7.66699M8 12.667V14.667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};


import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Share = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg
      color={colors.white}
      fill={colors.white}
      height={24}
      viewBox='0 0 24 24'
      width={24}
      {...props}
    >
      <Path d='M15.5 5.27273L14.2575 6.43455L12.8663 5.13364V14.2727H11.1337V5.13364L9.7425 6.43455L8.5 5.27273L12 2L15.5 5.27273ZM19 9.36364V18.3636C19 19.2636 18.2125 20 17.25 20H6.75C6.28587 20 5.84075 19.8276 5.51256 19.5207C5.18437 19.2138 5 18.7976 5 18.3636V9.36364C5 8.45545 5.77875 7.72727 6.75 7.72727H9.375V9.36364H6.75V18.3636H17.25V9.36364H14.625V7.72727H17.25C17.7141 7.72727 18.1592 7.89967 18.4874 8.20655C18.8156 8.51343 19 8.92965 19 9.36364Z' />
    </Svg>
  );
};

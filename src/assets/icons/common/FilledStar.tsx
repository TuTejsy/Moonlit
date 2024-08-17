import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const FilledStar = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.opacityWhite(0.5)} height={22} viewBox='0 0 22 22' width={22} {...props}>
      <Path
        d='M11 0L13.971 8.029L22 11L13.971 13.971L11 22L8.029 13.971L0 11L8.029 8.029L11 0Z'
        fill='currentColor'
      />
    </Svg>
  );
};

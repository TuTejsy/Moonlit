import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const RoundClose = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={24} viewBox='0 0 24 24' width={24} {...props}>
      <Path
        d='M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 10.586L9.172 7.757L7.757 9.172L10.586 12L7.757 14.828L9.172 16.243L12 13.414L14.828 16.243L16.243 14.828L13.414 12L16.243 9.172L14.828 7.757L12 10.586Z'
        fill='currentColor'
      />
    </Svg>
  );
};

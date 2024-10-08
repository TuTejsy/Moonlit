import React from 'react';

import Svg, { SvgProps, Path, G } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Clock = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={24} viewBox='0 0 24 24' width={24} {...props}>
      <G opacity={0.5}>
        <Path
          d='M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12.5 13H7V11.5H11V7H12.5V13Z'
          fill='currentColor'
        />
      </G>
    </Svg>
  );
};

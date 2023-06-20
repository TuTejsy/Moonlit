import React from 'react';

import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const PlaySmall = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.orange} height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Circle cx={16} cy={16} fill={colors.white} r={16} />
      <Path
        d='M21.5713 14.2681C22.9046 15.0379 22.9046 16.9624 21.5713 17.7322L14.7141 21.6912C13.3808 22.461 11.7141 21.4987 11.7141 19.9591L11.7141 12.0412C11.7141 10.5016 13.3808 9.53931 14.7141 10.3091L21.5713 14.2681Z'
        fill='currentColor'
      />
    </Svg>
  );
};

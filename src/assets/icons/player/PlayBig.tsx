import React from 'react';

import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const PlayBig = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.black} height={72} viewBox='0 0 72 72' width={72} {...props}>
      <Circle cx={36} cy={36} fill={colors.white} r={36} />
      <Path
        d='M49 34.2679C50.3333 35.0378 50.3333 36.9622 49 37.732L31 48.1244C29.6667 48.8942 28 47.9319 28 46.3923L28 25.6077C28 24.0681 29.6667 23.1058 31 23.8756L49 34.2679Z'
        fill='currentColor'
      />
    </Svg>
  );
};

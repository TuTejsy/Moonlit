import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Favorite = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.red} fill={colors.red} height={24} viewBox='0 0 24 24' width={24} {...props}>
      <Path d='M12 20L10.84 18.921C6.72 15.1035 4 12.5777 4 9.49591C4 6.97003 5.936 5 8.4 5C9.792 5 11.128 5.66213 12 6.70027C12.872 5.66213 14.208 5 15.6 5C18.064 5 20 6.97003 20 9.49591C20 12.5777 17.28 15.1035 13.16 18.921L12 20Z' />
    </Svg>
  );
};

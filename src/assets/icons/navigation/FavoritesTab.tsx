import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const FavoritesTab = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Path
        d='M15.0534 24.1679L15.052 24.1666C12.1485 21.502 9.81853 19.3584 8.20277 17.3578C6.59835 15.3712 5.7998 13.6458 5.7998 11.8339C5.7998 8.87352 8.07258 6.59961 10.9598 6.59961C12.6018 6.59961 14.1977 7.37846 15.2371 8.6041L15.9998 9.50345L16.7625 8.6041C17.8019 7.37846 19.3978 6.59961 21.0398 6.59961C23.927 6.59961 26.1998 8.87352 26.1998 11.8339C26.1998 13.6458 25.4013 15.3712 23.7968 17.3578C22.1811 19.3584 19.8511 21.502 16.9476 24.1666L16.9462 24.1679L15.9998 25.0399L15.0534 24.1679Z'
        stroke='currentColor'
        strokeWidth={2}
      />
    </Svg>
  );
};

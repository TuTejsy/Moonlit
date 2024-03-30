import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

interface FavoriteBigIconProps extends SvgProps {
  isFavorite: boolean;
  inactiveOpacity?: number;
}

export const FavoriteBig = ({
  inactiveOpacity = 0.8,
  isFavorite,
  ...props
}: FavoriteBigIconProps) => {
  const { colors } = useTheme();

  const fillColor = isFavorite ? colors.red : colors.opacityWhite(inactiveOpacity);

  return (
    <Svg fill={fillColor} height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Path d='M15.9993 28L14.066 26.2736C7.19935 20.1657 2.66602 16.1243 2.66602 11.1935C2.66602 7.15204 5.89268 4 9.99935 4C12.3193 4 14.546 5.0594 15.9993 6.72044C17.4527 5.0594 19.6793 4 21.9993 4C26.106 4 29.3327 7.15204 29.3327 11.1935C29.3327 16.1243 24.7993 20.1657 17.9327 26.2736L15.9993 28Z' />
    </Svg>
  );
};

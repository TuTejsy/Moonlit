import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

interface MoonIconProps extends SvgProps {}

export const Moon = ({ origin, rotation, ...props }: MoonIconProps) => {
  const { colors } = useTheme();

  return (
    <Svg height={74} viewBox='0 0 74 74' width={74} {...props}>
      <Path
        clipRule='evenodd'
        d='M74.0003 51.8845C68.2468 55.2662 61.5435 57.2054 54.3873 57.2054C32.9796 57.2054 15.6253 39.8511 15.6253 18.4435C15.6253 12.0387 17.1787 5.99677 19.9292 0.673828C8.47131 7.40836 0.780273 19.8634 0.780273 34.1148C0.780273 55.5225 18.1346 72.8768 39.5422 72.8768C54.5451 72.8768 67.5572 64.3533 74.0003 51.8845Z'
        fill={colors.white}
        fillRule='evenodd'
        origin={origin}
        rotation={rotation}
        stroke={colors.white}
      />
    </Svg>
  );
};

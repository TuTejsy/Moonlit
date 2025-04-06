import React from 'react';

import Svg, { SvgProps, Path, G, Mask, Defs, Rect, ClipPath} from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Record = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={16} viewBox='0 0 16 16' width={16} {...props}>
      <G clipPath="url(#clip0_2200_2877)">
      <Mask id="mask0_2200_2877" style={{ maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
      <Path d="M7.99967 14.6673C11.6817 14.6673 14.6663 11.6827 14.6663 8.00065C14.6663 4.31865 11.6817 1.33398 7.99967 1.33398C4.31767 1.33398 1.33301 4.31865 1.33301 8.00065C1.33301 11.6827 4.31767 14.6673 7.99967 14.6673Z" fill="white" stroke="white" strokeWidth="1.33333"/>
      <Path d="M10 6.00033V10.0003M12 7.33366V8.66699M6 6.00033V10.0003M4 7.33366V8.66699M8 4.66699V11.3337" stroke="black" strokeWidth="1.33333" strokeLinecap="round"/>
      </Mask>
      <G mask="url(#mask0_2200_2877)">
      <Path d="M0 0H16V16H0V0Z" fill="currentColor"/>
      </G>
      </G>
      <Defs>
      <ClipPath id="clip0_2200_2877">
      <Rect width="16" height="16" fill="currentColor"/>
      </ClipPath>
      </Defs>
    </Svg>
  );
};

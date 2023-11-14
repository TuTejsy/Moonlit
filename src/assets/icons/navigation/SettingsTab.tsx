import React from 'react';

import Svg, { SvgProps, Circle, Mask, G, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const SettingsTab = ({ fill, ...props }: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} fill='none' height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Circle cx={16} cy={13} r={3} stroke='currentColor' strokeWidth={2} />
      <Mask height={24} id='mask0_1201_1583' maskUnits='userSpaceOnUse' width={24} x={4} y={4}>
        <Circle cx={16} cy={16} fill='currentColor' r={10} />
      </Mask>
      <G mask='url(#mask0_1201_1583)'>
        <Path
          d='M28 32C28 38.6274 22.6274 44 16 44C9.37258 44 4 38.6274 4 32C4 28.5651 5.44318 25.4673 7.75626 23.2798C9.90613 21.2467 12.8075 20 16 20C19.2359 20 22.1727 21.2808 24.331 23.3631C26.593 25.5456 28 28.6085 28 32Z'
          stroke={colors.white}
          strokeWidth={2}
        />
      </G>
      <Circle cx={16} cy={16} r={11} stroke='currentColor' strokeWidth={2} />
    </Svg>
  );
};

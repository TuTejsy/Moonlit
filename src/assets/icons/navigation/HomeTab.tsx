import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const HomeTab = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Path
        d='M13.3335 17.6666H12.3335V18.6666V25.3333C12.3335 25.5143 12.1812 25.6666 12.0001 25.6666H8.00013C7.81908 25.6666 7.6668 25.5143 7.6668 25.3333V16V15H6.6668H5.27668L15.7736 5.5452C15.7739 5.54495 15.7742 5.5447 15.7744 5.54445C15.9012 5.43178 16.0991 5.4318 16.2259 5.5445C16.2261 5.54473 16.2264 5.54497 16.2267 5.5452L26.7236 15H25.3335H24.3335V16V25.3333C24.3335 25.5143 24.1812 25.6666 24.0001 25.6666H20.0001C19.8191 25.6666 19.6668 25.5143 19.6668 25.3333V18.6666V17.6666H18.6668H13.3335Z'
        stroke='currentColor'
        strokeWidth={2}
      />
    </Svg>
  );
};

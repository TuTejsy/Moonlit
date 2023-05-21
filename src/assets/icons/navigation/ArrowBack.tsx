import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const ArrowBack = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg
      color={colors.white}
      fill={colors.white}
      height={24}
      viewBox='0 0 24 24'
      width={24}
      {...props}
    >
      <Path d='M15.0184 19.6834L7.25347 12.591C7.1613 12.5066 7.09587 12.4151 7.05716 12.3166C7.01845 12.2181 6.9994 12.1126 7.00001 12C7.00001 11.8874 7.01937 11.7819 7.05808 11.6834C7.09679 11.5849 7.16192 11.4934 7.25347 11.409L15.0184 4.29551C15.2335 4.0985 15.5023 4 15.8249 4C16.1475 4 16.424 4.10554 16.6544 4.31662C16.8848 4.5277 17 4.77397 17 5.05541C17 5.33685 16.8848 5.58311 16.6544 5.7942L9.88019 12L16.6544 18.2058C16.8694 18.4028 16.977 18.6457 16.977 18.9345C16.977 19.2232 16.8618 19.4729 16.6313 19.6834C16.4009 19.8945 16.1321 20 15.8249 20C15.5177 20 15.2489 19.8945 15.0184 19.6834Z' />
    </Svg>
  );
};

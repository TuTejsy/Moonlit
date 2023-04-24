import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const SearchTab = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.white} height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Path
        d='M21.8652 20.5165L21.3048 21.2156L21.9384 21.8491L25.7853 25.6951L25.6951 25.7853L21.8491 21.9384L21.2156 21.3048L20.5165 21.8652C19.0002 23.0808 17.1142 23.7419 15.1708 23.7391H15.1694C10.4391 23.7391 6.59961 19.8996 6.59961 15.1694C6.59961 10.4391 10.4391 6.59961 15.1694 6.59961C19.8996 6.59961 23.7391 10.4391 23.7391 15.1694L23.7391 15.1708C23.7419 17.1142 23.0808 19.0002 21.8652 20.5165Z'
        stroke='currentColor'
        strokeWidth={2}
      />
    </Svg>
  );
};

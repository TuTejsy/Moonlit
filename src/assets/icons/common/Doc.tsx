import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const Doc = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg color={colors.opacityWhite(0.5)} height={24} viewBox='0 0 24 24' width={24} {...props}>
      <Path
        clipRule='evenodd'
        d='M17 5H7C6.73478 5 6.48043 5.10536 6.29289 5.29289C6.10536 5.48043 6 5.73478 6 6V18C6 18.2652 6.10536 18.5196 6.29289 18.7071C6.48043 18.8946 6.73478 19 7 19H17C17.2652 19 17.5196 18.8946 17.7071 18.7071C17.8946 18.5196 18 18.2652 18 18V6C18 5.73478 17.8946 5.48043 17.7071 5.29289C17.5196 5.10536 17.2652 5 17 5ZM7 3C6.20435 3 5.44129 3.31607 4.87868 3.87868C4.31607 4.44129 4 5.20435 4 6V18C4 18.7956 4.31607 19.5587 4.87868 20.1213C5.44129 20.6839 6.20435 21 7 21H17C17.7956 21 18.5587 20.6839 19.1213 20.1213C19.6839 19.5587 20 18.7956 20 18V6C20 5.20435 19.6839 4.44129 19.1213 3.87868C18.5587 3.31607 17.7956 3 17 3H7Z'
        fill='currentColor'
        fillRule='evenodd'
      />
      <Path d='M8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H13V17H8V15Z' fill='currentColor' />
    </Svg>
  );
};

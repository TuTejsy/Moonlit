import React from 'react';

import Svg, { SvgProps, Path, Defs, Stop, LinearGradient } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

interface PlumpMoonIconProps extends SvgProps {}

export const PlumpMoon = ({ color, ...props }: PlumpMoonIconProps) => {
  const { colors } = useTheme();
  const iconColor = color || colors.white;

  return (
    <Svg color={iconColor} height={81} viewBox='0 0 81 81' width={81} {...props}>
      <Path
        d='M74.5265 47.5267C72.4823 54.1996 68.3857 60.0578 62.8194 64.2677C57.9325 67.9458 52.1171 70.1891 46.026 70.7457C39.9349 71.3023 33.8092 70.1503 28.3365 67.4188C22.8638 64.6874 18.2607 60.4847 15.0438 55.2825C11.827 50.0803 10.1237 44.0845 10.1252 37.968C10.1034 30.8288 12.4242 23.8796 16.7317 18.1863C20.9416 12.6201 26.7998 8.5234 33.4728 6.47927C33.9126 6.34385 34.381 6.33089 34.8276 6.44177C35.2742 6.55265 35.6821 6.78318 36.0075 7.10857C36.3329 7.43397 36.5635 7.84191 36.6743 8.28853C36.7852 8.73514 36.7723 9.20354 36.6368 9.64334C35.1777 14.4699 35.0554 19.6019 36.2828 24.4925C37.5103 29.3831 40.0417 33.849 43.6071 37.4145C47.1725 40.9799 51.6385 43.5112 56.5291 44.7387C61.4197 45.9662 66.5517 45.8439 71.3782 44.3847C71.818 44.2493 72.2864 44.2364 72.733 44.3472C73.1797 44.4581 73.5876 44.6886 73.913 45.014C74.2384 45.3394 74.4689 45.7474 74.5798 46.194C74.6907 46.6406 74.6777 47.109 74.5423 47.5488L74.5265 47.5267Z'
        fill='url(#paint0_linear_2286_814)'
      />
      <Path
        d='M57.5 28L58.1752 30.2842L60 31.1295L58.1752 31.9747L57.5 34.259L56.8248 31.9747L55 31.1295L56.8248 30.2842L57.5 28Z'
        fill={colors.white}
        opacity={0.4}
      />
      <Defs>
        <LinearGradient
          gradientUnits='userSpaceOnUse'
          id='paint0_linear_2286_814'
          x1='18.9243'
          x2='68.1028'
          y1='15.2468'
          y2='63.5214'
        >
          <Stop stopColor={iconColor} />
          <Stop offset='1' stopColor={iconColor} stopOpacity={0.5} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

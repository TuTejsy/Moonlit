/* eslint-disable react-native/no-unused-styles */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Svg, { SvgProps, Path } from 'react-native-svg';

import { IS_ANDROID, IS_IOS } from '@/constants/common';
import { MakeStylesProps, useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    blurView: {
      backgroundColor: colors.opacityBlack(0.1),
      height: 24,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 24,
    },
    container: StyleSheet.flatten([
      {
        alignItems: 'center',
        borderRadius: 12,
        height: 24,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        width: 24,
      },
      IS_ANDROID && {
        backgroundColor: colors.opacityBlack(0.1),
      },
    ]),
  });

export const Check = ({ style, ...props }: SvgProps) => {
  const { colors } = useTheme();

  const styles = useMakeStyles(makeStyles);

  return (
    <View style={[styles.container, style]}>
      {IS_IOS && (
        <BlurView
          blurAmount={5}
          blurType='light'
          reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
          style={styles.blurView}
        />
      )}

      <Svg color={colors.orange} height={24} viewBox='0 0 24 24' width={24} {...props}>
        <Path
          d='M18.7104 7.20986C18.6175 7.11613 18.5069 7.04174 18.385 6.99097C18.2632 6.9402 18.1324 6.91406 18.0004 6.91406C17.8684 6.91406 17.7377 6.9402 17.6159 6.99097C17.494 7.04174 17.3834 7.11613 17.2904 7.20986L9.84044 14.6699L6.71044 11.5299C6.61392 11.4366 6.49998 11.3633 6.37512 11.3141C6.25026 11.2649 6.11694 11.2408 5.98276 11.2431C5.84858 11.2454 5.71617 11.2741 5.59309 11.3276C5.47001 11.3811 5.35868 11.4583 5.26544 11.5549C5.1722 11.6514 5.09889 11.7653 5.04968 11.8902C5.00048 12.015 4.97635 12.1484 4.97867 12.2825C4.98099 12.4167 5.00972 12.5491 5.06321 12.6722C5.1167 12.7953 5.19392 12.9066 5.29044 12.9999L9.13044 16.8399C9.2234 16.9336 9.334 17.008 9.45586 17.0588C9.57772 17.1095 9.70843 17.1357 9.84044 17.1357C9.97245 17.1357 10.1032 17.1095 10.225 17.0588C10.3469 17.008 10.4575 16.9336 10.5504 16.8399L18.7104 8.67986C18.8119 8.58622 18.893 8.47257 18.9484 8.34607C19.0038 8.21957 19.0324 8.08296 19.0324 7.94486C19.0324 7.80676 19.0038 7.67015 18.9484 7.54365C18.893 7.41715 18.8119 7.3035 18.7104 7.20986Z'
          fill='currentColor'
        />
      </Svg>
    </View>
  );
};

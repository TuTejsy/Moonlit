/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Svg, { SvgProps, Path } from 'react-native-svg';

import { MakeStylesProps, useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    blurView: {
      height: 32,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 32,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 16,
      height: 32,
      justifyContent: 'center',
      overflow: 'hidden',
      width: 32,
    },
  });

export const Unlock = ({ style, ...props }: SvgProps) => {
  const { colors } = useTheme();

  const styles = useMakeStyles(makeStyles);

  return (
    <View style={[styles.container, style]}>
      <BlurView
        blurAmount={2}
        blurType='light'
        overlayColor={colors.opacityWhite(0.1)}
        reducedTransparencyFallbackColor={colors.opacityWhite(0.1)}
        style={styles.blurView}
      />
      <Svg color={colors.white} height={16} viewBox='0 0 16 16' width={16} {...props}>
        <Path
          d='M4.00033 5.33366H10.0003V4.00033C10.0003 3.44477 9.80588 2.97255 9.41699 2.58366C9.0281 2.19477 8.55588 2.00033 8.00033 2.00033C7.44477 2.00033 6.97255 2.19477 6.58366 2.58366C6.19477 2.97255 6.00033 3.44477 6.00033 4.00033H4.66699C4.66699 3.0781 4.9921 2.29188 5.64233 1.64166C6.29255 0.991437 7.07855 0.666548 8.00033 0.666993C8.92255 0.666993 9.70877 0.992104 10.359 1.64233C11.0092 2.29255 11.3341 3.07855 11.3337 4.00033V5.33366H12.0003C12.367 5.33366 12.681 5.46433 12.9423 5.72566C13.2037 5.98699 13.3341 6.30077 13.3337 6.66699V13.3337C13.3337 13.7003 13.203 14.0143 12.9417 14.2757C12.6803 14.537 12.3665 14.6674 12.0003 14.667H4.00033C3.63366 14.667 3.31966 14.5363 3.05833 14.275C2.79699 14.0137 2.66655 13.6999 2.66699 13.3337V6.66699C2.66699 6.30033 2.79766 5.98633 3.05899 5.72499C3.32033 5.46366 3.6341 5.33321 4.00033 5.33366ZM8.00033 11.3337C8.36699 11.3337 8.68099 11.203 8.94233 10.9417C9.20366 10.6803 9.3341 10.3665 9.33366 10.0003C9.33366 9.63366 9.20299 9.31966 8.94166 9.05833C8.68033 8.79699 8.36655 8.66655 8.00033 8.66699C7.63366 8.66699 7.31966 8.79766 7.05833 9.05899C6.79699 9.32033 6.66655 9.6341 6.66699 10.0003C6.66699 10.367 6.79766 10.681 7.05899 10.9423C7.32033 11.2037 7.6341 11.3341 8.00033 11.3337Z'
          fill='currentColor'
        />
      </Svg>
    </View>
  );
};

import React, { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { VibrancyView } from '@react-native-community/blur';

import { Spinner } from '@/components/Spinner/Spinner';
import { IS_IOS } from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './AbsoluteSpinnerView.styles';
import { useDelayLoader } from './hooks/useDelayLoader';

export interface AbsoluteSpinnerViewProps {
  color?: string;
  delay?: number;
  enableBlur?: boolean;
  show?: boolean;
  spinnerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export const AbsoluteSpinnerView = memo(
  ({
    color,
    delay = 500,
    enableBlur = true,
    show = true,
    spinnerStyle,
    style,
  }: AbsoluteSpinnerViewProps) => {
    const styles = useMakeStyles(makeStyles);
    const showSpinner = useDelayLoader(show, delay);

    if (!showSpinner) {
      return null;
    }

    return enableBlur ? (
      IS_IOS ? (
        <VibrancyView blurAmount={5} blurType='dark' style={[styles.spinnerContainer, style]}>
          <Spinner color={color} style={spinnerStyle} />
        </VibrancyView>
      ) : (
        <View style={[styles.spinnerContainer, styles.androidBackground, style]}>
          <Spinner color={color} style={spinnerStyle} />
        </View>
      )
    ) : (
      <View style={[styles.spinnerContainer, style]}>
        <Spinner color={color} style={spinnerStyle} />
      </View>
    );
  },
);

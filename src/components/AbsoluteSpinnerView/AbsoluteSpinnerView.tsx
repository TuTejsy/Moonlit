import React, { memo, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { VibrancyView } from '@react-native-community/blur';

import { Spinner } from '@/components/Spinner/Spinner';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './AbsoluteSpinnerView.styles';
import { useDelayLoader } from './hooks/useDelayLoader';

export interface AbsoluteSpinnerViewProps {
  delay?: number;
  show?: boolean;
  spinnerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export const AbsoluteSpinnerView = memo(
  ({ delay = 500, show = true, spinnerStyle, style }: AbsoluteSpinnerViewProps) => {
    const styles = useMakeStyles(makeStyles);
    const showSpinner = useDelayLoader(show, delay);

    if (!showSpinner) {
      return null;
    }

    return (
      <VibrancyView blurAmount={5} blurType='dark' style={[styles.spinnerContainer, style]}>
        <Spinner style={spinnerStyle} />
      </VibrancyView>
    );
  },
);

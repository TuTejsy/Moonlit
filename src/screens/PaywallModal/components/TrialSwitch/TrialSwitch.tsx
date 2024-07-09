import React from 'react';
import { Switch, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/theme/useTheme';

import { styles } from './TrialSwitch.styles';

interface TrialSwitchProps {
  onValueChange: (value: boolean) => void;
  value: boolean;
  style?: ViewStyle;
}

export const TrialSwitch = React.memo(({ onValueChange, style, value }: TrialSwitchProps) => {
  const { colors } = useTheme();
  return (
    <Switch
      style={[styles.switch, style]}
      thumbColor={colors.white}
      value={value}
      trackColor={{
        false: colors.opacityWhite(0.2),
        true: colors.gradientButtonStart,
      }}
      onValueChange={onValueChange}
    />
  );
});

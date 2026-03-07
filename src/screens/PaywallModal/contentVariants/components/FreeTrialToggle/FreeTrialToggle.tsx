import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { TrialSwitch } from '../TrialSwitch/TrialSwitch';

import { makeStyles } from './FreeTrialToggle.styles';

interface FreeTrialToggleProps {
  isFreeTrialEnabled: boolean;
  onValueChange: (value: boolean) => void;
}

export const FreeTrialToggle = ({ isFreeTrialEnabled, onValueChange }: FreeTrialToggleProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={styles.freeTrialContainer}>
      <View style={styles.freeTrialTextContainer}>
        <TextView style={styles.freeTrialTitle} type='bold'>
          {localize('paywall', 'notSureYet')}
        </TextView>
        <TextView style={styles.freeTrialSubtitle}>
          {localize('paywall', 'enableFreeTrial')}
        </TextView>
      </View>

      <TrialSwitch
        style={styles.freeTrialSwitch}
        value={isFreeTrialEnabled}
        onValueChange={onValueChange}
      />
    </View>
  );
};

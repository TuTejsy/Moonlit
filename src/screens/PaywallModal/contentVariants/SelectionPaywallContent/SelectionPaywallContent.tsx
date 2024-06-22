import { useMemo } from 'react';
import { View, Image } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';

import { makeStyles } from './SelectionPaywallContent.styles';

interface SelectionPaywallContentProps {
  fullProduct: AdaptyPaywallProduct | undefined;
  isFreeTrialEnabled: boolean;
  onTrialEnabledChanged: (isEnabled: boolean) => void;
  trialProduct: AdaptyPaywallProduct | undefined;
}

export const SelectionPaywallContent = ({
  fullProduct,
  isFreeTrialEnabled,
  onTrialEnabledChanged,
  trialProduct,
}: SelectionPaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <>
      <TextView style={styles.title} type='bold'>
        Get access{`\n`}to all tales
      </TextView>

      <TextView style={styles.subtitle} type='regular'>
        Discover unique voices and{`\n`}listen to classic fary tales
      </TextView>

      <Image source={voicesImage} style={styles.voicesImage} />

      <View style={[styles.productContainer, styles.selectedProductContainer]}>
        <View>
          <TextView>YEARLY</TextView>
          <TextView>just</TextView>
        </View>

        <View>
          <TextView>0.99</TextView>
          <TextView>per week</TextView>
        </View>

        <View>
          <View />
        </View>
      </View>

      <View style={styles.productContainer}>
        <View>
          <TextView>YEARLY</TextView>
          <TextView>just</TextView>
        </View>

        <View>
          <TextView>0.99</TextView>
          <TextView>per week</TextView>
        </View>

        <View>
          <View />
        </View>
      </View>

      <View style={styles.freeTrialContainer}>
        <TextView style={styles.freeTrialText}>Enable free trial</TextView>

        <TrialSwitch value={isFreeTrialEnabled} onValueChange={onTrialEnabledChanged} />
      </View>

      <TextView style={styles.promotionText} type='regular'>
        Auto-renewable. Cancel anytime
      </TextView>
    </>
  );
};

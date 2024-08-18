import { useCallback, useMemo } from 'react';
import { View, Image } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';

import { makeStyles } from './SwitcherPaywallContent.styles';

interface SwitcherPaywallContentProps {
  isFreeTrialEnabled: boolean;
  isTrialEligible: boolean;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  trialProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const SwitcherPaywallContent = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onSelectProduct,
  trialProduct,
  yearlyProduct,
}: SwitcherPaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);
  const { isSquareScreen } = useLayout();

  const productText = useMemo(() => {
    if (isFreeTrialEnabled) {
      const offerDays =
        trialProduct?.subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

      const price = trialProduct?.price?.amount;
      const currencyCode = trialProduct?.price?.currencyCode;

      return `${offerDays} days free, then ${price} ${currencyCode}/week`;
    }
    const price = yearlyProduct?.price?.amount;
    const currencyCode = yearlyProduct?.price?.currencyCode;

    const subscriptionPeriod = yearlyProduct?.subscriptionDetails?.subscriptionPeriod.unit;

    return `Try it now, just ${price} ${currencyCode}/${subscriptionPeriod}`;
  }, [
    yearlyProduct?.price?.amount,
    yearlyProduct?.price?.currencyCode,
    yearlyProduct?.subscriptionDetails?.subscriptionPeriod.unit,
    isFreeTrialEnabled,
    trialProduct?.price?.amount,
    trialProduct?.price?.currencyCode,
    trialProduct?.subscriptionDetails?.introductoryOffers,
  ]);

  const handleTrialEnabledChanged = useCallback(
    (isEnabled: boolean) => {
      onSelectProduct(isEnabled && isTrialEligible ? trialProduct : yearlyProduct);
    },
    [onSelectProduct, isTrialEligible, trialProduct, yearlyProduct],
  );

  return (
    <>
      <TextView style={styles.title} type='bold'>
        Get access to{isSquareScreen ? ' ' : `\n`}all tales
      </TextView>

      <TextView style={styles.subtitle} type='regular'>
        Discover unique voices and{isSquareScreen ? ' ' : `\n`}listen to classic fary tales
      </TextView>

      <Image source={voicesImage} style={styles.voicesImage} />

      <TextView style={styles.promotionText} type='regular'>
        {productText}
        {`\n`}
        Auto-renewable. Cancel anytime
      </TextView>

      <View style={styles.freeTrialContainer}>
        <View style={styles.freeTrialTextContainer}>
          <TextView style={styles.freeTrialTitle} type='bold'>
            Not sure yet
          </TextView>
          <TextView style={styles.freeTrialSubtitle}>Enable free trial</TextView>
        </View>

        <TrialSwitch value={isFreeTrialEnabled} onValueChange={handleTrialEnabledChanged} />
      </View>
    </>
  );
};

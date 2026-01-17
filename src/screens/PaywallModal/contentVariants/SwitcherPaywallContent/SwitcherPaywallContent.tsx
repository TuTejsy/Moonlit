import { useCallback, useMemo } from 'react';
import { View, Image } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { FooterActions } from '../../components/FooterActions/FooterActions';
import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';
import voicesLandscapeImage from '../../images/voicesLandscape/voicesLandscape.png';

import { makeStyles } from './SwitcherPaywallContent.styles';
import { useAppLocalization } from '@/localization/useAppLocalization';

interface SwitcherPaywallContentProps {
  isFreeTrialEnabled: boolean;
  isTrialEligible: boolean;
  onRestorePress: () => void;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  onUnlockPress: () => void;
  trialProduct: AdaptyPaywallProduct | undefined;
  unlockButtonText: string;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const SwitcherPaywallContent = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onRestorePress,
  onSelectProduct,
  onUnlockPress,
  trialProduct,
  unlockButtonText,
  yearlyProduct,
}: SwitcherPaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);
  const { isLandscape, isSquareScreen } = useLayout();
  const { localize } = useAppLocalization();

  const productText = useMemo(() => {
    if (isFreeTrialEnabled) {
      const offerDays =
        trialProduct?.subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

      const price = trialProduct?.price?.amount;
      const currencyCode = trialProduct?.price?.currencyCode;

      return `${offerDays} ${localize("paywall", "daysFreeThen")} ${price} ${currencyCode}/${localize("paywall", "week")}`;
    }
    const price = yearlyProduct?.price?.amount;
    const currencyCode = yearlyProduct?.price?.currencyCode;

    const subscriptionPeriod = yearlyProduct?.subscriptionDetails?.subscriptionPeriod.unit;

    return `${localize("paywall", "tryItNotJust")} ${price} ${currencyCode}/${subscriptionPeriod}`;
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
      {isSquareScreen && <Image source={voicesLandscapeImage} style={styles.voicesFullImage} />}

      <View style={styles.content}>
        <View style={styles.block}>
          <TextView style={styles.title} type='bold'>
            {localize("paywall", "getAccessToAllTales")}
          </TextView>

          <TextView style={styles.subtitle} type='regular'>
            {localize("paywall", "discoverUniqueVoicesAndListenToClassicFairyTales")}
          </TextView>

          {!isSquareScreen && (
            <Image
              source={isLandscape ? voicesLandscapeImage : voicesImage}
              style={isLandscape ? styles.voicesFullImage : styles.voicesImage}
            />
          )}
        </View>

        <View style={[styles.block, styles.productBlock]}>
          <TextView style={styles.promotionText} type='regular'>
            {productText}
            {`\n`}
            {localize("paywall", "autoRenewableCancelAnytime")}
          </TextView>

          <View style={styles.freeTrialContainer}>
            <View style={styles.freeTrialTextContainer}>
              <TextView style={styles.freeTrialTitle} type='bold'>
                {localize("paywall", "notSureYet")}
              </TextView>
              <TextView style={styles.freeTrialSubtitle}>{localize("paywall", "enableFreeTrial")}</TextView>
            </View>

            <TrialSwitch value={isFreeTrialEnabled} onValueChange={handleTrialEnabledChanged} />
          </View>
          <GradientButton style={styles.button} onPress={onUnlockPress}>
            {unlockButtonText}
          </GradientButton>

          <FooterActions onRestorePress={onRestorePress} />
        </View>
      </View>
    </>
  );
};

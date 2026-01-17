import { useCallback, useMemo, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { FooterActions } from '../../components/FooterActions/FooterActions';
import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';

import { WEEKS_IN_YEAR } from './ScrollablePaywallContent.constants';
import { makeStyles } from './ScrollablePaywallContent.styles';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { Icons } from '@/assets/icons/Icons';
import yearlyProductBackgroundImage from './images/yearlyProductBackground/yearlyProductBackground.png';
import { useAppLocalization } from '@/localization/useAppLocalization';

// eslint-disable-next-line import/no-unresolved

interface ScrollablePaywallContentProps {
  isFreeTrialEnabled: boolean;
  isTrialEligible: boolean;
  onRestorePress: () => void;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  onUnlockPress: () => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
  unlockButtonText: string;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const ScrollablePaywallContent = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onRestorePress,
  onSelectProduct,
  onUnlockPress,
  selectedProduct,
  trialProduct,
  unlockButtonText,
  weeklyProduct,
  yearlyProduct,
}: ScrollablePaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);

  const [isFreeTrialToggle, setIsFreeTrialToggle] = useState(isFreeTrialEnabled);

  const { localize } = useAppLocalization();

  const yearlyPricePerWeek = useMemo(
    () => (yearlyProduct?.price?.amount || 0) / WEEKS_IN_YEAR,
    [yearlyProduct?.price?.amount],
  );

  const selectedProductPriceText = useMemo(() => {
    const period = selectedProduct?.subscriptionDetails?.localizedSubscriptionPeriod?.replace(
      '1 ',
      '',
    );

    return `${selectedProduct?.price?.currencySymbol}${
      selectedProduct?.price?.amount || 0
    } /${period}`;
  }, [selectedProduct?.price?.amount, selectedProduct?.price?.currencySymbol]);

  const secondProductText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays =
        trialProduct?.subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

      return `${offerDays}-${localize("paywall", "DAY_FREE_TRIAL")}`;
    }

    return localize("paywall", "WEEKLY");
  }, [isFreeTrialToggle, trialProduct?.subscriptionDetails?.introductoryOffers]);

  const yearlyPricePerWeekText = useMemo(
    () => `${yearlyProduct?.price?.currencySymbol}${yearlyPricePerWeek.toFixed(2)} / ${localize("paywall", "week")}`,
    [yearlyPricePerWeek, yearlyProduct?.price?.currencySymbol],
  );

  const pricesDiffInPercentsText = useMemo(() => {
    const trialPricePerWeek = trialProduct?.price?.amount || 0;

    const pricesDiffInPercents = Math.round(
      ((trialPricePerWeek - yearlyPricePerWeek) / trialPricePerWeek) * 100,
    );

    return `${pricesDiffInPercents}%`;
  }, [yearlyPricePerWeek, trialProduct?.price?.amount]);

  const secondProduct = isFreeTrialToggle ? trialProduct : weeklyProduct || trialProduct;

  const weeklyPricePerWeekText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays =
        trialProduct?.subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

      const price = trialProduct?.price?.amount;
      const currencySymbol = trialProduct?.price?.currencySymbol;

      return `${offerDays} ${localize("paywall", "daysFreeThen")} ${currencySymbol}${price}/${localize("paywall", "week")}`;
    }

    return `${secondProduct?.price?.currencySymbol}${secondProduct?.price?.amount || 0} /${localize("paywall", "week")}`;
  }, [secondProduct?.price?.amount, secondProduct?.price?.currencySymbol, isFreeTrialToggle]);

  const handleTrialEnabledChanged = useCallback(
    (isEnabled: boolean) => {
      if (isEnabled) {
        onSelectProduct(trialProduct);
      } else if (selectedProduct === trialProduct) {
        onSelectProduct(weeklyProduct);
      }

      setIsFreeTrialToggle(isEnabled);
    },
    [onSelectProduct, selectedProduct, trialProduct, weeklyProduct],
  );

  const handleYearlyProductPress = useCallback(() => {
    onSelectProduct(yearlyProduct);
  }, [onSelectProduct, yearlyProduct]);

  const handleWeeklyProductPress = useCallback(() => {
    onSelectProduct(isFreeTrialToggle ? trialProduct : weeklyProduct);
  }, [isFreeTrialToggle, onSelectProduct, trialProduct, weeklyProduct]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.benefitsContainer}>
        <View style={styles.benefit}>
          <Icons.Crown />
          <TextView style={styles.benefitText} type='medium'>
            {localize("paywall", "richCollectionOfFairyTails")}
          </TextView>
        </View>
        <View style={styles.benefit}>
          <Icons.Record />
          <TextView style={styles.benefitText} type='medium'>
            {localize("paywall", "uniqueCustomVoices")}
          </TextView>
        </View>
        <View style={styles.benefit}>
          <Icons.Mic />
          <TextView style={styles.benefitText} type='medium'>
            {localize("paywall", "yourPersonalizedVoices")}
          </TextView>
        </View>
        <View style={styles.benefit}>
          <Icons.DownloadSmall />
          <TextView style={styles.benefitText} type='medium'>
            {localize("paywall", "offlineModePlayer")}
          </TextView>
        </View>
      </View>

      <PressableView
        style={[
          styles.productContainer,
          selectedProduct === secondProduct && styles.selectedProductContainer,
        ]}
        onPress={handleWeeklyProductPress}
      >
        <View style={styles.productNameContainer}>
          <TextView style={styles.productTitle}>{secondProductText}</TextView>
          <TextView style={styles.productSubtitle} type='light'>
            {weeklyPricePerWeekText}
          </TextView>
        </View>
      </PressableView>

      <PressableView
        style={[
          styles.productContainer,
          selectedProduct === yearlyProduct && styles.selectedProductContainer,
        ]}
        onPress={handleYearlyProductPress}
      >
        <Image source={yearlyProductBackgroundImage} style={styles.productContainerImage} />

        <View style={styles.productNameContainer}>
          <TextView style={styles.productTitle}>{localize("paywall", "YEARLY")}</TextView>
          <TextView style={styles.productSubtitle} type='light'>
            {yearlyPricePerWeekText}
          </TextView>
        </View>

        <View style={styles.separator} />

        <View style={styles.productPriceContainer}>
          <TextView style={styles.priceSubtitle}>{localize("paywall", "save")}</TextView>
          <TextView style={styles.priceSale} type='bold'>
            {pricesDiffInPercentsText}
          </TextView>
        </View>
      </PressableView>

      <GradientButton style={styles.button} onPress={onUnlockPress}>
        {unlockButtonText}
      </GradientButton>

      {isTrialEligible && (
        <View style={styles.freeTrialContainer}>
          <View style={styles.freeTrialTextContainer}>
            <TextView style={styles.freeTrialTitle} type='bold'>
              {localize("paywall", "notSureYet")}
            </TextView>
            <TextView style={styles.freeTrialSubtitle}>{localize("paywall", "enableFreeTrial")}</TextView>
          </View>

          <TrialSwitch value={isFreeTrialEnabled} onValueChange={handleTrialEnabledChanged} />
        </View>
      )}

      <TextView style={styles.price} type='bold'>
        {selectedProductPriceText}
      </TextView>

      <TextView style={styles.promotionText} type='bold'>
        {localize("paywall", "autoRenewableCancelAnytime")}
      </TextView>

      <FooterActions
        actionStyle={styles.footerAction}
        style={styles.footerActions}
        onRestorePress={onRestorePress}
      />

      <TextView style={styles.subscriptionInfo}>
        {localize("paywall", "cancelPolicy")}
      </TextView>
    </ScrollView>
  );
};

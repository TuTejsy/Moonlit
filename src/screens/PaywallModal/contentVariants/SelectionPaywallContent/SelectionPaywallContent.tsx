import { useCallback, useMemo, useState } from 'react';
import { View, Image } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';
import LinearGradient from 'react-native-linear-gradient';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { FooterActions } from '../../components/FooterActions/FooterActions';
import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';
import voicesLandscapeImage from '../../images/voicesLandscape/voicesLandscape.png';

import { WEEKS_IN_YEAR } from './SelectionPaywallContent.constants';
import { makeStyles } from './SelectionPaywallContent.styles';

interface SelectionPaywallContentProps {
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

export const SelectionPaywallContent = ({
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
}: SelectionPaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { isLandscape, isSquareScreen } = useLayout();

  const [isFreeTrialToggle, setIsFreeTrialToggle] = useState(isFreeTrialEnabled);

  const yearlyPricePerWeek = useMemo(
    () => (yearlyProduct?.price?.amount || 0) / WEEKS_IN_YEAR,
    [yearlyProduct?.price?.amount],
  );

  const yearlyProductBenifitText = useMemo(() => {
    const trialPricePerWeek = trialProduct?.price?.amount || 0;

    const pricesDiffInPercents = Math.round(
      ((trialPricePerWeek - yearlyPricePerWeek) / trialPricePerWeek) * 100,
    );

    return `Save ${pricesDiffInPercents}%`;
  }, [yearlyPricePerWeek, trialProduct?.price?.amount]);

  const yearlyPriceText = useMemo(
    () => `${yearlyProduct?.price?.currencySymbol}${yearlyProduct?.price?.amount || 0}`,
    [yearlyProduct?.price?.amount, yearlyProduct?.price?.currencySymbol],
  );

  const yearlyPricePerWeekText = useMemo(
    () => `${yearlyProduct?.price?.currencySymbol}${yearlyPricePerWeek.toFixed(2)}`,
    [yearlyPricePerWeek, yearlyProduct?.price?.currencySymbol],
  );

  const secondProduct = isFreeTrialToggle ? trialProduct : weeklyProduct || trialProduct;

  const weeklyPricePerWeekText = useMemo(
    () => `${secondProduct?.price?.currencySymbol}${secondProduct?.price?.amount || 0}`,
    [secondProduct?.price?.amount, secondProduct?.price?.currencySymbol],
  );

  const secondProductText = useMemo(() => {
    if (isFreeTrialToggle) {
      const offerDays =
        trialProduct?.subscriptionDetails?.introductoryOffers?.[0].subscriptionPeriod.numberOfUnits;

      return `${offerDays}-DAY FREE TRIAL`;
    }

    return 'WEEKLY ACCESS';
  }, [isFreeTrialToggle, trialProduct?.subscriptionDetails?.introductoryOffers]);

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
    <>
      {isSquareScreen && <Image source={voicesLandscapeImage} style={styles.voicesFullImage} />}

      <View style={styles.content}>
        <View style={styles.block}>
          <TextView style={styles.title} type='bold'>
            Get access{`\n`}to all tales
          </TextView>

          <TextView style={styles.subtitle} type='regular'>
            Discover unique voices and{`\n`}listen to classic fary tales
          </TextView>

          {!isSquareScreen && (
            <Image
              source={isLandscape ? voicesLandscapeImage : voicesImage}
              style={isLandscape ? styles.voicesFullImage : styles.voicesImage}
            />
          )}
        </View>

        <View style={styles.block}>
          <PressableView
            style={[
              styles.productContainer,
              selectedProduct === yearlyProduct && styles.selectedProductContainer,
            ]}
            onPress={handleYearlyProductPress}
          >
            <LinearGradient
              useAngle
              angle={276}
              colors={[colors.gradientPinkStart, colors.gradientPinkEnd]}
              locations={[0, 1]}
              style={styles.fullBenifitLabel}
            >
              <TextView style={styles.fullBenifitLabelText}>{yearlyProductBenifitText}</TextView>
            </LinearGradient>

            <View style={styles.productNameContainer}>
              <TextView style={styles.productSubtitle} type='light'>
                YEARLY ACCESS
              </TextView>
              <TextView style={styles.productDescription}>
                Just {yearlyPriceText} per year{' '}
              </TextView>
            </View>

            <View style={styles.productPriceContainer}>
              <TextView style={styles.price}>{yearlyPricePerWeekText}</TextView>
              <TextView style={styles.priceSubtitle}>per week</TextView>
            </View>

            <View style={styles.checkbox}>
              {selectedProduct === yearlyProduct && <View style={styles.checkboxMark} />}
            </View>
          </PressableView>

          <PressableView
            style={[
              styles.productContainer,
              selectedProduct === secondProduct && styles.selectedProductContainer,
            ]}
            onPress={handleWeeklyProductPress}
          >
            <TextView style={styles.productTitle}>{secondProductText}</TextView>

            <View style={styles.productPriceContainer}>
              <TextView style={styles.price}>{weeklyPricePerWeekText}</TextView>
              <TextView style={styles.priceSubtitle}>per week</TextView>
            </View>

            <View style={styles.checkbox}>
              {selectedProduct === secondProduct && <View style={styles.checkboxMark} />}
            </View>
          </PressableView>

          {isTrialEligible && (
            <View style={styles.freeTrialContainer}>
              <TextView style={styles.freeTrialText} type='light'>
                Enable free trial
              </TextView>

              <TrialSwitch value={isFreeTrialToggle} onValueChange={handleTrialEnabledChanged} />
            </View>
          )}

          <TextView style={styles.promotionText} type='regular'>
            Auto-renewable. Cancel anytime
          </TextView>

          <GradientButton style={styles.button} onPress={onUnlockPress}>
            {unlockButtonText}
          </GradientButton>

          <FooterActions onRestorePress={onRestorePress} />
        </View>
      </View>
    </>
  );
};

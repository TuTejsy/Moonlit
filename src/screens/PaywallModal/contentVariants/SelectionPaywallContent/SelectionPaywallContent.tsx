import { useCallback, useMemo } from 'react';
import { View, Image } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';
import LinearGradient from 'react-native-linear-gradient';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';

import { WEEKS_IN_YEAR } from './SelectionPaywallContent.constants';
import { makeStyles } from './SelectionPaywallContent.styles';

interface SelectionPaywallContentProps {
  fullProduct: AdaptyPaywallProduct | undefined;
  isFreeTrialEnabled: boolean;
  lightProduct: AdaptyPaywallProduct | undefined;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
}

export const SelectionPaywallContent = ({
  fullProduct,
  isFreeTrialEnabled,
  lightProduct,
  onSelectProduct,
  selectedProduct,
  trialProduct,
}: SelectionPaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const fullPricePerWeek = useMemo(
    () => (fullProduct?.price?.amount || 0) / WEEKS_IN_YEAR,
    [fullProduct?.price?.amount],
  );

  const fullProductBenifitText = useMemo(() => {
    const trialPricePerWeek = trialProduct?.price?.amount || 0;

    const pricesDiffInPercents = Math.round(
      ((trialPricePerWeek - fullPricePerWeek) / trialPricePerWeek) * 100,
    );

    return `Save ${pricesDiffInPercents}%`;
  }, [fullPricePerWeek, trialProduct?.price?.amount]);

  const handleTrialEnabledChanged = useCallback(
    (isEnabled: boolean) => {
      onSelectProduct(isEnabled ? trialProduct : lightProduct);
    },
    [lightProduct, onSelectProduct, trialProduct],
  );
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
        <LinearGradient
          useAngle
          angle={276}
          colors={[colors.gradientPinkStart, colors.gradientPinkEnd]}
          locations={[0, 1]}
          style={styles.fullBenifitLabel}
        >
          <TextView style={styles.fullBenifitLabelText}>{fullProductBenifitText}</TextView>
        </LinearGradient>

        <View style={styles.productNameContainer}>
          <TextView style={styles.productSubtitle}>YEARLY ACCESS</TextView>
          <TextView style={styles.productDescription}>Just $39.99 per year </TextView>
        </View>

        <View style={styles.productPriceContainer}>
          <TextView style={styles.price}>0.99</TextView>
          <TextView style={styles.priceSubtitle}>per week</TextView>
        </View>

        <View style={styles.checkbox}>
          <View style={styles.checkboxMark} />
        </View>
      </View>

      <View style={styles.productContainer}>
        <TextView style={styles.productTitle}>WEEKLY ACCESS</TextView>

        <View style={styles.productPriceContainer}>
          <TextView style={styles.price}>$5.99</TextView>
          <TextView style={styles.priceSubtitle}>per week</TextView>
        </View>

        <View style={styles.checkbox}>{/* <View style={styles.checkboxMark} /> */}</View>
      </View>

      <View style={styles.freeTrialContainer}>
        <TextView style={styles.freeTrialText}>Enable free trial</TextView>

        <TrialSwitch value={isFreeTrialEnabled} onValueChange={handleTrialEnabledChanged} />
      </View>

      <TextView style={styles.promotionText} type='regular'>
        Auto-renewable. Cancel anytime
      </TextView>
    </>
  );
};

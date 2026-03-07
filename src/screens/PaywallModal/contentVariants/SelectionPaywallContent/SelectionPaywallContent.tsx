import { View, Image } from 'react-native';

import { AdaptyPaywallProduct } from 'react-native-adapty';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { FooterActions } from '../../components/FooterActions/FooterActions';
import { TrialSwitch } from '../../components/TrialSwitch/TrialSwitch';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';
import voicesLandscapeImage from '../../images/voicesLandscape/voicesLandscape.png';

import { WeeklyProductCard } from './components/WeeklyProductCard/WeeklyProductCard';
import { YearlyProductCard } from './components/YearlyProductCard/YearlyProductCard';
import { useSelectionPaywallProducts } from './hooks/useSelectionPaywallProducts';
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
  const { isLandscape, isSquareScreen } = useLayout();
  const { localize } = useAppLocalization();

  const {
    handleTrialEnabledChanged,
    handleWeeklyProductPress,
    handleYearlyProductPress,
    isFreeTrialToggle,
    secondProduct,
    secondProductText,
    weeklyPricePerWeekText,
    yearlyPricePerWeekText,
    yearlyPriceText,
    yearlyProductBenifitText,
  } = useSelectionPaywallProducts({
    isFreeTrialEnabled,
    onSelectProduct,
    selectedProduct,
    trialProduct,
    weeklyProduct,
    yearlyProduct,
  });

  return (
    <>
      {isSquareScreen && <Image source={voicesLandscapeImage} style={styles.voicesFullImage} />}

      <View style={styles.content}>
        <View style={styles.block}>
          <TextView style={styles.title} type='bold'>
            {localize('paywall', 'getAccessToAllTales')}
          </TextView>

          <TextView style={styles.subtitle} type='regular'>
            {localize('paywall', 'discoverUniqueVoicesAndListenToClassicFairyTales')}
          </TextView>

          {!isSquareScreen && (
            <Image
              source={isLandscape ? voicesLandscapeImage : voicesImage}
              style={isLandscape ? styles.voicesFullImage : styles.voicesImage}
            />
          )}
        </View>

        <View style={styles.block}>
          <YearlyProductCard
            isSelected={selectedProduct === yearlyProduct}
            yearlyPricePerWeekText={yearlyPricePerWeekText}
            yearlyPriceText={yearlyPriceText}
            yearlyProductBenifitText={yearlyProductBenifitText}
            onPress={handleYearlyProductPress}
          />

          <WeeklyProductCard
            isSelected={selectedProduct === secondProduct}
            secondProductText={secondProductText}
            weeklyPricePerWeekText={weeklyPricePerWeekText}
            onPress={handleWeeklyProductPress}
          />

          {isTrialEligible && (
            <View style={styles.freeTrialContainer}>
              <TextView style={styles.freeTrialText} type='light'>
                {localize('paywall', 'enableFreeTrial')}
              </TextView>

              <TrialSwitch
                style={styles.freeTrialSwitch}
                value={isFreeTrialToggle}
                onValueChange={handleTrialEnabledChanged}
              />
            </View>
          )}

          <TextView style={styles.promotionText} type='regular'>
            {localize('paywall', 'autoRenewableCancelAnytime')}
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

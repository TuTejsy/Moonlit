import { View, Image, type ImageStyle } from 'react-native';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { FooterActions } from '../../components/FooterActions/FooterActions';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';
import voicesLandscapeImage from '../../images/voicesLandscape/voicesLandscape.png';
import type { PaywallVariantProps } from '../../paywallVariantRegistry.types';
import { TrialSwitch } from '../components/TrialSwitch/TrialSwitch';

import { WeeklyProductCard } from './components/WeeklyProductCard/WeeklyProductCard';
import { YearlyProductCard } from './components/YearlyProductCard/YearlyProductCard';
import { useSelectionPaywallProducts } from './hooks/useSelectionPaywallProducts';
import { makeStyles } from './SelectionPaywallContent.styles';

export const SelectionPaywallContent = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onRestorePress,
  onSelectProduct,
  onSkipPress,
  onUnlockPress,
  remoteConfig,
  selectedProduct,
  trialProduct,
  unlockButtonText,
  weeklyProduct,
  yearlyProduct,
}: PaywallVariantProps) => {
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
      {isSquareScreen && (
        <Image source={voicesLandscapeImage} style={styles.voicesFullImage as ImageStyle} />
      )}

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
              style={(isLandscape ? styles.voicesFullImage : styles.voicesImage) as ImageStyle}
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

          <FooterActions
            onRestorePress={onRestorePress}
            onSkipPress={remoteConfig.showBottomSkipButton ? onSkipPress : undefined}
          />
        </View>
      </View>
    </>
  );
};

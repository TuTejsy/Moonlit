import { ScrollView } from 'react-native';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { FooterActions } from '../../components/FooterActions/FooterActions';
import type { PaywallVariantProps } from '../../paywallVariantRegistry.types';
import { FreeTrialToggle } from '../components/FreeTrialToggle/FreeTrialToggle';

import { BenefitsList } from './components/BenefitsList/BenefitsList';
import { WeeklyProductCard } from './components/WeeklyProductCard/WeeklyProductCard';
import { YearlyProductCard } from './components/YearlyProductCard/YearlyProductCard';
import { useScrollablePaywallProducts } from './hooks/useScrollablePaywallProducts';
import { makeStyles } from './ScrollablePaywallContent.styles';

export const ScrollablePaywallContent = ({
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
  const { localize } = useAppLocalization();

  const {
    handleTrialEnabledChanged,
    handleWeeklyProductPress,
    handleYearlyProductPress,
    isFreeTrialToggle,
    pricesDiffInPercentsText,
    secondProduct,
    secondProductText,
    selectedProductPriceText,
    weeklyPricePerWeekText,
    yearlyPricePerWeekText,
  } = useScrollablePaywallProducts({
    isFreeTrialEnabled,
    onSelectProduct,
    selectedProduct,
    trialProduct,
    weeklyProduct,
    yearlyProduct,
  });

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BenefitsList />

      <WeeklyProductCard
        isSelected={selectedProduct === secondProduct}
        secondProductText={secondProductText}
        weeklyPricePerWeekText={weeklyPricePerWeekText}
        onPress={handleWeeklyProductPress}
      />

      <YearlyProductCard
        isSelected={selectedProduct === yearlyProduct}
        pricesDiffInPercentsText={pricesDiffInPercentsText}
        yearlyPricePerWeekText={yearlyPricePerWeekText}
        onPress={handleYearlyProductPress}
      />

      <GradientButton style={styles.button} onPress={onUnlockPress}>
        {unlockButtonText}
      </GradientButton>

      {isTrialEligible && (
        <FreeTrialToggle
          isFreeTrialEnabled={isFreeTrialToggle}
          onValueChange={handleTrialEnabledChanged}
        />
      )}

      <TextView style={styles.price} type='bold'>
        {selectedProductPriceText}
      </TextView>

      <TextView style={styles.promotionText} type='bold'>
        {localize('paywall', 'autoRenewableCancelAnytime')}
      </TextView>

      <FooterActions
        actionStyle={styles.footerAction}
        style={styles.footerActions}
        onRestorePress={onRestorePress}
        onSkipPress={remoteConfig.showBottomSkipButton ? onSkipPress : undefined}
      />

      <TextView style={styles.subscriptionInfo}>{localize('paywall', 'cancelPolicy')}</TextView>
    </ScrollView>
  );
};

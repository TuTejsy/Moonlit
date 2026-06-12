import React from 'react';
import { Image, View } from 'react-native';

import type { AdaptyPaywallProduct } from 'react-native-adapty';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { FooterActions } from '../../components/FooterActions/FooterActions';
// eslint-disable-next-line import/no-unresolved
import voicesImage from '../../images/voices/voices.png';
// eslint-disable-next-line import/no-unresolved
import voicesLandscapeImage from '../../images/voicesLandscape/voicesLandscape.png';

import { ProdCtaButton } from './components/ProdCtaButton/ProdCtaButton';
import { ProdPlanRow } from './components/ProdPlanRow/ProdPlanRow';
import { ProdTrialCard } from './components/ProdTrialCard/ProdTrialCard';
import { useStaticDefaultProdPaywallProducts } from './hooks/useStaticDefaultProdPaywallProducts';
import { makeStyles } from './StaticDefaultProdPaywallContent.styles';

interface StaticDefaultProdPaywallContentProps {
  isFreeTrialEnabled: boolean;
  isTrialEligible: boolean;
  onRestorePress: () => void;
  onSelectProduct: (product: AdaptyPaywallProduct | undefined) => void;
  onUnlockPress: () => void;
  selectedProduct: AdaptyPaywallProduct | undefined;
  trialProduct: AdaptyPaywallProduct | undefined;
  weeklyProduct: AdaptyPaywallProduct | undefined;
  yearlyProduct: AdaptyPaywallProduct | undefined;
}

export const StaticDefaultProdPaywallContent = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onRestorePress,
  onSelectProduct,
  onUnlockPress,
  selectedProduct,
  trialProduct,
  weeklyProduct,
  yearlyProduct,
}: StaticDefaultProdPaywallContentProps) => {
  const styles = useMakeStyles(makeStyles);
  const { isLandscape, isSquareScreen } = useLayout();
  const { localize } = useAppLocalization();

  const {
    ctaLabel,
    dueTodayText,
    handleSelectWeekly,
    handleSelectYearly,
    trialDays,
    weeklyIsSelected,
    weeklyPriceText,
    yearlyDetailText,
    yearlyIsSelected,
    yearlyPerWeekText,
  } = useStaticDefaultProdPaywallProducts({
    isFreeTrialEnabled,
    onSelectProduct,
    selectedProduct,
    trialProduct,
    weeklyProduct,
    yearlyProduct,
  });

  const weeklyDetailText = localize('paywall', 'staticDefaultProdPlanWeeklyDetail');
  const perWeekLabel = localize('paywall', 'staticDefaultProdPerWeek');
  const mostPopularLabel = localize('paywall', 'staticDefaultProdMostPopular');
  const bestValueLabel = localize('paywall', 'staticDefaultProdBestValue');

  return (
    <>
      {isSquareScreen ? (
        <Image source={voicesLandscapeImage} style={styles.voicesFullImage} />
      ) : null}

      <View style={styles.content}>
        {!isSquareScreen ? (
          <View style={styles.visualBlock}>
            <TextView style={styles.title} type='bold'>
              {localize('paywall', 'getAccessToAllTales')}
            </TextView>

            <TextView style={styles.subtitle} type='regular'>
              {localize('paywall', 'discoverUniqueVoicesAndListenToClassicFairyTales')}
            </TextView>

            <Image
              resizeMode='cover'
              source={isLandscape ? voicesLandscapeImage : voicesImage}
              style={isLandscape ? styles.voicesFullImage : styles.voicesImage}
            />
          </View>
        ) : null}

        <View style={styles.productBlock}>
          {isTrialEligible ? (
            <ProdTrialCard
              dueTodayText={dueTodayText}
              enabled={isFreeTrialEnabled}
              trialDays={trialDays}
              onToggle={() => {
                onSelectProduct(isFreeTrialEnabled ? yearlyProduct : trialProduct);
              }}
            />
          ) : null}

          <View accessibilityRole='radiogroup' style={styles.plans}>
            <ProdPlanRow
              badgeLabel={yearlyIsSelected ? bestValueLabel : undefined}
              detail={yearlyDetailText}
              isSelected={yearlyIsSelected}
              name={localize('paywall', 'YEARLY')}
              price={yearlyPerWeekText}
              priceUnit={perWeekLabel}
              testID='prod-plan-yearly'
              onPress={handleSelectYearly}
            />

            <ProdPlanRow
              badgeLabel={weeklyIsSelected ? mostPopularLabel : undefined}
              detail={weeklyDetailText}
              isSelected={weeklyIsSelected}
              name={localize('paywall', 'WEEKLY')}
              price={weeklyPriceText}
              priceUnit={perWeekLabel}
              testID='prod-plan-weekly'
              onPress={handleSelectWeekly}
            />
          </View>

          <View style={styles.bottomBlock}>
            <ProdCtaButton label={ctaLabel} style={styles.ctaButton} onPress={onUnlockPress} />

            <FooterActions style={styles.footer} onRestorePress={onRestorePress} />
          </View>
        </View>
      </View>
    </>
  );
};

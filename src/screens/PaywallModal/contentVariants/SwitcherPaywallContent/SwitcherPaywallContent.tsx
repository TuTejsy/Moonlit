import { View, Image } from 'react-native';

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
import { FreeTrialToggle } from '../components/FreeTrialToggle/FreeTrialToggle';

import { useSwitcherPaywallProducts } from './hooks/useSwitcherPaywallProducts';
import { makeStyles } from './SwitcherPaywallContent.styles';

export const SwitcherPaywallContent = ({
  isFreeTrialEnabled,
  isTrialEligible,
  onRestorePress,
  onSelectProduct,
  onSkipPress,
  onUnlockPress,
  remoteConfig,
  trialProduct,
  unlockButtonText,
  yearlyProduct,
}: PaywallVariantProps) => {
  const styles = useMakeStyles(makeStyles);
  const { isLandscape, isSquareScreen } = useLayout();
  const { localize } = useAppLocalization();

  const { handleTrialEnabledChanged, productText } = useSwitcherPaywallProducts({
    isFreeTrialEnabled,
    isTrialEligible,
    onSelectProduct,
    trialProduct,
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

        <View style={[styles.block, styles.productBlock]}>
          <TextView style={styles.promotionText} type='regular'>
            {productText}
            {`\n`}
            {localize('paywall', 'autoRenewableCancelAnytime')}
          </TextView>

          {isTrialEligible && (
            <FreeTrialToggle
              isFreeTrialEnabled={isFreeTrialEnabled}
              onValueChange={handleTrialEnabledChanged}
            />
          )}
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

import { useCallback, useState } from 'react';

import {
  adapty,
  AdaptyPaywallProduct,
  AdaptyProfile,
  AdaptyPurchaseResult,
} from 'react-native-adapty';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AnalyticsService } from '@/services/analytics/analytics';
import { PAYWALL_TYPE } from '@/services/analytics/analytics.constants';
import { unlockFullVersion } from '@/store/user/user.slice';

interface UsePaywallActionsProps {
  isFreeTrialEnabled: boolean;
  navigation: any;
  source: any;
  tab: any;
  contentName?: string;
  // using any for navigation as we are extracting this from a component
  onClose?: () => void;
  selectedProduct?: AdaptyPaywallProduct;
}

export const usePaywallActions = ({
  contentName,
  isFreeTrialEnabled,
  navigation,
  onClose,
  selectedProduct,
  source,
  tab,
}: UsePaywallActionsProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onPurchaseRestore = useCallback(
    (profile: AdaptyProfile) => {
      const isSubscribed = profile.accessLevels?.premium?.isActive;

      if (isSubscribed) {
        dispatch(unlockFullVersion());
        AnalyticsService.setIsUserPaid(true);

        if (onClose) {
          onClose();
        } else {
          navigation.goBack();
        }
      }
    },
    [dispatch, navigation, onClose],
  );

  const makeOnPurchase = useCallback(
    (product: AdaptyPaywallProduct | null) => (purhcaseResult: AdaptyPurchaseResult) => {
      const isSubscribed = purhcaseResult.type === 'success';

      if (isSubscribed) {
        dispatch(unlockFullVersion());
        AnalyticsService.setIsUserPaid(true);

        if (product) {
          AnalyticsService.logStartSubscriptionEvent({
            contentName,
            hasTrial: isFreeTrialEnabled,
            productId: product.vendorProductId,
            source,
            tab,
            type: PAYWALL_TYPE.WITH_SWITCHER,
          });
        }

        if (onClose) {
          onClose();
        } else {
          navigation.goBack();
        }
      }
    },
    [contentName, dispatch, isFreeTrialEnabled, navigation, onClose, source, tab],
  );

  const handleSkipPress = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }

    AnalyticsService.logPaywallClosedEvent({
      contentName,
      source,
      tab,
      type: PAYWALL_TYPE.WITH_SWITCHER,
    });
  }, [contentName, navigation, onClose, source, tab]);

  const handleUnlockPress = useCallback(() => {
    if (selectedProduct) {
      setIsLoading(true);

      adapty
        .makePurchase(selectedProduct)
        .then(makeOnPurchase(selectedProduct))
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [makeOnPurchase, selectedProduct]);

  const handleRestorePress = useCallback(() => {
    setIsLoading(true);

    adapty
      .restorePurchases()
      .then(onPurchaseRestore)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [onPurchaseRestore]);

  return {
    handleRestorePress,
    handleSkipPress,
    handleUnlockPress,
    isLoading,
  };
};

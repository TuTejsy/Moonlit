import { useEffect } from 'react';

import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

export const useShowPaywallModal = () => {
  const navigation = useAppNavigation();

  useEffect(() => {
    navigation.navigate(RootRoutes.PAYWALL_MODAL);
  }, []);
};

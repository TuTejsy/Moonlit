import { useCallback } from 'react';

import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '@/constants/common';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

export const useWebPagesNavigation = () => {
  const navigation = useAppNavigation();

  const openTermsOfService = useCallback(() => {
    navigation.navigate(RootRoutes.WEB_PAGE_SCREEN, { url: TERMS_OF_SERVICE_URL });
  }, [navigation]);

  const openPrivacyPolicy = useCallback(() => {
    navigation.navigate(RootRoutes.WEB_PAGE_SCREEN, { url: PRIVACY_POLICY_URL });
  }, [navigation]);

  return { openPrivacyPolicy, openTermsOfService };
};

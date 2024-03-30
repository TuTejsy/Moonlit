import { useMemo, useState } from 'react';

import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { getStorageData } from '@/services/storage/storage';

export const useInitApp = () => {
  const [isSplashAnimationEnd, setIsSplashAnimationEnd] = useState(false);

  const isAppReady = isSplashAnimationEnd;

  const initialRouteName = useMemo(() => {
    return getStorageData().isOnboarded ? RootRoutes.TAB : RootRoutes.GET_STARTED_SCREEN;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSplashAnimationEnd = () => setIsSplashAnimationEnd(true);

  return { initialRouteName, isAppReady, onSplashAnimationEnd };
};

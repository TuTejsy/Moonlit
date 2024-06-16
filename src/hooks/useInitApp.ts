import { useMemo } from 'react';

import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { getStorageData } from '@/services/storage/storage';

export const useInitApp = () => {
  const initialRouteName = useMemo(() => {
    return getStorageData().isOnboarded ? RootRoutes.TAB : RootRoutes.GET_STARTED_SCREEN;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialNavigationState = useMemo(
    () => ({
      index: 1,
      routes: [
        {
          name: initialRouteName,
        },
        {
          name: RootRoutes.SPLASH_VIEW_MODAL,
        },
      ],
    }),
    [initialRouteName],
  );

  return { initialNavigationState, initialRouteName };
};

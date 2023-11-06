import { useMemo, useState } from 'react';

import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

export const useInitApp = () => {
  const [isSplashAnimationEnd, setIsSplashAnimationEnd] = useState(false);

  const isAppReady = isSplashAnimationEnd;

  const initialRouteName = useMemo(() => {
    return RootRoutes.TAB;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSplashAnimationEnd = () => setIsSplashAnimationEnd(true);

  return { initialRouteName, isAppReady, onSplashAnimationEnd };
};

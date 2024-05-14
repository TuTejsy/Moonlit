import { useCallback } from 'react';
import { BackHandler } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

/**
 * @param handler if returns void | null | undefined | false - doesn't call navigation.goBack, else - call
 */
export function useBackHandler(
  handler: null | (() => boolean | undefined | null | void),
  deps: readonly any[] = [],
) {
  const backHandler = () => {
    if (!handler) {
      return true;
    }

    return !!handler();
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backHandler);

      return () => BackHandler.removeEventListener('hardwareBackPress', backHandler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps),
  );
}

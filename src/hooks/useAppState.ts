import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { IS_ANDROID } from '@/constants/common';

interface Props {
  onActive?: () => void;
  onBackground?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onInactive?: () => void;
}

export const useAppState = ({ onActive, onBackground, onBlur, onFocus, onInactive }: Props) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    if (onActive || onBackground || onInactive) {
      const changeListener = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
          onActive?.();
        } else if (nextAppState === 'background') {
          onBackground?.();
        } else if (nextAppState === 'inactive') {
          onInactive?.();
        }

        setAppState(nextAppState);
      });

      return changeListener.remove;
    }

    if (IS_ANDROID && onFocus) {
      const focusListener = AppState.addEventListener('focus', onFocus);
      return focusListener.remove;
    }

    if (IS_ANDROID && onBlur) {
      const blurListener = AppState.addEventListener('blur', onBlur);
      return blurListener.remove;
    }

    return undefined;
  }, [onActive, onBackground, onBlur, onFocus, onInactive]);

  return appState;
};

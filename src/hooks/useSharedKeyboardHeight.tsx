import { createContext, useContext, useEffect } from 'react';
import { Keyboard, KeyboardEventName, ViewProps } from 'react-native';

import { SharedValue, useSharedValue } from 'react-native-reanimated';

import { platformSelect } from '@/utils/platformSelect';

const SharedKeyboardHeightContext = createContext<SharedValue<number> | null>(null);

export const SharedKeyboardHeightProvider = ({ children }: ViewProps) => {
  const keyboardHeight = useSharedValue(0);

  // https://reactnative.dev/docs/keyboard#:~:text=keyboardDidChangeFrame-,Note,-that%20only%20keyboardDidShow
  useEffect(() => {
    const showEvent = platformSelect({ android: 'keyboardDidShow', ios: 'keyboardWillShow' });

    const show = Keyboard.addListener(showEvent as KeyboardEventName, (e) => {
      keyboardHeight.value = e.endCoordinates?.height ?? 0;
    });

    const hideEvent = platformSelect({ android: 'keyboardDidHide', ios: 'keyboardWillHide' });

    const hide = Keyboard.addListener(hideEvent as KeyboardEventName, () => {
      keyboardHeight.value = 0;
    });

    return () => {
      show.remove();
      hide.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SharedKeyboardHeightContext.Provider value={keyboardHeight}>
      {children}
    </SharedKeyboardHeightContext.Provider>
  );
};

export const useSharedKeyboardHeight = () => {
  const sharedValue = useContext(SharedKeyboardHeightContext);

  if (!sharedValue) {
    throw new Error('useSharedKeyboardHeight can not be used outside SharedKeyboardHeightProvider');
  }

  return sharedValue;
};

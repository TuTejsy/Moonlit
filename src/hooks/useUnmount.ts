import { useEffect, useRef } from 'react';

export const useUnmount = (callback: () => void) => {
  const refCallback = useRef(callback);

  refCallback.current = callback;

  useEffect(
    () => () => {
      refCallback.current();
    },
    [],
  );
};

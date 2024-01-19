import { useCallback, useRef } from 'react';

import { useUnmount } from './useUnmount';

export const useTimeout = (): [
  setTimeout: (handler: () => void, timer: number) => void,
  clearTimeout: () => void,
] => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  const set = useCallback(
    (handler: () => void, timer: number) => {
      clear();
      timeout.current = setTimeout(handler, timer);
    },
    [clear],
  );

  useUnmount(clear);

  return [set, clear];
};

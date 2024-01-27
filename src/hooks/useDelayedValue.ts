import { useEffect, useState } from 'react';

import { useTimeout } from '@/hooks/useTimeout';

export const useDelayedValue = <T>(value: T, delay = 500) => {
  const [delayedValue, setDelayedValue] = useState<T>(value);
  const [setTimeoutHandler, clearTimeoutHandler] = useTimeout();

  useEffect(() => {
    if (delay > 0) {
      setTimeoutHandler(() => {
        setDelayedValue(value);
      }, delay);

      return clearTimeoutHandler;
    }

    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return delay <= 0 ? value : delayedValue;
};

import { useEffect, useState } from 'react';

import { useTimeout } from '@/hooks/useTimeout';

export const useDelayedValue = <T>(
  value: T,
  delay = 500,
  defaultValue: T | undefined = undefined,
) => {
  const [delayedValue, setDelayedValue] = useState<T>(defaultValue ?? value);
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

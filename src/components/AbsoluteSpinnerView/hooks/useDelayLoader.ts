import { useEffect, useRef, useState } from 'react';

import { useTimeout } from '@/hooks/useTimeout';

export const useDelayLoader = (value = false, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timestampRef = useRef(0);
  const [setTimeoutHandler, clearTimeoutHandler] = useTimeout();

  useEffect(() => {
    if (delay <= 0) {
      setDebouncedValue(value);

      timestampRef.current = 0;
    } else if (value) {
      setDebouncedValue(true);

      timestampRef.current = Date.now();
    } else {
      const hideLoader = () => {
        setDebouncedValue(false);

        timestampRef.current = 0;
      };

      const showLoaderTime = Date.now() - timestampRef.current;

      if (showLoaderTime > delay) {
        hideLoader();
      } else {
        setTimeoutHandler(hideLoader, delay - showLoaderTime);

        return clearTimeoutHandler;
      }
    }

    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return delay <= 0 ? value : debouncedValue;
};

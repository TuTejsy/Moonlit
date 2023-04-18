import { useEffect, useRef } from 'react';

function useMutableValue<T>(value: T) {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

export default useMutableValue;

import { renderHook, act } from '@testing-library/react-native';

import { useDelayedValue } from '../useDelayedValue';

jest.unmock('@/hooks/useDelayedValue');

jest.useFakeTimers();

describe('useDelayedValue', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('returns the initial value immediately when delay is 0 or negative', () => {
    const { result } = renderHook(() => useDelayedValue('hello', 0));

    expect(result.current).toBe('hello');
  });

  it('returns the defaultValue initially when provided with a positive delay', () => {
    const { result } = renderHook(() => useDelayedValue('hello', 500, 'default'));

    expect(result.current).toBe('default');
  });

  it('returns the value after the delay has passed', () => {
    const { result } = renderHook(() => useDelayedValue('hello', 500, 'default'));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('hello');
  });

  it('returns the value directly when delay is 0', () => {
    const { result } = renderHook(() => useDelayedValue('immediate', 0));

    expect(result.current).toBe('immediate');
  });

  it('returns the value directly when delay is negative', () => {
    const { result } = renderHook(() => useDelayedValue('negative-delay', -100));

    expect(result.current).toBe('negative-delay');
  });

  it('uses the value as defaultValue when no defaultValue is provided', () => {
    const { result } = renderHook(() => useDelayedValue('hello', 500));

    expect(result.current).toBe('hello');
  });
});

import { renderHook } from '@testing-library/react-native';

import { useMutableValue } from '../useMutableValue';

jest.unmock('@/hooks/useMutableValue');

describe('useMutableValue', () => {
  it('returns a ref with the initial value', () => {
    const { result } = renderHook(() => useMutableValue(42));

    expect(result.current.current).toBe(42);
  });

  it('updates the ref when the value changes', () => {
    const { rerender, result } = renderHook(({ value }) => useMutableValue(value), {
      initialProps: { value: 'first' },
    });

    expect(result.current.current).toBe('first');

    rerender({ value: 'second' });

    expect(result.current.current).toBe('second');
  });

  it('works with object values', () => {
    const obj = { count: 0 };
    const { result } = renderHook(() => useMutableValue(obj));

    expect(result.current.current).toBe(obj);
  });

  it('works with null values', () => {
    const { result } = renderHook(() => useMutableValue(null));

    expect(result.current.current).toBeNull();
  });
});

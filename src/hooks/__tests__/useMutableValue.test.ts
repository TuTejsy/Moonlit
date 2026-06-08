import { renderHook } from '@testing-library/react-native';

import { useMutableValue } from '../useMutableValue';

jest.unmock('@/hooks/useMutableValue');

describe('useMutableValue', () => {
  it('returns a ref with the initial value', async () => {
    const { result } = await renderHook(() => useMutableValue(42));

    expect(result.current.current).toBe(42);
  });

  it('updates the ref when the value changes', async () => {
    const { rerender, result } = await renderHook(
      ({ value }: { value: string }) => useMutableValue(value),
      {
        initialProps: { value: 'first' },
      },
    );

    expect(result.current.current).toBe('first');

    await rerender({ value: 'second' });

    expect(result.current.current).toBe('second');
  });

  it('works with object values', async () => {
    const obj = { count: 0 };
    const { result } = await renderHook(() => useMutableValue(obj));

    expect(result.current.current).toBe(obj);
  });

  it('works with null values', async () => {
    const { result } = await renderHook(() => useMutableValue(null));

    expect(result.current.current).toBeNull();
  });
});

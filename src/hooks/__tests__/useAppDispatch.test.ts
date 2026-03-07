import { renderHook } from '@testing-library/react-native';

import { useAppDispatch } from '../useAppDispatch';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('@/store/store', () => ({
  AppDispatch: {},
}));

describe('useAppDispatch', () => {
  it('returns a dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch());

    expect(typeof result.current).toBe('function');
  });
});

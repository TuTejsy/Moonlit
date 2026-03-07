import { renderHook } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

import { useAppSelector } from '../useAppSelector';

jest.unmock('../useAppSelector');
jest.unmock('@/hooks/useAppSelector');

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@/store/store', () => ({
  RootState: {},
}));

describe('useAppSelector', () => {
  it('calls useSelector with the provided selector', () => {
    const mockState = { user: { isFullVersion: true } };
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selector: (s: typeof mockState) => unknown) => selector(mockState),
    );

    const selector = (state: typeof mockState) => state.user.isFullVersion;
    const { result } = renderHook(() => useAppSelector(selector));

    expect(result.current).toBe(true);
  });

  it('returns the selected value from the store', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue('test-value');

    const { result } = renderHook(() => useAppSelector(() => 'test-value'));

    expect(result.current).toBe('test-value');
  });
});

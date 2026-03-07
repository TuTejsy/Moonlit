import { act, renderHook } from '@testing-library/react-native';

import { useAppSelector } from '../useAppSelector';
import { useRenderVersion } from '../useRenderVersion';

jest.unmock('@/hooks/useRenderVersion');

jest.mock('../useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/store/user/user.selector', () => ({
  selectIsFullVersion: jest.fn(),
}));

describe('useRenderVersion', () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue(false);
  });

  it('returns initial render version of 1 when mounted', () => {
    const { result } = renderHook(() => useRenderVersion());

    expect(result.current.renderVersion).toBe(1);
  });

  it('incorporates the provided version offset', () => {
    const { result } = renderHook(() => useRenderVersion(5));

    expect(result.current.renderVersion).toBe(6);
  });

  it('increments renderVersion when increaseRenderVersion is called', () => {
    const { result } = renderHook(() => useRenderVersion());

    expect(result.current.renderVersion).toBe(1);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      result.current.increaseRenderVersion();
    });

    expect(result.current.renderVersion).toBe(2);
  });

  it('increments renderVersion when selectIsFullVersion changes', () => {
    const { rerender, result } = renderHook(() => useRenderVersion());

    expect(result.current.renderVersion).toBe(1);

    (useAppSelector as jest.Mock).mockReturnValue(true);
    rerender({});

    expect(result.current.renderVersion).toBe(2);
  });
});

import { renderHook } from '@testing-library/react-native';

import { useScrollOpacity } from '../useScrollOpacity';

jest.unmock('@/hooks/useScrollOpacity');

describe('useScrollOpacity', () => {
  it('returns handleOpacityScroll and opacityAnimStyle', () => {
    const { result } = renderHook(() => useScrollOpacity());

    expect(result.current.handleOpacityScroll).toBeDefined();
    expect(typeof result.current.handleOpacityScroll).toBe('function');
    expect(result.current.opacityAnimStyle).toBeDefined();
  });

  it('accepts custom active and inactive opacity values', () => {
    const { result } = renderHook(() => useScrollOpacity(0.8, 0.2));

    expect(result.current.handleOpacityScroll).toBeDefined();
  });
});

import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { act, renderHook } from '@testing-library/react-native';

import { useAnimatedScrollHandlerValue } from '../useAnimatedScrollHandlerValue';

jest.unmock('@/hooks/useAnimatedScrollHandlerValue');

describe('useAnimatedScrollHandlerValue', () => {
  it('updates scrollPositionSharedValue for vertical scroll', () => {
    const { result } = renderHook(() => useAnimatedScrollHandlerValue());

    expect(result.current.scrollPositionSharedValue.value).toBe(0);

    const mockEvent = {
      nativeEvent: {
        contentOffset: { x: 0, y: 150 },
        contentSize: { height: 1000, width: 390 },
        layoutMeasurement: { height: 800, width: 390 },
      },
    } as NativeSyntheticEvent<NativeScrollEvent>;

    act(() => {
      result.current.handleAnimatedScroll(mockEvent);
    });

    expect(result.current.scrollPositionSharedValue.value).toBe(150);
  });

  it('updates scrollPositionSharedValue for horizontal scroll', () => {
    const { result } = renderHook(() => useAnimatedScrollHandlerValue({ horizontal: true }));

    const mockEvent = {
      nativeEvent: {
        contentOffset: { x: 200, y: 0 },
        contentSize: { height: 800, width: 1000 },
        layoutMeasurement: { height: 800, width: 390 },
      },
    } as NativeSyntheticEvent<NativeScrollEvent>;

    act(() => {
      result.current.handleAnimatedScroll(mockEvent);
    });

    expect(result.current.scrollPositionSharedValue.value).toBe(200);
  });

  it('respects maxOffset for vertical scroll', () => {
    const { result } = renderHook(() => useAnimatedScrollHandlerValue({ maxOffset: 50 }));

    // This event signifies that we are close to the end (within 40px)
    // contentSize (140) - layout (100) = 40 (which is NOT > maxOffset 50)
    const mockEventEnd = {
      nativeEvent: {
        contentOffset: { x: 0, y: 30 },
        contentSize: { height: 140, width: 390 },
        layoutMeasurement: { height: 100, width: 390 },
      },
    } as NativeSyntheticEvent<NativeScrollEvent>;

    act(() => {
      result.current.handleAnimatedScroll(mockEventEnd);
    });

    // Value should NOT update because it failed the maxOffset check
    expect(result.current.scrollPositionSharedValue.value).toBe(0);

    const mockEventMiddle = {
      nativeEvent: {
        contentOffset: { x: 0, y: 500 },
        contentSize: { height: 1000, width: 390 },
        layoutMeasurement: { height: 100, width: 390 },
      },
    } as NativeSyntheticEvent<NativeScrollEvent>;

    act(() => {
      result.current.handleAnimatedScroll(mockEventMiddle);
    });

    // Content size (1000) - Layout (100) = 900 > 50, so it updates
    expect(result.current.scrollPositionSharedValue.value).toBe(500);
  });
});

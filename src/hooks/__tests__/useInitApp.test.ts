import { renderHook } from '@testing-library/react-native';

import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { getStorageData } from '@/services/storage/storage';

import { useInitApp } from '../useInitApp';

jest.unmock('@/hooks/useInitApp');

jest.mock('@/services/storage/storage', () => ({
  getStorageData: jest.fn(),
}));

describe('useInitApp', () => {
  it('returns TAB route when user is onboarded', () => {
    (getStorageData as jest.Mock).mockReturnValue({ isOnboarded: true });

    const { result } = renderHook(() => useInitApp());

    expect(result.current.initialRouteName).toBe(RootRoutes.TAB);
    expect(result.current.initialNavigationState).toEqual({
      index: 1,
      routes: [{ name: RootRoutes.TAB }, { name: RootRoutes.SPLASH_VIEW_MODAL }],
    });
  });

  it('returns GET_STARTED_SCREEN route when user is not onboarded', () => {
    (getStorageData as jest.Mock).mockReturnValue({ isOnboarded: false });

    const { result } = renderHook(() => useInitApp());

    expect(result.current.initialRouteName).toBe(RootRoutes.GET_STARTED_SCREEN);
    expect(result.current.initialNavigationState).toEqual({
      index: 1,
      routes: [{ name: RootRoutes.GET_STARTED_SCREEN }, { name: RootRoutes.SPLASH_VIEW_MODAL }],
    });
  });
});

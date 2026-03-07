import { act, renderHook } from '@testing-library/react-native';

import { useHandleStoryPlayerNavigate } from '@/hooks/navigation/useHandleStoryPlayerNavigate';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { selectIsFullVersion } from '@/store/user/user.selector';

jest.unmock('@/hooks/navigation/useHandleStoryPlayerNavigate');

jest.mock('@/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/store/user/user.selector', () => ({
  selectIsFullVersion: jest.fn(),
}));

jest.mock('@/navigation/hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn(),
}));

jest.mock('@/hooks/navigation/useShowPaywallModal', () => ({
  useShowPaywallModal: jest.fn(),
}));

describe('useHandleStoryPlayerNavigate', () => {
  const navigateMock = jest.fn();
  const showPaywallModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });
    (useShowPaywallModal as jest.Mock).mockReturnValue({ showPaywallModal: showPaywallModalMock });
  });

  it('navigates to story player if user is full version', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectIsFullVersion) {
        return true;
      }
      return false;
    });

    const { result } = renderHook(() =>
      useHandleStoryPlayerNavigate({
        isFree: false,
        source: SOURCE.TALE_PREVIEW,
        storyId: 1,
        tab: 'All tales',
      }),
    );

    act(() => {
      result.current();
    });

    expect(navigateMock).toHaveBeenCalledWith(RootRoutes.STORY_PLAYER, {
      storyId: 1,
      tab: 'All tales',
    });
    expect(showPaywallModalMock).not.toHaveBeenCalled();
  });

  it('navigates to story player if tale is free, even if not full version', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectIsFullVersion) {
        return false;
      }
      return false;
    });

    const { result } = renderHook(() =>
      useHandleStoryPlayerNavigate({
        isFree: true,
        source: SOURCE.TALE_PREVIEW,
        storyId: 2,
        tab: 'All tales',
      }),
    );

    act(() => {
      result.current();
    });

    expect(navigateMock).toHaveBeenCalledWith(RootRoutes.STORY_PLAYER, {
      storyId: 2,
      tab: 'All tales',
    });
    expect(showPaywallModalMock).not.toHaveBeenCalled();
  });

  it('shows paywall modal if not full version and tale is not free', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectIsFullVersion) {
        return false;
      }
      return false;
    });

    const { result } = renderHook(() =>
      useHandleStoryPlayerNavigate({
        contentName: 'Premium Tale',
        isFree: false,
        source: SOURCE.TALE_PREVIEW,
        storyId: 3,
        tab: 'All tales',
      }),
    );

    act(() => {
      result.current();
    });

    expect(navigateMock).not.toHaveBeenCalled();
    expect(showPaywallModalMock).toHaveBeenCalledWith({
      contentName: 'Premium Tale',
      source: SOURCE.TALE_PREVIEW,
      tab: 'All tales',
    });
  });
});

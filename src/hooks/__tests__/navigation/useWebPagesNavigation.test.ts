import { act, renderHook } from '@testing-library/react-native';

import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '@/constants/common';
import { useWebPagesNavigation } from '@/hooks/navigation/useWebPagesNavigation';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';

jest.unmock('@/hooks/navigation/useWebPagesNavigation');

jest.mock('@/navigation/hooks/useAppNavigation', () => ({
  useAppNavigation: jest.fn(),
}));

describe('useWebPagesNavigation', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });
  });

  it('navigates to terms of service url', () => {
    const { result } = renderHook(() => useWebPagesNavigation());

    act(() => {
      result.current.openTermsOfService();
    });

    expect(navigateMock).toHaveBeenCalledWith(RootRoutes.WEB_PAGE_SCREEN, {
      url: TERMS_OF_SERVICE_URL,
    });
  });

  it('navigates to privacy policy url', () => {
    const { result } = renderHook(() => useWebPagesNavigation());

    act(() => {
      result.current.openPrivacyPolicy();
    });

    expect(navigateMock).toHaveBeenCalledWith(RootRoutes.WEB_PAGE_SCREEN, {
      url: PRIVACY_POLICY_URL,
    });
  });
});

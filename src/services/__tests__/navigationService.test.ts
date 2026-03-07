import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';

import { navigationService } from '../navigation/navigationService';

jest.mock('@/navigation/RootNavigator/RootNavigator.types', () => ({}));
jest.mock('@/navigation/types/allRoutes', () => ({}));
jest.mock('@/navigation/types/props', () => ({}));

describe('NavigationService', () => {
  beforeEach(() => {
    // Reset to initial state
    navigationService.currentRouteName = SharedRoutes.HOME;
    navigationService.activeTab = TabRoutes.HOME;
    navigationService.setRef(null);
  });

  it('has the initial currentRouteName as HOME', () => {
    expect(navigationService.currentRouteName).toBe(SharedRoutes.HOME);
  });

  it('has the initial activeTab as HOME', () => {
    expect(navigationService.activeTab).toBe(TabRoutes.HOME);
  });

  describe('onChangeActiveTab', () => {
    it('updates the activeTab', () => {
      navigationService.onChangeActiveTab(TabRoutes.FAVORITES);

      expect(navigationService.activeTab).toBe(TabRoutes.FAVORITES);
    });
  });

  describe('setRef', () => {
    it('sets the navigation ref', () => {
      const mockRef = { isReady: jest.fn().mockReturnValue(true) };

      navigationService.setRef(mockRef as never);

      // No error thrown means ref was set successfully
      expect(mockRef.isReady).not.toHaveBeenCalled();
    });

    it('accepts null to clear the ref', () => {
      navigationService.setRef(null);

      // navigate should not throw without a ref
      navigationService.navigate('test' as never);
    });
  });

  describe('navigate', () => {
    it('calls navigate on the ref when it is ready', () => {
      const mockNavigate = jest.fn();
      const mockRef = {
        isReady: jest.fn().mockReturnValue(true),
        navigate: mockNavigate,
      };

      navigationService.setRef(mockRef as never);
      navigationService.navigate('testRoute' as never);

      expect(mockNavigate).toHaveBeenCalled();
    });

    it('does not call navigate when ref is not ready', () => {
      const mockNavigate = jest.fn();
      const mockRef = {
        isReady: jest.fn().mockReturnValue(false),
        navigate: mockNavigate,
      };

      navigationService.setRef(mockRef as never);
      navigationService.navigate('testRoute' as never);

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('does not call navigate when ref is null', () => {
      navigationService.setRef(null);

      // Should not throw
      expect(() => navigationService.navigate('testRoute' as never)).not.toThrow();
    });
  });

  describe('onStateChange', () => {
    it('does nothing when ref is null', () => {
      navigationService.setRef(null);
      navigationService.onStateChange();

      expect(navigationService.currentRouteName).toBe(SharedRoutes.HOME);
    });

    it('updates currentRouteName from the current route', () => {
      const mockRef = {
        getCurrentRoute: jest.fn().mockReturnValue({ name: 'settings' }),
      };

      navigationService.setRef(mockRef as never);
      navigationService.onStateChange();

      expect(navigationService.currentRouteName).toBe('settings');
    });

    it('extracts activeTab from route name with underscore', () => {
      const mockRef = {
        getCurrentRoute: jest.fn().mockReturnValue({ name: 'favoritesTab_detail' }),
      };

      navigationService.setRef(mockRef as never);
      navigationService.onStateChange();

      expect(navigationService.activeTab).toBe('favoritesTab');
    });

    it('does not update activeTab when route name has no underscore', () => {
      const mockRef = {
        getCurrentRoute: jest.fn().mockReturnValue({ name: 'settings' }),
      };

      navigationService.setRef(mockRef as never);
      navigationService.activeTab = TabRoutes.HOME;
      navigationService.onStateChange();

      expect(navigationService.activeTab).toBe(TabRoutes.HOME);
    });

    it('sets currentRouteName to empty string when getCurrentRoute returns undefined', () => {
      const mockRef = {
        getCurrentRoute: jest.fn().mockReturnValue(undefined),
      };

      navigationService.setRef(mockRef as never);
      navigationService.onStateChange();

      expect(navigationService.currentRouteName).toBe('');
    });
  });
});

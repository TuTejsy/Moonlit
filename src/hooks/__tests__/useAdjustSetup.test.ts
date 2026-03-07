import { renderHook } from '@testing-library/react-native';
import { Adjust, AdjustConfig } from 'react-native-adjust';

import { useAdjustSetup } from '../useAdjustSetup';

jest.unmock('@/hooks/useAdjustSetup');

jest.mock('@/constants/common', () => ({
  IS_IOS: true,
}));

jest.mock('@/constants/auth', () => ({
  ADJUST_ANDROID_TOKEN: 'android-token',
  ADJUST_IOS_TOKEN: 'ios-token',
}));

describe('useAdjustSetup', () => {
  const mockSetLogLevel = jest.fn();
  const mockSetDeactivateSkAdNetworkHandling = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (AdjustConfig as unknown as jest.Mock).mockImplementation(() => ({
      setDeactivateSkAdNetworkHandling: mockSetDeactivateSkAdNetworkHandling,
      setLogLevel: mockSetLogLevel,
    }));
  });

  const originalDev = (global as any).__DEV__;

  afterEach(() => {
    (global as any).__DEV__ = originalDev;
  });

  it('initializes Adjust with correct config in DEV mode', () => {
    (global as any).__DEV__ = true;

    const { unmount } = renderHook(() => useAdjustSetup());

    expect(AdjustConfig).toHaveBeenCalledWith('ios-token', AdjustConfig.EnvironmentSandbox);
    expect(mockSetLogLevel).toHaveBeenCalledWith(AdjustConfig.LogLevelVerbose);
    expect(Adjust.initSdk).toHaveBeenCalled();

    unmount();
    expect(Adjust.componentWillUnmount).toHaveBeenCalled();
  });

  it('initializes Adjust with correct config in PROD mode', () => {
    (global as any).__DEV__ = false;

    const { unmount } = renderHook(() => useAdjustSetup());

    expect(AdjustConfig).toHaveBeenCalledWith('ios-token', AdjustConfig.EnvironmentProduction);
    expect(mockSetLogLevel).toHaveBeenCalledWith(AdjustConfig.LogLevelSuppress);
    expect(Adjust.initSdk).toHaveBeenCalled();

    unmount();
    expect(Adjust.componentWillUnmount).toHaveBeenCalled();
  });
});

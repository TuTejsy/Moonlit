import { Platform } from 'react-native';

import { platformSelect } from '../platformSelect';

describe('platformSelect', () => {
  it('delegates to Platform.select and returns the correct platform value', () => {
    // In RN test env, Platform.OS is 'ios' by default
    const result = platformSelect({ android: 'android-value', ios: 'ios-value' });

    expect(result).toBe('ios-value');
  });

  it('works with numeric values', () => {
    const result = platformSelect<number>({ android: 20, ios: 10 });

    expect(result).toBe(10);
  });

  it('works with object values', () => {
    const iosConfig = { fontSize: 14 };
    const androidConfig = { fontSize: 16 };

    const result = platformSelect({ android: androidConfig, ios: iosConfig });

    expect(result).toEqual({ fontSize: 14 });
  });

  it('returns undefined when the current platform is not in the map', () => {
    // Only providing android on an iOS test env
    const result = platformSelect<string>({ android: 'android-only' });

    expect(result).toBeUndefined();
  });

  it('returns the value from Platform.select', () => {
    const selectSpy = jest.spyOn(Platform, 'select');

    platformSelect({ android: 'a', ios: 'b' });

    expect(selectSpy).toHaveBeenCalledWith({ android: 'a', ios: 'b' });

    selectSpy.mockRestore();
  });
});

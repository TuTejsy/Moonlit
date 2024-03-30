import { Platform, PlatformOSType } from 'react-native';

export const platformSelect = <T>(platforms: { [platform in PlatformOSType]?: T }) =>
  Platform.select<T>(platforms) as T;

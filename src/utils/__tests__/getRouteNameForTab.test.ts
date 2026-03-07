import { getRouteNameForTab } from '../navigation/getRouteNameForTab';

describe('getRouteNameForTab', () => {
  it('prepends the tab name to the route name', () => {
    const result = getRouteNameForTab('HomeScreen', 'HomeTab');

    expect(result).toBe('HomeTab_HomeScreen');
  });

  it('works with different tab and route names', () => {
    const result = getRouteNameForTab('SettingsScreen', 'ProfileTab');

    expect(result).toBe('ProfileTab_SettingsScreen');
  });

  it('returns the correct format with empty tab name', () => {
    const result = getRouteNameForTab('Screen', '');

    expect(result).toBe('_Screen');
  });

  it('handles empty route name', () => {
    const result = getRouteNameForTab('', 'Tab');

    expect(result).toBe('Tab_');
  });
});

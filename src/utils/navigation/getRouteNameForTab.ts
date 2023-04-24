export const getRouteNameForTab = <T>(routeName: T, tabName: string): T => {
  return `${tabName}_${routeName}` as unknown as T;
};

import { NavigationState, PartialState } from '@react-navigation/native';
import { isNull, isUndefined } from 'lodash';

export const getCurrentRoute = (
  state: NavigationState | PartialState<NavigationState>,
): string | undefined => {
  const nextRoute =
    !isUndefined(state.index) && !isNull(state.index) ? state.routes[state.index] : null;
  if (nextRoute?.state) {
    return getCurrentRoute(nextRoute.state);
  }
  return nextRoute?.name;
};

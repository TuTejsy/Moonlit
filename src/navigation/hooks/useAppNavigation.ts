import { useNavigation } from '@react-navigation/native';

import { AllRoutes } from '../types/allRoutes';
import { NavigationAppProp } from '../types/props';

export const useAppNavigation = useNavigation as <
  R extends AllRoutes | unknown = unknown,
>() => NavigationAppProp<R>;

import { useRoute } from '@react-navigation/native';

import { AllRoutes } from '../types/allRoutes';
import { RouteAppProp } from '../types/props';

export const useAppRoute = useRoute as <R extends AllRoutes>() => RouteAppProp<R>;

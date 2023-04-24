import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import type { SharedScreenProps } from '@/navigation/types';

type NavigationTypeFromProps = SharedScreenProps<SharedRoutes.HOME>;

export type NavigationType = NavigationTypeFromProps['navigation'];
export type RouteType = NavigationTypeFromProps['route'];

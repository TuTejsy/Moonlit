import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import type { RootScreenProps } from '@/navigation/types';

type NavigationTypeFromProps = RootScreenProps<RootRoutes.GET_STARTED_TO_RECORD>;

export type NavigationType = NavigationTypeFromProps['navigation'];
export type RouteType = NavigationTypeFromProps['route'];

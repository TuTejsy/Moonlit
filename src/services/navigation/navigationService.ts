import { NavigationContainerRef } from '@react-navigation/native';

import { RootStackParams } from '@/navigation/RootNavigator/RootNavigator.types';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';
import { AllRoutes } from '@/navigation/types/allRoutes';
import { NavigationAppProp } from '@/navigation/types/props';

class NavigationService {
  private navigationRef: NavigationContainerRef<RootStackParams> | null = null;

  currentRouteName = SharedRoutes.HOME;

  activeTab = TabRoutes.HOME;

  onChangeActiveTab = (tab: TabRoutes) => {
    this.activeTab = tab;
  };

  setRef = (ref: NavigationContainerRef<RootStackParams> | null) => {
    this.navigationRef = ref;
  };

  navigate: NavigationAppProp<AllRoutes>['navigate'] = (...args) => {
    if (this.navigationRef?.isReady()) {
      this.navigationRef.navigate(...(args as never));
    }
  };

  onStateChange = () => {
    if (!this.navigationRef) {
      return;
    }

    this.currentRouteName = (this.navigationRef?.getCurrentRoute()?.name ?? '') as SharedRoutes;

    if (this.currentRouteName.includes('_')) {
      this.activeTab = this.currentRouteName.split('_')[0] as TabRoutes;
    }
  };
}

export const navigationService = new NavigationService();

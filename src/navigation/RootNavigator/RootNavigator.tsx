import { useCallback } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { isDevMode } from '@/constants/common';
import { useTheme } from '@/hooks/theme/useTheme';
import { TabNavigator } from '@/navigation/TabNavigator/TabNavigator';
import { DevMenuModal } from '@/screens/DevMenuScreens/DevMenuModal/DevMenuModal';
import { GetStartedScreen } from '@/screens/GetStartedScreen/GetStartedScreen';
import { PaywallModal } from '@/screens/PaywallModal/PaywallModal';
import { SplashViewModal } from '@/screens/SplashViewModal/SplashViewModal';
import { StoryPlayerScreen } from '@/screens/StoryPlayerScreens/StoryPlayerScreen/StoryPlayerScreen';
import { VoiceSettingsModal } from '@/screens/StoryPlayerScreens/VoiceSettingsModal/VoiceSettingsModal';
import { WebPageScreen } from '@/screens/WebPageScreen/WebPageScreen';

import {
  getStartedScreenOptions,
  paywallOptions,
  paywallScreenOptions,
  rootModalOptions,
  rootOptions,
  splashViewModalOptions,
  storyPlayerOptions,
  tabOptions,
  voiceSettingsModalOptions,
  webPageScreenOptions,
} from './RootNavigator.options';
import { RootRoutes } from './RootNavigator.routes';
import { RootStackParams } from './RootNavigator.types';

const RootStack = createStackNavigator<RootStackParams>();

interface RootNavigatorParams {
  initialRouteName: string;
}

export const RootNavigator = ({ initialRouteName }: RootNavigatorParams) => {
  const theme = useTheme();
  const Tab = useCallback(
    () => <TabNavigator isInitialRoute={initialRouteName === RootRoutes.TAB} />,
    [initialRouteName],
  );

  return (
    <RootStack.Navigator initialRouteName={initialRouteName} screenOptions={rootOptions(theme)}>
      <RootStack.Screen component={Tab} name={RootRoutes.TAB} options={tabOptions} />
      <RootStack.Screen
        component={StoryPlayerScreen}
        name={RootRoutes.STORY_PLAYER}
        options={storyPlayerOptions}
      />

      <RootStack.Screen
        component={GetStartedScreen}
        name={RootRoutes.GET_STARTED_SCREEN}
        options={getStartedScreenOptions}
      />

      <RootStack.Screen
        component={WebPageScreen}
        name={RootRoutes.WEB_PAGE_SCREEN}
        options={webPageScreenOptions}
      />

      <RootStack.Screen
        component={PaywallModal}
        name={RootRoutes.PAYWALL_SCREEN}
        options={paywallScreenOptions}
      />

      <RootStack.Group screenOptions={rootModalOptions(theme)}>
        <RootStack.Screen
          component={PaywallModal}
          name={RootRoutes.PAYWALL_MODAL}
          options={paywallOptions}
        />
        <RootStack.Screen
          component={VoiceSettingsModal}
          name={RootRoutes.VOICE_SETTINGS_MODAL}
          options={voiceSettingsModalOptions}
        />
        <RootStack.Screen
          component={SplashViewModal}
          name={RootRoutes.SPLASH_VIEW_MODAL}
          options={splashViewModalOptions}
        />

        {/**
         * Debug
         */}

        {isDevMode() && (
          <RootStack.Screen component={DevMenuModal} name={RootRoutes.DEV_MENU_MODAL} />
        )}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'react-native';

import * as amplitude from '@amplitude/analytics-react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { adapty } from 'react-native-adapty';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppLogicProvider } from '@/components/Providers/AppLogicProvider/AppLogicProvider';
import { ADAPTY_API_KEY, AMPLITUDE_API_KEY } from '@/constants/auth';
import { IS_IOS } from '@/constants/common';
import { AudioRecordingsDB, StoriesDB } from '@/database';
import { useInitTheme } from '@/hooks/theme/useInitTheme';
import { ThemeContext } from '@/hooks/theme/useTheme';
import { useInitApp } from '@/hooks/useInitApp';
import { SharedKeyboardHeightProvider } from '@/hooks/useSharedKeyboardHeight';
import { RootNavigator } from '@/navigation/RootNavigator/RootNavigator';
import { navigationService } from '@/services/navigation/navigationService';
import { store, storePersistor } from '@/store/store';
import { darkNavTheme } from '@/styles/themes/dark';

if (!__DEV__) {
  console.log = () => undefined;
  console.warn = () => undefined;
  console.error = () => undefined;
}

StoriesDB.open();
AudioRecordingsDB.open();
// StoriesDB.open().then(() => StoriesDB.dropDatabase());
// AudioRecordingsDB.open().then(() => AudioRecordingsDB.dropDatabase());

adapty.activate(ADAPTY_API_KEY);

amplitude.init(AMPLITUDE_API_KEY, undefined, {
  logLevel: __DEV__ ? amplitude.Types.LogLevel.Error : amplitude.Types.LogLevel.None,
});

function App(): JSX.Element {
  const theme = useInitTheme();

  const { initialNavigationState, initialRouteName } = useInitApp();

  return (
    <Provider store={store}>
      <PersistGate persistor={storePersistor}>
        <ThemeContext.Provider value={theme}>
          <SharedKeyboardHeightProvider>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar
                  backgroundColor={theme.colors.opacityDarkPurple(1)}
                  barStyle='light-content'
                />
                <NavigationContainer
                  ref={navigationService.setRef}
                  initialState={initialNavigationState}
                  theme={darkNavTheme}
                  onStateChange={navigationService.onStateChange}
                >
                  <BottomSheetModalProvider>
                    <AppLogicProvider>
                      {/* {__DEV__ && (
                        <RealmPlugin realms={[StoriesDB.realm, AudioRecordingsDB.realm]} />
                      )} */}
                      <RootNavigator initialRouteName={initialRouteName} />
                    </AppLogicProvider>
                  </BottomSheetModalProvider>
                </NavigationContainer>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </SharedKeyboardHeightProvider>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import RealmPlugin from 'realm-flipper-plugin-device';

import { AppLogicProvider } from '@/components/Providers/AppLogicProvider/AppLogicProvider';
import { AudioRecordingsDB, StoriesDB } from '@/database';
import { useInitTheme } from '@/hooks/theme/useInitTheme';
import { ThemeContext } from '@/hooks/theme/useTheme';
import { SharedKeyboardHeightProvider } from '@/hooks/useSharedKeyboardHeight';
import { RootNavigator } from '@/navigation/RootNavigator/RootNavigator';
import { navigationService } from '@/services/navigation/navigationService';
import { darkNavTheme } from '@/styles/themes/dark';

if (!__DEV__) {
  console.log = () => undefined;
  console.warn = () => undefined;
  console.error = () => undefined;
}

// StoriesDB.open();
// AudioRecordingsDB.open();
StoriesDB.open().then(() => StoriesDB.dropDatabase());
AudioRecordingsDB.open().then(() => AudioRecordingsDB.dropDatabase());

function App(): JSX.Element {
  const theme = useInitTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <SharedKeyboardHeightProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.colors.white} barStyle='light-content' />
            <NavigationContainer
              ref={navigationService.setRef}
              theme={darkNavTheme}
              onStateChange={navigationService.onStateChange}
            >
              <BottomSheetModalProvider>
                <AppLogicProvider>
                  {__DEV__ && <RealmPlugin realms={[StoriesDB.realm]} />}
                  <RootNavigator />
                </AppLogicProvider>
              </BottomSheetModalProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SharedKeyboardHeightProvider>
    </ThemeContext.Provider>
  );
}

export default App;

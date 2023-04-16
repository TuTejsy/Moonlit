/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';

import { useInitTheme } from '@/hooks/theme/useInitTheme';
import { ThemeContext } from '@/hooks/theme/useTheme';
import { SharedKeyboardHeightProvider } from '@/hooks/useSharedKeyboardHeight';
import { RootNavigator } from '@/navigation/RootNavigator/RootNavigator';
import { navigationService } from '@/services/navigation/navigationService';
import { lightNavTheme } from '@/styles/themes/dark';

if (!__DEV__) {
  console.log = () => undefined;
  console.warn = () => undefined;
  console.error = () => undefined;
}

enableFreeze(true);

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
              theme={lightNavTheme}
              onStateChange={navigationService.onStateChange}
            >
              <BottomSheetModalProvider>
                <RootNavigator />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SharedKeyboardHeightProvider>
    </ThemeContext.Provider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import VoiceWaveform from '@/components/VoiceWaveform/VoiceWaveform';
import { useInitTheme } from '@/hooks/theme/useInitTheme';
import { ThemeContext } from '@/hooks/theme/useTheme';
import { SharedKeyboardHeightProvider } from '@/hooks/useSharedKeyboardHeight';

const framesPowerValues = [8, 28, 8, 8, 24, 44, 24, 44, 24, 8, 8, 24, 8];

function App(): JSX.Element {
  const theme = useInitTheme();

  const isDarkMode = useColorScheme() === 'dark';

  const voicePowerSharedValue = useSharedValue(4);

  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
  };

  useEffect(() => {
    let index = 0;
    setInterval(() => {
      voicePowerSharedValue.value = framesPowerValues[index];

      if (index >= framesPowerValues.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
    }, 500);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <SharedKeyboardHeightProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              backgroundColor={backgroundStyle.backgroundColor}
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />

            <View style={styles.content}>
              <VoiceWaveform
                maxHeight={44}
                minHeight={4}
                numberOfFrames={20}
                voicePowerSharedValue={voicePowerSharedValue}
              />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </SharedKeyboardHeightProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: Colors.darker,
    flex: 1,
    justifyItems: 'center',
    paddingTop: 200,
  },
});

export default App;

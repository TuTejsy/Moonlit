import { useCallback, useState } from 'react';
import { View, DevSettings } from 'react-native';

import Dialog from 'react-native-dialog';

import { DEV_MODE_PASSWORD, DEV_MODE_PRESS_COUNT } from '@/constants/common';
import { appStorage } from '@/services/storage/storage';
import { isDevEnv } from '@/utils/getEnv';

export const useDevMode = () => {
  const [password, setPassword] = useState('');
  const [devModeCount, setDevModeCount] = useState(0);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const enableDevMode = useCallback(() => {
    appStorage.devMode = true;

    DevSettings.reload();
  }, []);

  const hidePasswordDialog = useCallback(() => setShowPasswordDialog(false), []);

  const handleOkPress = useCallback(() => {
    if (password === DEV_MODE_PASSWORD) {
      enableDevMode();
      hidePasswordDialog();
    }
  }, [password, hidePasswordDialog, enableDevMode]);

  const renderDevModeDialog = useCallback(() => {
    return (
      !isDevEnv() && (
        <View>
          <Dialog.Container visible={showPasswordDialog}>
            <Dialog.Title>Enter Password</Dialog.Title>
            <Dialog.Input value={password} onChangeText={setPassword} />
            <Dialog.Button label='Cancel' onPress={hidePasswordDialog} />
            <Dialog.Button label='Ok' onPress={handleOkPress} />
          </Dialog.Container>
        </View>
      )
    );
  }, [showPasswordDialog, password, hidePasswordDialog, handleOkPress]);

  const handleDevModePress = useCallback(() => {
    if (devModeCount >= DEV_MODE_PRESS_COUNT) {
      setShowPasswordDialog(true);
      setDevModeCount(0);
    }
    setDevModeCount((prev) => prev + 1);
  }, [devModeCount]);

  return {
    onDevModePress: handleDevModePress,
    renderDevModeDialog,
  };
};

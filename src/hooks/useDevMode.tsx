import { useCallback, useState } from 'react';
import { View } from 'react-native';

import Dialog from 'react-native-dialog';

import { DEV_MODE_PASSWORD, DEV_MODE_PRESS_COUNT } from '@/constants/auth';
import { isDevMode } from '@/constants/common';
import { storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';

export const useDevMode = () => {
  const [password, setPassword] = useState('');
  const [devModeCount, setDevModeCount] = useState(0);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const enableDevMode = useCallback(() => {
    storage.set(StorageKeys.DevMode, true);
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
      <View>
        <Dialog.Container visible={showPasswordDialog}>
          <Dialog.Title>Enter Password</Dialog.Title>
          <Dialog.Input value={password} onChangeText={setPassword} />
          <Dialog.Button label='Cancel' onPress={hidePasswordDialog} />
          <Dialog.Button label='Ok' onPress={handleOkPress} />
        </Dialog.Container>
      </View>
    );
  }, [showPasswordDialog, password, hidePasswordDialog, handleOkPress]);

  const handleDevModePress = useCallback(() => {
    if (!isDevMode()) {
      if (devModeCount >= DEV_MODE_PRESS_COUNT) {
        setShowPasswordDialog(true);
        setDevModeCount(0);
      }
      setDevModeCount((prev) => prev + 1);
    }
  }, [devModeCount]);

  return {
    onDevModePress: handleDevModePress,
    renderDevModeDialog,
  };
};

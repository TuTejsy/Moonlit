import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ModalHeader } from '@/components/Headers/ModalHeader/ModalHeader';
import { isDevMode } from '@/constants/common';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';

import { DevMenuSwitchCell } from '../components/DevMenuSwitchCell/DevMenuSwitchCell';

import { makeStyles } from './DevMenuMainModal.styles';

export const DevMenuMainModal = () => {
  const styles = useMakeStyles(makeStyles);

  const [isDevModeEnabled, setIsDevModeEnabled] = useState(isDevMode());

  const handleDevModeValueChanged = useCallback((value: boolean) => {
    setIsDevModeEnabled(value);
    storage.set(StorageKeys.DevMode, value);
  }, []);

  return (
    <View style={styles.screen}>
      <ModalHeader style={styles.header} title='Debug Menu' />

      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
        <DevMenuSwitchCell
          title='Dev Mode'
          value={isDevModeEnabled}
          onValueChange={handleDevModeValueChanged}
        />
      </ScrollView>
    </View>
  );
};

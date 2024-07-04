import { useCallback, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';

import { ModalHeader } from '@/components/Headers/ModalHeader/ModalHeader';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { DevMenuRoutes } from '@/navigation/DebugNavigator/DevMenuNavigator.routes';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { remoteConfigService } from '@/services/remoteConfig/remoteConfig';
import { REMOTE_CONFIG_FIELDS } from '@/services/remoteConfig/remoteConfig.constants';
import { getStorageData, storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';
import { selectIsFullVersion } from '@/store/user/user.selector';
import { lockFullVersion, unlockFullVersion } from '@/store/user/user.slice';

import { DebugMenuValueCell } from '../components/DebugMenuValueCell/DebugMenuValueCell';
import { DevMenuSwitchCell } from '../components/DevMenuSwitchCell/DevMenuSwitchCell';

import { makeStyles } from './DevMenuMainModal.styles';

export const DevMenuMainModal = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const navigation = useAppNavigation<DevMenuRoutes.MAIN>();

  const isFullAccess = useAppSelector(selectIsFullVersion);
  const dispatch = useAppDispatch();

  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(
    !!getStorageData().isAnaltyicsEnabled,
  );
  const [isRemoteConfigLiveUpdateEnabled, setIsRemoteConfigLiveUpdateEnabled] = useState(
    !!remoteConfigService.isLiveUpdateEnabled,
  );

  const handleAnalyticsEnabledValueChanged = useCallback((value: boolean) => {
    setIsAnalyticsEnabled(value);
    storage.set(StorageKeys.isAnaltyticsEnabled, value);
  }, []);

  const handleisRemoteConfigLiveUpdateEnabledValueChanged = useCallback((value: boolean) => {
    setIsRemoteConfigLiveUpdateEnabled(value);

    if (value) {
      remoteConfigService.enableLiveUpdate();
    } else {
      remoteConfigService.disableLiveUpdate();
    }
  }, []);

  const handleFullAccessValueChanged = useCallback(
    (value: boolean) => {
      dispatch(value ? unlockFullVersion() : lockFullVersion());
    },
    [dispatch],
  );

  const handleTurnOffDevMode = useCallback(() => {
    storage.set(StorageKeys.DevMode, false);
    navigation.goBack();
  }, [navigation]);

  const handleResetOnboarding = useCallback(() => {
    storage.set(StorageKeys.isOnboarded, false);
    navigation.reset({
      index: 0,
      routes: [{ name: RootRoutes.GET_STARTED_SCREEN }],
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ModalHeader style={styles.header} title='Debug Menu' />

      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
        <TextView style={styles.title} type='medium'>
          Configuration
        </TextView>

        <DevMenuSwitchCell
          title='Remote Config Live Update'
          value={isRemoteConfigLiveUpdateEnabled}
          onValueChange={handleisRemoteConfigLiveUpdateEnabledValueChanged}
        />
        <DevMenuSwitchCell
          title='Analytics enabled'
          value={isAnalyticsEnabled}
          onValueChange={handleAnalyticsEnabledValueChanged}
        />
        <DevMenuSwitchCell
          title='Full version unlocked'
          value={isFullAccess}
          onValueChange={handleFullAccessValueChanged}
        />

        <TextView style={styles.title} type='medium'>
          Remote Config Values
        </TextView>

        <DebugMenuValueCell
          title={REMOTE_CONFIG_FIELDS.SEGMENT}
          value={remoteConfigService.segment}
        />
        <DebugMenuValueCell
          title={REMOTE_CONFIG_FIELDS.PLACEMENT_ID}
          value={remoteConfigService.placementId}
        />
        <DebugMenuValueCell
          title={REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_NO_TRIAL}
          value={remoteConfigService.buyButtonTextNoTrial}
        />
        <DebugMenuValueCell
          title={REMOTE_CONFIG_FIELDS.BUY_BUTTON_TEXT_TRIAL}
          value={remoteConfigService.buyButtonTextTrial}
        />

        <DebugMenuValueCell
          title={REMOTE_CONFIG_FIELDS.TOGGLE_STATE}
          value={remoteConfigService.toggleState ? 'true' : 'false'}
        />

        <TextView style={styles.title} type='medium'>
          Actions
        </TextView>

        <View style={styles.button}>
          <Button color={colors.pink} title='Reset Onboarding' onPress={handleResetOnboarding} />
        </View>

        <View style={styles.button}>
          <Button color={colors.red} title='Turn off DevMode' onPress={handleTurnOffDevMode} />
        </View>
      </ScrollView>
    </View>
  );
};

import { useCallback, useMemo, useState } from 'react';
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
import { parsePaywallRemoteConfig } from '@/screens/PaywallModal/utils/paywallRemoteConfig.utils';
import { resolveAnalyticsSegment } from '@/services/analytics/analytics';
import { getStorageData, storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';
import {
  selectPaywallName,
  selectPaywallRemoteConfig,
} from '@/store/subscription/subscription.selector';
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
  const paywallName = useAppSelector(selectPaywallName);
  const paywallRemoteConfig = useAppSelector(selectPaywallRemoteConfig);
  const dispatch = useAppDispatch();

  const parsedRemoteConfig = useMemo(
    () => parsePaywallRemoteConfig(paywallRemoteConfig),
    [paywallRemoteConfig],
  );

  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(
    !!getStorageData().isAnaltyicsEnabled,
  );

  const handleAnalyticsEnabledValueChanged = useCallback((value: boolean) => {
    setIsAnalyticsEnabled(value);
    storage.set(StorageKeys.isAnaltyticsEnabled, value);
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
          Paywall remote config
        </TextView>

        <DebugMenuValueCell title='segment' value={resolveAnalyticsSegment(paywallRemoteConfig)} />
        <DebugMenuValueCell title='Paywall name (Adapty)' value={paywallName ?? 'not loaded'} />
        <DebugMenuValueCell
          title='buy_button_text_no_trial'
          value={parsedRemoteConfig.buyButtonTextNoTrial}
        />
        <DebugMenuValueCell
          title='buy_button_text_trial'
          value={parsedRemoteConfig.buyButtonTextTrial}
        />
        <DebugMenuValueCell
          title='toggle_state'
          value={parsedRemoteConfig.toggleState ? 'true' : 'false'}
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

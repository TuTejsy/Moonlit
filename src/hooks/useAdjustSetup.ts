import { useEffect } from 'react';

import { Adjust, AdjustConfig } from 'react-native-adjust';

import { ADJUST_IOS_TOKEN, ADJUST_ANDROID_TOKEN } from '@/constants/auth';
import { IS_IOS } from '@/constants/common';

export const useAdjustSetup = () => {
  useEffect(() => {
    const adjustConfig = new AdjustConfig(
      IS_IOS ? ADJUST_IOS_TOKEN : ADJUST_ANDROID_TOKEN,
      __DEV__ ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction,
    );

    if (__DEV__) {
      adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    } else {
      adjustConfig.setLogLevel(AdjustConfig.LogLevelSuppress);
    }

    Adjust.initSdk(adjustConfig);

    return () => {
      Adjust.componentWillUnmount();
    };
  }, []);
};

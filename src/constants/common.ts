import { Platform } from 'react-native';

import RNFS from 'react-native-fs';

import { getApplicationEnv } from '@/utils/getEnv';
import { platformSelect } from '@/utils/platformSelect';

export const Fonts = Object.freeze({
  ArialBold: platformSelect({ android: 'Arial-Bold', ios: 'Arial-BoldMT' }),
  ArialRegular: platformSelect({ android: 'Arial', ios: 'ArialMT' }),
});

export const IS_IOS = Platform.OS === 'ios';

export const IS_ANDROID = Platform.OS === 'android';

export const isSandbox = () => getApplicationEnv() === 'sandbox';

export const IS_JEST_ENV = process.env.JEST_WORKER_ID;

export const SANDBOX = {
  DOCUMENTS: {
    get ORIGINAL() {
      return `${RNFS.DocumentDirectoryPath}/original`;
    },
    get PREVIEW() {
      return `${RNFS.DocumentDirectoryPath}/preview`;
    },
    get TEMP() {
      return `${RNFS.DocumentDirectoryPath}/temp`;
    },
    get VOICE() {
      return `${RNFS.DocumentDirectoryPath}/voice`;
    },
  },
};

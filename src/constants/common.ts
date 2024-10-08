import { Platform } from 'react-native';

import Config from 'react-native-config';
import RNFS from 'react-native-fs';

import { getApplicationEnv } from '@/utils/getEnv';

// import { getApplicationEnv } from '@/utils/getEnv';

export const Fonts = Object.freeze({
  PoppinsLight: 'Poppins-Light',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
});

export const { SERVER_URL } = Config;

export const IS_IOS = Platform.OS === 'ios';

export const IS_ANDROID = Platform.OS === 'android';

export const isDevMode = () => getApplicationEnv() === 'dev';

export const IS_JEST_ENV = process.env.JEST_WORKER_ID;

export const SWITCH_PLACEMENT_ID = 'FULL_ACCESS';
export const SELECTION_PLACEMENT_ID = 'FULL_ACCESS_SELECTION';

export const BUNDLE_PATH = RNFS.MainBundlePath;

export const SUPPORT_EMAIL = 'appmoonlit@gmail.com';
export const MOONLIT_IOS_APP_LINK = 'https://apps.apple.com/app/moonlit-tales/id6471524142';
export const MOONLIT_PLAY_STORE_APP_LINK =
  'https://play.google.com/store/apps/details?id=com.moonlit.tales';
export const STORE_LINK = IS_ANDROID ? MOONLIT_PLAY_STORE_APP_LINK : MOONLIT_IOS_APP_LINK;

export const MOONLIT_SITE_URL = 'https://moonlit.ltd/';
export const PRIVACY_POLICY_URL = 'https://moonlit.ltd/docs/privacy_policy';
export const TERMS_OF_SERVICE_URL = 'https://moonlit.ltd/docs/terms_of_service';
export const GOOGLE_PLAY_SUBSCRIPTIONS_LINK = 'https://play.google.com/store/account/subscriptions';

export const SANDBOX = {
  DOCUMENTS: {
    get FULL_COVER() {
      return `${RNFS.DocumentDirectoryPath}/full_cover`;
    },
    get MEDIUM_PREVIEW() {
      return `${RNFS.DocumentDirectoryPath}/medium_preview`;
    },
    get ORIGINAL() {
      return `${RNFS.DocumentDirectoryPath}/original`;
    },
    get SMALL_PREVIEW() {
      return `${RNFS.DocumentDirectoryPath}/small_preview`;
    },
    get STORIES() {
      return `${RNFS.DocumentDirectoryPath}/stories`;
    },
    get TEMP() {
      return `${RNFS.DocumentDirectoryPath}/temp`;
    },
    get VOICE() {
      return `${RNFS.DocumentDirectoryPath}/voice`;
    },
    get VOICE_PREVIEW() {
      return `${RNFS.DocumentDirectoryPath}/voice_preview`;
    },
  },
};

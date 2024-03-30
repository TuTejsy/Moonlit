import FileViewer from 'react-native-file-viewer';

import { BUNDLE_PATH } from '@/constants/common';

export const openPrivacyPolicy = () => {
  FileViewer.open(`${BUNDLE_PATH}/Privacy_policy.pdf`, { displayName: 'Privacy Policy' });
};

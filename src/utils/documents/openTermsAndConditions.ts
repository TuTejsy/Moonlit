import FileViewer from 'react-native-file-viewer';

import { BUNDLE_PATH } from '@/constants/common';

export const openTermsAndConditions = () => {
  FileViewer.open(`${BUNDLE_PATH}/Terms_and_Conditions.pdf`, {
    displayName: 'Terms and Conditions',
  });
};

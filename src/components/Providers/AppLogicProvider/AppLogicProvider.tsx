import { ViewProps } from 'react-native';

import { useDownloadStoriesPreviews } from './hooks/useDownloadStoriesPreviews';

export const AppLogicProvider = ({ children }: ViewProps) => {
  useDownloadStoriesPreviews();

  return children as JSX.Element;
};

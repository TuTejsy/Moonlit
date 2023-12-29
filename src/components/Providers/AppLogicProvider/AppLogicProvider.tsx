import { ViewProps } from 'react-native';

import { useCheckSubscription } from './hooks/useCheckSubscription';
import { useDownloadStoriesPreviews } from './hooks/useDownloadStoriesPreviews/useDownloadStoriesPreviews';

export const AppLogicProvider = ({ children }: ViewProps) => {
  useCheckSubscription();
  useDownloadStoriesPreviews();

  return children as JSX.Element;
};

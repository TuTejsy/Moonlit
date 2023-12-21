import { ViewProps } from 'react-native';

import { useDownloadStoriesPreviews } from './hooks/useDownloadStoriesPreviews/useDownloadStoriesPreviews';
import { useFullAccessSubscription } from './hooks/useFullAccessSubscription';

export const AppLogicProvider = ({ children }: ViewProps) => {
  useDownloadStoriesPreviews();
  useFullAccessSubscription();

  return children as JSX.Element;
};

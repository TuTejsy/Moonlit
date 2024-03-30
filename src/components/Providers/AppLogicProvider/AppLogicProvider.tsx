import { ViewProps } from 'react-native';

import { useCreateSandboxFolders } from './hooks/useDownloadStoriesPreviews/useCreateSandboxFolders';
import { useDownloadStoriesPreviews } from './hooks/useDownloadStoriesPreviews/useDownloadStoriesPreviews';

export const AppLogicProvider = ({ children }: ViewProps) => {
  const areFoldersCreated = useCreateSandboxFolders();
  useDownloadStoriesPreviews(areFoldersCreated);

  return children as JSX.Element;
};

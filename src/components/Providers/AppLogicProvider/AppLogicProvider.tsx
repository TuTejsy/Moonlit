import { ViewProps } from 'react-native';

import { useCreateSandboxFolders } from './hooks/useDownloadStoriesPreviews/useCreateSandboxFolders';
import { useDownloadStoriesPreviews } from './hooks/useDownloadStoriesPreviews/useDownloadStoriesPreviews';
import { useLogAppLaunch } from './hooks/useLogAppLaunch';

export const AppLogicProvider = ({ children }: ViewProps) => {
  const areFoldersCreated = useCreateSandboxFolders();
  useDownloadStoriesPreviews(areFoldersCreated);
  useLogAppLaunch();

  return children as JSX.Element;
};

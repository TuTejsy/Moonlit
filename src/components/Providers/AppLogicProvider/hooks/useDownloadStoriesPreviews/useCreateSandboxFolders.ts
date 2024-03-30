import { useCallback, useEffect, useState } from 'react';

import RNFS from 'react-native-fs';

import { IS_ANDROID, IS_IOS, SANDBOX } from '@/constants/common';

export const useCreateSandboxFolders = () => {
  const [areFoldersCreated, setAreFoldersCreated] = useState(IS_IOS);

  const createSandboxFoldersIfNotExist = useCallback(async () => {
    const folders = Object.values(SANDBOX.DOCUMENTS);
    const tasks: Array<Promise<void>> = [];

    folders.forEach((folderPath) => {
      const task = (async () => {
        if (!(await RNFS.exists(folderPath))) {
          await RNFS.mkdir(folderPath);
        }
      })();

      tasks.push(task);
    });

    await Promise.all(tasks);

    setAreFoldersCreated(true);
  }, []);

  useEffect(() => {
    if (IS_ANDROID) {
      createSandboxFoldersIfNotExist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return areFoldersCreated;
};

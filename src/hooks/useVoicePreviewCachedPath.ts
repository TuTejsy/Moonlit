import { useEffect, useMemo, useState } from 'react';

import RNFS from 'react-native-fs';

import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { getPresignedFileURL } from '@/utils/urls/getPresignedFileURL';
import { getVoicePreviewPathForCoverURL } from '@/utils/urls/getVoicePreviewPathForCoverURL';

export const useVoicePreviewCachedPath = (voiceCoverUrl: string | undefined) => {
  const [isFileDownloaded, setIsFileDownloaded] = useState(true);

  const voicePreviewCachedPath = useMemo(
    () => voiceCoverUrl && getVoicePreviewPathForCoverURL(voiceCoverUrl),
    [voiceCoverUrl],
  );

  const absoluteCoverPath = useMemo(
    () => voiceCoverUrl && formatServerFileURLToAbsolutePath(voiceCoverUrl),
    [voiceCoverUrl],
  );

  const cachedURL = useMemo(
    () => (isFileDownloaded ? `file://${voicePreviewCachedPath}` : absoluteCoverPath),
    [absoluteCoverPath, isFileDownloaded, voicePreviewCachedPath],
  );

  useEffect(() => {
    if (!voicePreviewCachedPath || !absoluteCoverPath) {
      return;
    }

    RNFS.exists(voicePreviewCachedPath).then((isFileExist) => {
      if (!isFileExist) {
        setIsFileDownloaded(false);

        getPresignedFileURL(absoluteCoverPath).then((url) => {
          RNFS.downloadFile({
            fromUrl: url,
            toFile: voicePreviewCachedPath,
          }).promise.then(({ statusCode }) => {
            if (statusCode === 200) {
              setIsFileDownloaded(true);
            }
          });
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voicePreviewCachedPath, absoluteCoverPath]);

  return cachedURL;
};

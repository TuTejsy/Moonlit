import { SANDBOX } from '@/constants/common';

export const getVoicePreviewPathForCoverURL = (coverURL: string) => {
  const lastPathComponent = coverURL
    .split('/')
    .filter((component) => !!component)
    .at(-1)
    ?.toLowerCase();

  return `${SANDBOX.DOCUMENTS.VOICE_PREVIEW}/${lastPathComponent}`;
};

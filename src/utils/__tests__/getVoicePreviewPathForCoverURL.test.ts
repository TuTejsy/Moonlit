import { SANDBOX } from '@/constants/common';

import { getVoicePreviewPathForCoverURL } from '../urls/getVoicePreviewPathForCoverURL';

jest.mock('@/constants/common', () => ({
  SANDBOX: {
    DOCUMENTS: {
      VOICE_PREVIEW: '/mock/documents/voice_preview',
    },
  },
}));

describe('getVoicePreviewPathForCoverURL', () => {
  it('extracts the last path component and builds the voice preview path', () => {
    const coverURL = 'https://example.com/voices/CoverImage.PNG';
    const result = getVoicePreviewPathForCoverURL(coverURL);

    expect(result).toBe(`${SANDBOX.DOCUMENTS.VOICE_PREVIEW}/coverimage.png`);
  });

  it('handles a URL with trailing slashes', () => {
    const coverURL = 'https://example.com/voices/cover.jpg/';
    const result = getVoicePreviewPathForCoverURL(coverURL);

    expect(result).toBe(`${SANDBOX.DOCUMENTS.VOICE_PREVIEW}/cover.jpg`);
  });

  it('lowercases the last path component', () => {
    const coverURL = 'https://example.com/MyVoice.MP3';
    const result = getVoicePreviewPathForCoverURL(coverURL);

    expect(result).toBe(`${SANDBOX.DOCUMENTS.VOICE_PREVIEW}/myvoice.mp3`);
  });

  it('handles a simple filename', () => {
    const coverURL = 'voice.wav';
    const result = getVoicePreviewPathForCoverURL(coverURL);

    expect(result).toBe(`${SANDBOX.DOCUMENTS.VOICE_PREVIEW}/voice.wav`);
  });
});

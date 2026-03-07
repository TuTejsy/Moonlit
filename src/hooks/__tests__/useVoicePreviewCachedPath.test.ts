import { act, renderHook } from '@testing-library/react-native';
import RNFS from 'react-native-fs';

import { useVoicePreviewCachedPath } from '../useVoicePreviewCachedPath';

jest.unmock('@/hooks/useVoicePreviewCachedPath');

jest.mock('@/utils/formatters/formatServerFileURLToAbsolutePath', () => ({
  formatServerFileURLToAbsolutePath: jest.fn((url: string) => `absolute_${url}`),
}));

jest.mock('@/utils/urls/getVoicePreviewPathForCoverURL', () => ({
  getVoicePreviewPathForCoverURL: jest.fn((url: string) => `cached_${url}`),
}));

describe('useVoicePreviewCachedPath', () => {
  beforeEach(() => {
    (RNFS.exists as jest.Mock).mockClear();
    (RNFS.downloadFile as jest.Mock).mockClear();
  });

  it('runs without errors for undefined cover url', () => {
    const { result } = renderHook(() => useVoicePreviewCachedPath(undefined));

    expect(result.current).toBe('file://undefined');
    expect(RNFS.exists).not.toHaveBeenCalled();
    expect(RNFS.downloadFile).not.toHaveBeenCalled();
  });

  it('returns cached URL directly if file is already downloaded (or initial state)', async () => {
    (RNFS.exists as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useVoicePreviewCachedPath('test.png'));

    // Initially isFileDownloaded is true, so it returns file://cached_test.png
    expect(result.current).toBe('file://cached_test.png');

    await act(async () => {
      // wait for promises
      await new Promise(setImmediate);
    });

    expect(RNFS.exists).toHaveBeenCalledWith('cached_test.png');
    // because it exists, downloadFile should not be called
    expect(RNFS.downloadFile).not.toHaveBeenCalled();
    // URL remains cached
    expect(result.current).toBe('file://cached_test.png');
  });

  it('downloads file if it does not exist, and updates URL', async () => {
    (RNFS.exists as jest.Mock).mockResolvedValue(false);

    let resolveDownload: (value: { statusCode: number }) => void;
    const downloadPromise = new Promise<{ statusCode: number }>((resolve) => {
      resolveDownload = resolve;
    });

    (RNFS.downloadFile as jest.Mock).mockReturnValue({
      promise: downloadPromise,
    });

    const { result } = renderHook(() => useVoicePreviewCachedPath('test.png'));

    // Initial state returns cached URL, but effect quickly changes it
    await act(async () => {
      // wait for RNFS.exists promise
      await new Promise(setImmediate);
    });

    // isFileDownloaded set to false -> absolute path
    expect(result.current).toBe('absolute_test.png');
    expect(RNFS.downloadFile).toHaveBeenCalledWith({
      fromUrl: 'absolute_test.png',
      toFile: 'cached_test.png',
    });

    await act(async () => {
      // resolve download
      resolveDownload?.({ statusCode: 200 });
      await new Promise(setImmediate);
    });

    // isFileDownloaded set back to true -> cached URL
    expect(result.current).toBe('file://cached_test.png');
  });

  it('stays on absolute path if download fails', async () => {
    (RNFS.exists as jest.Mock).mockResolvedValue(false);
    (RNFS.downloadFile as jest.Mock).mockReturnValue({
      promise: Promise.resolve({ statusCode: 404 }), // not 200
    });

    const { result } = renderHook(() => useVoicePreviewCachedPath('test.png'));

    await act(async () => {
      await new Promise(setImmediate);
      await new Promise(setImmediate);
    });

    // After failing download, it stays on absolute path
    expect(result.current).toBe('absolute_test.png');
  });
});

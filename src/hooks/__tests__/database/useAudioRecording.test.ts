import { act, renderHook } from '@testing-library/react-native';

import { AudioRecordingsDB } from '@/database';
import { useAudioRecording } from '@/hooks/database/useAudioRecording';

jest.unmock('@/hooks/database/useAudioRecording');

jest.mock('@/database', () => ({
  AudioRecordingsDB: {
    object: jest.fn(),
    performAfterTransactionComplete: jest.fn((cb) => cb()),
  },
}));

jest.mock('@/utils/realm/cloneRealmObject', () => ({
  cloneRealmObject: jest.fn((obj) => ({ ...obj, cloned: true })),
}));

describe('useAudioRecording', () => {
  let addListenerMock: jest.Mock;
  let removeListenerMock: jest.Mock;
  let mockRecordingNode: any;

  beforeEach(() => {
    jest.clearAllMocks();

    addListenerMock = jest.fn();
    removeListenerMock = jest.fn();

    mockRecordingNode = {
      addListener: addListenerMock,
      id: 1,
      removeListener: removeListenerMock,
      title: 'Test Audio',
    };

    (AudioRecordingsDB.object as jest.Mock).mockReturnValue(mockRecordingNode);
  });

  it('initializes with the cloned audio recording object and version 1 if recording exists', () => {
    const { result } = renderHook(() => useAudioRecording(1));

    expect(AudioRecordingsDB.object).toHaveBeenCalledWith(1);
    expect(result.current[0]).toEqual({ ...mockRecordingNode, cloned: true });
    expect(result.current[1]).toBe(1);
  });

  it('returns null if audio recording id is undefined', () => {
    const { result } = renderHook(() => useAudioRecording(undefined));

    expect(result.current[0]).toBeNull();
    // Default initial version
    expect(result.current[1]).toBe(0);
  });

  it('returns null if audio recording does not exist', () => {
    (AudioRecordingsDB.object as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useAudioRecording(1));

    expect(result.current[0]).toBeNull();
    expect(result.current[1]).toBe(0);
  });

  it('sets up a listener and updates state when properties change', () => {
    const { result } = renderHook(() => useAudioRecording(1, ['title']));

    expect(addListenerMock).toHaveBeenCalledWith(expect.any(Function), ['title']);

    const listener = addListenerMock.mock.calls[0][0];

    const updatedRecording = { ...mockRecordingNode, title: 'Updated title' };

    act(() => {
      listener(updatedRecording, { changedProperties: ['title'], deleted: false });
    });

    expect(result.current[0]).toEqual(updatedRecording);
    expect(result.current[1]).toBe(2);
  });

  it('sets state to null when deleted property is true', () => {
    const { result } = renderHook(() => useAudioRecording(1));

    const listener = addListenerMock.mock.calls[0][0];

    act(() => {
      listener(mockRecordingNode, { changedProperties: [], deleted: true });
    });

    expect(result.current[0]).toBeNull();
    // version increases by 2 because changedProperties logic also runs before deleted logic,
    // but in realistic realm changedProperties is empty if deleted, so just +1 for deleted.
    expect(result.current[1]).toBe(2);
  });

  it('removes listener on unmount', () => {
    const { unmount } = renderHook(() => useAudioRecording(1));

    unmount();

    const listener = addListenerMock.mock.calls[0][0];
    expect(removeListenerMock).toHaveBeenCalledWith(listener);
  });
});

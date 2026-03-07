import { act, renderHook } from '@testing-library/react-native';

import { AudioRecordingsDB, StoriesDB } from '@/database';
import { useAudioRecordings } from '@/hooks/database/useAudioRecordings';
import { useSelectedAudioRecording } from '@/hooks/database/useSelectedAudioRecording';
import { useStory } from '@/hooks/database/useStory';

jest.unmock('@/hooks/database/useSelectedAudioRecording');

jest.mock('@/hooks/database/useStory', () => ({
  useStory: jest.fn(),
}));

jest.mock('@/hooks/database/useAudioRecordings', () => ({
  useAudioRecordings: jest.fn(),
}));

jest.mock('@/database', () => ({
  AudioRecordingsDB: {
    object: jest.fn(),
  },
  StoriesDB: {
    modify: jest.fn((cb) => cb()),
  },
}));

jest.mock('@/utils/realm/cloneRealmObject', () => ({
  cloneRealmObject: jest.fn((obj) => ({ ...obj, cloned: true })),
}));

describe('useSelectedAudioRecording', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the selected audio recording based on story selected_audio_recording_id', () => {
    const mockStory = { selected_audio_recording_id: 42 };
    (useStory as jest.Mock).mockReturnValue([mockStory, 1]);
    (useAudioRecordings as jest.Mock).mockReturnValue([[], 1]);

    const mockRecordingFromDb = { id: 42, title: 'Selected' };
    (AudioRecordingsDB.object as jest.Mock).mockReturnValue(mockRecordingFromDb);

    const { result } = renderHook(() => useSelectedAudioRecording(1));

    expect(AudioRecordingsDB.object).toHaveBeenCalledWith(42);
    expect(result.current.selectedAudioRecording).toEqual({ ...mockRecordingFromDb, cloned: true });
    expect(result.current.selectedAudioRecordingVersion).toBe(1);
  });

  it('falls back to the first recording from the list if story has no selected_audio_recording_id', () => {
    const mockStory = {}; // No selection
    (useStory as jest.Mock).mockReturnValue([mockStory, 1]);

    const mockRecordingsList = [{ id: 100, title: 'Fallback' }];
    (useAudioRecordings as jest.Mock).mockReturnValue([mockRecordingsList, 1]);

    const { result } = renderHook(() => useSelectedAudioRecording(1));

    expect(AudioRecordingsDB.object).not.toHaveBeenCalled();
    expect(result.current.selectedAudioRecording).toEqual({
      cloned: true,
      id: 100,
      title: 'Fallback',
    });
  });

  it('falls back to the first recording if selected recording is not found in DB', () => {
    const mockStory = { selected_audio_recording_id: 999 };
    (useStory as jest.Mock).mockReturnValue([mockStory, 1]);

    const mockRecordingsList = [{ id: 100, title: 'Fallback' }];
    (useAudioRecordings as jest.Mock).mockReturnValue([mockRecordingsList, 1]);

    (AudioRecordingsDB.object as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useSelectedAudioRecording(1));

    expect(result.current.selectedAudioRecording).toEqual({
      cloned: true,
      id: 100,
      title: 'Fallback',
    });
  });

  it('setSelectedAudioRecording modifies the story selection', () => {
    const mockStory = { selected_audio_recording_id: 10 };
    (useStory as jest.Mock).mockReturnValue([mockStory, 1]);
    (useAudioRecordings as jest.Mock).mockReturnValue([[], 1]);

    const { result } = renderHook(() => useSelectedAudioRecording(1));

    act(() => {
      result.current.setSelectedAudioRecording(20);
    });

    expect(StoriesDB.modify).toHaveBeenCalled();
    expect(mockStory.selected_audio_recording_id).toBe(20);
  });
});

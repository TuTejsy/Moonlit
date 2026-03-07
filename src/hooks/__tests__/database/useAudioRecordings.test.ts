import { act, renderHook } from '@testing-library/react-native';

import { AudioRecordingsDB } from '@/database';
import { useAudioRecordings } from '@/hooks/database/useAudioRecordings';

jest.unmock('@/hooks/database/useAudioRecordings');

jest.mock('@/database', () => ({
  AudioRecordingsDB: {
    objects: jest.fn(),
    performAfterTransactionComplete: jest.fn((cb) => cb()),
  },
}));

describe('useAudioRecordings', () => {
  let addListenerMock: jest.Mock;
  let removeListenerMock: jest.Mock;
  let mockFilteredResult: any;
  let mockSortedResult: any;
  let mockObjectsResult: any;

  beforeEach(() => {
    jest.clearAllMocks();

    addListenerMock = jest.fn();
    removeListenerMock = jest.fn();

    mockSortedResult = {
      addListener: addListenerMock,
      removeListener: removeListenerMock,
    };

    mockFilteredResult = {
      sorted: jest.fn().mockReturnValue(mockSortedResult),
    };

    mockObjectsResult = {
      filtered: jest.fn().mockReturnValue(mockFilteredResult),
      sorted: jest.fn().mockReturnValue(mockSortedResult),
    };

    (AudioRecordingsDB.objects as jest.Mock).mockReturnValue(mockObjectsResult);
  });

  it('returns recordings with default sort config when no filter or sortConfig provided', () => {
    const { result } = renderHook(() => useAudioRecordings());

    expect(AudioRecordingsDB.objects).toHaveBeenCalled();
    expect(mockObjectsResult.filtered).not.toHaveBeenCalled();

    expect(mockObjectsResult.sorted).toHaveBeenCalledWith([
      ['is_free', true],
      ['voice_id', false],
    ]);

    expect(result.current[0]).toBe(mockSortedResult);
  });

  it('applies provided filter correctly', () => {
    renderHook(() => useAudioRecordings('story_id = 1'));

    expect(mockObjectsResult.filtered).toHaveBeenCalledWith('story_id = 1');
    expect(mockFilteredResult.sorted).toHaveBeenCalled();
  });

  it('applies provided sort config correctly', () => {
    renderHook(() => useAudioRecordings(undefined, { reverse: false, sortDescriptor: 'duration' }));

    expect(mockObjectsResult.sorted).toHaveBeenCalledWith([
      ['duration', false],
      ['voice_id', false],
    ]);
  });

  it('sets up a listener and updates recordings version on collection change', () => {
    const { result } = renderHook(() => useAudioRecordings());

    expect(addListenerMock).toHaveBeenCalledWith(expect.any(Function));

    const listener = addListenerMock.mock.calls[0][0];

    act(() => {
      listener('nextCollection');
    });

    expect(result.current[1]).toBe(1);
  });

  it('removes listener on unmount', () => {
    const { unmount } = renderHook(() => useAudioRecordings());

    unmount();

    const listener = addListenerMock.mock.calls[0][0];
    expect(removeListenerMock).toHaveBeenCalledWith(listener);
  });
});

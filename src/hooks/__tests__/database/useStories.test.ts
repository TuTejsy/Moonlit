import { act, renderHook } from '@testing-library/react-native';

import { StoriesDB } from '@/database';
import { useStories } from '@/hooks/database/useStories';

jest.unmock('@/hooks/database/useStories');

jest.mock('@/database', () => ({
  StoriesDB: {
    objects: jest.fn(),
    performAfterTransactionComplete: jest.fn((cb) => cb()),
  },
}));

describe('useStories', () => {
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
      slice: jest.fn(() => ['sliced-story-1']),
    };

    mockFilteredResult = {
      sorted: jest.fn().mockReturnValue(mockSortedResult),
    };

    mockObjectsResult = {
      filtered: jest.fn().mockReturnValue(mockFilteredResult),
      sorted: jest.fn().mockReturnValue(mockSortedResult),
    };

    (StoriesDB.objects as jest.Mock).mockReturnValue(mockObjectsResult);
  });

  it('returns stories with default sort config when no filter or sortConfigs provided', async () => {
    const { result } = await renderHook(() => useStories());

    expect(StoriesDB.objects).toHaveBeenCalled();
    expect(mockObjectsResult.filtered).not.toHaveBeenCalled();

    // Check default sort config
    expect(mockObjectsResult.sorted).toHaveBeenCalledWith([
      ['is_coming_soon', false],
      ['updated_at_timestamp', true],
    ]);

    expect(result.current[0]).toBe(mockSortedResult);
    expect(result.current[1]).toBe(0);
  });

  it('applies provided filter correctly', async () => {
    await renderHook(() => useStories('is_free = true'));

    expect(mockObjectsResult.filtered).toHaveBeenCalledWith('is_free = true');
    expect(mockFilteredResult.sorted).toHaveBeenCalled();
  });

  it('applies provided sort configs correctly', async () => {
    const customSortConfig = [{ reverse: true, sortDescriptor: 'id' as any }];

    await renderHook(() => useStories(undefined, customSortConfig));

    expect(mockObjectsResult.sorted).toHaveBeenCalledWith([['id', true]]);
  });

  it('returns sliced results when maxNum is provided', async () => {
    const { result } = await renderHook(() => useStories(undefined, undefined, 5));

    expect(mockSortedResult.slice).toHaveBeenCalledWith(0, 5);
    // Since mock result `.slice` returns ['sliced-story-1']
    expect(result.current[0]).toEqual(['sliced-story-1']);
  });

  it('sets up a Realm listener and updates stories version on collection change', async () => {
    const { result } = await renderHook(() => useStories());

    expect(addListenerMock).toHaveBeenCalledWith(expect.any(Function));

    const listener = addListenerMock.mock.calls[0][0];

    await act(() => {
      listener('nextCollection');
    });

    expect(result.current[1]).toBe(1);

    await act(() => {
      listener('anotherCollection');
    });

    expect(result.current[1]).toBe(2);
  });

  it('removes listener on unmount', async () => {
    const { unmount } = await renderHook(() => useStories());

    await unmount();

    const listener = addListenerMock.mock.calls[0][0];
    expect(removeListenerMock).toHaveBeenCalledWith(listener);
  });
});

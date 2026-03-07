import { act, renderHook } from '@testing-library/react-native';

import { StoriesDB } from '@/database';
import { useStory } from '@/hooks/database/useStory';

jest.unmock('@/hooks/database/useStory');

jest.mock('@/database', () => ({
  StoriesDB: {
    object: jest.fn(),
    performAfterTransactionComplete: jest.fn((cb) => cb()),
  },
}));

describe('useStory', () => {
  let addListenerMock: jest.Mock;
  let removeListenerMock: jest.Mock;
  let mockStoryNode: any;

  beforeEach(() => {
    jest.clearAllMocks();

    addListenerMock = jest.fn();
    removeListenerMock = jest.fn();

    mockStoryNode = {
      addListener: addListenerMock,
      id: 1,
      name: 'Test Story',
      removeListener: removeListenerMock,
    };

    (StoriesDB.object as jest.Mock).mockReturnValue(mockStoryNode);
  });

  it('initializes with the story object and version 1 string if story exists', () => {
    const { result } = renderHook(() => useStory(1));

    expect(StoriesDB.object).toHaveBeenCalledWith(1);
    expect(result.current[0]).toBe(mockStoryNode);
    // initial hook render executes setStoryVersion in exact same cycle,
    // so it might actually be >0 depending on strict mode. But with the effect it is at least initialized.
    expect(result.current[1]).toBe(1);
  });

  it('returns null if story does not exist', () => {
    (StoriesDB.object as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useStory(1));

    expect(result.current[0]).toBeNull();
    // effect won't run listener setup since story is null
    expect(result.current[1]).toBe(0);
  });

  it('sets up a Realm listener and updates story version on change', () => {
    const { result } = renderHook(() => useStory(1, ['name']));

    expect(addListenerMock).toHaveBeenCalledWith(expect.any(Function), ['name']);

    const listener = addListenerMock.mock.calls[0][0];

    const updatedStoryNode = { ...mockStoryNode, name: 'Updated name' };

    act(() => {
      listener(updatedStoryNode, { changedProperties: ['name'] });
    });

    expect(result.current[0]).toEqual(updatedStoryNode);
    expect(result.current[1]).toBe(2);
  });

  it('ignores listener call if nothing changed', () => {
    const { result } = renderHook(() => useStory(1));

    const listener = addListenerMock.mock.calls[0][0];

    act(() => {
      listener(mockStoryNode, { changedProperties: [] });
    });

    // Version remains the same
    expect(result.current[1]).toBe(1);
  });

  it('removes listener on unmount', () => {
    const { unmount } = renderHook(() => useStory(1));

    unmount();

    const listener = addListenerMock.mock.calls[0][0];
    expect(removeListenerMock).toHaveBeenCalledWith(listener);
  });
});

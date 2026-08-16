import { DeviceEventEmitter } from 'react-native';

import { act, renderHook } from '@testing-library/react-native';

import { AudioRecordingsDB } from '@/database';
import { useAudioRecording } from '@/hooks/database/useAudioRecording';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useStoryPlayer } from '@/hooks/useStoryPlayer/useStoryPlayer';
import { audioPlayer } from '@/native_modules/MNTAudioPlayer/ts/NativeMNTAudioPlayerManager';
import { startPlaying, stopPlaying } from '@/store/player/player.slice';

jest.unmock('@/hooks/useStoryPlayer/useStoryPlayer');

jest.mock('@/store/player/player.slice', () => ({
  setPlayedTime: jest.fn(),
  setPlayerState: jest.fn(),
  startPlaying: jest.fn(),
  stopPlaying: jest.fn(),
}));

jest.mock('@/hooks/database/useAudioRecording', () => ({
  useAudioRecording: jest.fn(),
}));

jest.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/store/player/player.selector', () => ({
  selectIsPlaying: jest.fn(),
  selectSelectedAudioRecoringId: jest.fn(),
}));

jest.mock('@/native_modules/MNTAudioPlayer/ts/NativeMNTAudioPlayerManager', () => ({
  AUDIO_PLAYER_EMITTER_EVENT: {
    PLAYING_DID_FINISH: 'PLAYING_DID_FINISH',
    PLAYING_DID_INTERRUPT: 'PLAYING_DID_INTERRUPT',
    PLAYING_DID_PAUSE: 'PLAYING_DID_PAUSE',
    PLAYING_DID_START: 'PLAYING_DID_START',
  },
  audioPlayer: {
    addListener: jest.fn(),
    getCurrentState: jest.fn(),
    pausePlaying: jest.fn(),
    removeListeners: jest.fn(),
    rewindPlayingToTime: jest.fn(),
    setToPlayFile: jest.fn(),
    startPlayingFromTime: jest.fn(),
    stopPlaying: jest.fn(),
  },
}));

jest.mock('@/hooks/useStoryPlayer/utils/notifyStoryPlay', () => ({
  notifyStoryPlay: jest.fn(),
}));

jest.mock('@/database', () => ({
  AudioRecordingsDB: {
    object: jest.fn(),
    update: jest.fn(),
  },
}));

const mockDispatch = jest.fn();

describe('useStoryPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(false); // isPlaying = false, selectedAudioRecoringId = false by default

    (useAudioRecording as jest.Mock).mockReturnValue([
      { cached_name: 'test.mp3', duration: 100, id: 10, played_time: 0, story_id: 1 },
      1,
    ]);

    (audioPlayer.getCurrentState as jest.Mock).mockReturnValue({
      filePath: 'test.mp3',
      isPlaying: false,
      playingTime: 0,
    });
  });

  it('initializes correctly', async () => {
    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    expect(result.current.isStoryPlaying).toBe(false);
    expect(result.current.playedTime).toBe(0);
    expect(result.current.isCurrentStoryPlaying).toBe(false);
  });

  it('stops story playing correctly', async () => {
    (audioPlayer.getCurrentState as jest.Mock).mockReturnValue({ isPlaying: true });

    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    await act(() => {
      result.current.stopStoryPlaying();
    });

    expect(audioPlayer.stopPlaying).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(stopPlaying());
  });

  it('pauses story playing correctly', async () => {
    (audioPlayer.getCurrentState as jest.Mock).mockReturnValue({ isPlaying: true });
    (audioPlayer.pausePlaying as jest.Mock).mockReturnValue({ playingTime: 45 });

    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    await act(() => {
      result.current.pauseStoryPlaying();
    });

    expect(audioPlayer.pausePlaying).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(stopPlaying());
    expect(result.current.playedTime).toBe(45);
  });

  it('moves story playing to exact time', async () => {
    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    await act(() => {
      result.current.moveStoryPlayingToTime({ exactTime: 50 });
    });

    // since isCurrentStoryPlaying is false, it uses rewindPlayingToTime
    expect(audioPlayer.rewindPlayingToTime).toHaveBeenCalledWith(50);
    expect(result.current.playedTime).toBe(50);
  });

  it('moves story playing with a gap', async () => {
    (audioPlayer.getCurrentState as jest.Mock).mockReturnValue({
      isPlaying: true,
      playingTime: 20,
    });
    // Make isCurrentStoryPlaying true to test startPlayingFromTime branch
    (useAppSelector as jest.Mock).mockImplementation((selector: any) => {
      if (selector.name === 'selectIsPlaying') {
        return true;
      }
      if (selector.name === 'selectSelectedAudioRecoringId') {
        return 10;
      }
      return true;
    });

    (AudioRecordingsDB.object as jest.Mock).mockReturnValue({ story_id: 1 });

    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    // Initial played time 0, but isPlaying is true, so gap is added to playingTime (20) + gap (10) = 30
    await act(() => {
      result.current.moveStoryPlayingToTime({ moveGap: 10 });
    });

    expect(audioPlayer.startPlayingFromTime).toHaveBeenCalledWith(30);
    expect(mockDispatch).toHaveBeenCalledWith(startPlaying(10));
    expect(result.current.playedTime).toBe(30);
  });

  it('stops playing when the native player finishes', async () => {
    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    await act(() => {
      result.current.setPlayedTime(40);
    });

    await act(() => {
      DeviceEventEmitter.emit('PLAYING_DID_FINISH');
    });

    expect(mockDispatch).toHaveBeenCalledWith(stopPlaying());
    expect(result.current.playedTime).toBe(0);
  });

  it('pauses playing when the native player interrupts', async () => {
    const { result } = await renderHook(() =>
      useStoryPlayer({
        audioRecordingId: 10,
        coverPath: 'cover.jpg',
        storyId: 1,
        title: 'Story Title',
      }),
    );

    await act(() => {
      DeviceEventEmitter.emit('PLAYING_DID_INTERRUPT', { playingTime: 12 });
    });

    expect(mockDispatch).toHaveBeenCalledWith(stopPlaying());
    expect(result.current.playedTime).toBe(12);
  });
});

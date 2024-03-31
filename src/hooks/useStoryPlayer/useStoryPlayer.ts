import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, NativeEventEmitter } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { SANDBOX } from '@/constants/common';
import { AudioRecordingsDB } from '@/database';
import {
  AUDIO_PLAYER_EMITTER_EVENT,
  audioPlayer,
} from '@/native_modules/MNTAudioPlayer/NativeAudioPlayer';
import { selectIsPlaying, selectSelectedAudioRecoringId } from '@/store/player/player.selector';
import { startPlaying, stopPlaying } from '@/store/player/player.slice';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { generateAudioRecordingCachedName } from '@/utils/generators/generateAudioRecordingCachedName';

import { useAudioRecording } from '../database/useAudioRecording';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { useMutableValue } from '../useMutableValue';

import { MOVE_TO_PROPS, useStoryPlayerProps } from './useStoryPlayers.types';
import { notifyStoryPlay } from './utils/notifyStoryPlay';

export function useStoryPlayer({
  audioRecordingId,
  coverPath,
  storyId,
  title,
}: useStoryPlayerProps) {
  const eventEmmiterRef = useRef(new NativeEventEmitter(audioPlayer));
  const isStoryPlayNotifiedRef = useRef(false);
  const currentPlayCallPromise = useRef<Promise<void> | null>(null);

  const [selectedAudioRecording, selectedAudioRecordingVersion] = useAudioRecording(
    audioRecordingId,
    ['audio_url', 'cached_name', 'duration'],
  );

  const isStoryPlaying = useAppSelector(selectIsPlaying);
  const selectedAudioRecordingId = useAppSelector(selectSelectedAudioRecoringId);

  const [isLoading, setIsLoading] = useState(false);
  const [playedTime, setPlayedTime] = useState(selectedAudioRecording?.played_time ?? 0);

  const reduxDispatch = useAppDispatch();

  const isCurrentStoryPlaying = useMemo(() => {
    if (selectedAudioRecordingId) {
      const audioRecording = AudioRecordingsDB.object(selectedAudioRecordingId);

      if (audioRecording && audioRecording.story_id === selectedAudioRecording?.story_id) {
        return isStoryPlaying;
      }
    }

    return false;
  }, [isStoryPlaying, selectedAudioRecording?.story_id, selectedAudioRecordingId]);

  const audioRecordingIdRef = useMutableValue(audioRecordingId);
  const isCurrentStoryPlayingMutableValue = useMutableValue(isCurrentStoryPlaying);
  const selectedAudioRecordingIdMutableValue = useMutableValue(selectedAudioRecordingId);
  const selectedAudioRecordingCachedNameMutableValue = useMutableValue(
    selectedAudioRecording?.cached_name,
  );

  const storyPlayingSharedValue = useSharedValue(isCurrentStoryPlaying ? 1 : 0);
  const isStoryPlayingSharedValue = useDerivedValue(() => storyPlayingSharedValue.value > 0);

  const stopStoryPlaying = useCallback(() => {
    if (!audioPlayer) {
      return;
    }

    const { isPlaying } = audioPlayer.getCurrentState();

    if (isPlaying) {
      audioPlayer.stopPlaying();
      reduxDispatch(stopPlaying());
    }
  }, [reduxDispatch]);

  const pauseStoryPlaying = useCallback(() => {
    if (!audioPlayer) {
      return;
    }

    const { isPlaying } = audioPlayer.getCurrentState();

    if (isPlaying) {
      const { playingTime } = audioPlayer.pausePlaying();
      reduxDispatch(stopPlaying());

      if (playingTime) {
        setPlayedTime(playingTime);
      }
    }
  }, [reduxDispatch]);

  const downloadAudioRecording = useCallback(async () => {
    let selectedAudioRecordingCachedName = selectedAudioRecording?.cached_name;

    if (selectedAudioRecording && !selectedAudioRecording.cached_name) {
      selectedAudioRecordingCachedName = generateAudioRecordingCachedName(selectedAudioRecording);

      if (!selectedAudioRecordingCachedName) {
        throw new Error('selectedAudioRecordingCachedName is null');
      }

      const filePath = `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedName}`;

      try {
        const isFileExist = await RNFS.exists(filePath);

        if (!isFileExist) {
          setIsLoading(true);

          await RNFS.downloadFile({
            fromUrl: formatServerFileURLToAbsolutePath(selectedAudioRecording.audio_url),
            toFile: filePath,
          }).promise;
        }

        await AudioRecordingsDB.update([selectedAudioRecording.id], (recording) => {
          recording.cached_name = selectedAudioRecordingCachedName;
        });
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    return `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedName}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAudioRecording?.id, selectedAudioRecording?.cached_name]);

  const downloadAndPlayStory = useCallback(
    async (storySelectedAudioRecordingId: number) => {
      if (!audioPlayer) {
        return;
      }

      if (
        audioRecordingIdRef.current &&
        audioRecordingIdRef.current !== storySelectedAudioRecordingId
      ) {
        return;
      }

      try {
        reduxDispatch(startPlaying(storySelectedAudioRecordingId));

        const filePath = await downloadAudioRecording();

        if (storySelectedAudioRecordingId !== audioRecordingIdRef.current) {
          pauseStoryPlaying();
          return;
        }

        let timeToStart = playedTime;

        if (selectedAudioRecording?.duration && timeToStart >= selectedAudioRecording?.duration) {
          timeToStart = 0;
          setPlayedTime(0);
        }

        audioPlayer.setToPlayFile({ coverPath, filePath, fileTitle: title });
        audioPlayer.startPlayingFromTime(timeToStart);

        if (!isStoryPlayNotifiedRef.current) {
          isStoryPlayNotifiedRef.current = true;
          notifyStoryPlay(storyId);
        }
      } catch (err) {
        reduxDispatch(stopPlaying());
        console.error(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      reduxDispatch,
      downloadAudioRecording,
      playedTime,
      selectedAudioRecording?.duration,
      coverPath,
      title,
      pauseStoryPlaying,
      storyId,
    ],
  );

  const startStoryPlaying = useCallback(() => {
    const storySelectedAudioRecordingId = selectedAudioRecording?.id;

    const updatePromise = () => {
      if (storySelectedAudioRecordingId) {
        currentPlayCallPromise.current = downloadAndPlayStory(
          storySelectedAudioRecordingId,
        ).finally(() => {
          currentPlayCallPromise.current = null;
        });
      }
    };

    if (currentPlayCallPromise.current) {
      currentPlayCallPromise.current.then(() => {
        pauseStoryPlaying();
        updatePromise();
      });
    } else {
      updatePromise();
    }
  }, [downloadAndPlayStory, selectedAudioRecording?.id, pauseStoryPlaying]);

  const moveStoryPlayingToTime = useCallback(
    ({ exactTime, moveGap }: MOVE_TO_PROPS) => {
      if (!selectedAudioRecording) {
        return;
      }

      try {
        let playedTimeToSet = playedTime;

        if (audioPlayer) {
          const { isPlaying, playingTime } = audioPlayer.getCurrentState();

          if (moveGap !== undefined) {
            playedTimeToSet = (isPlaying ? playingTime : playedTime) + moveGap;
          } else if (exactTime !== undefined) {
            playedTimeToSet = exactTime;
          }

          if (playedTimeToSet < 0) {
            playedTimeToSet = 0;

            if (playedTime === 0) {
              stopStoryPlaying();
              setPlayedTime(0);
              return;
            }
          } else if (playedTimeToSet >= selectedAudioRecording.duration) {
            stopStoryPlaying();
            setPlayedTime(0);
            return;
          }
        }

        if (isCurrentStoryPlayingMutableValue.current) {
          audioPlayer?.startPlayingFromTime(playedTimeToSet);
          reduxDispatch(startPlaying(selectedAudioRecording?.id));
        }

        setPlayedTime(playedTimeToSet);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAudioRecording, playedTime, stopStoryPlaying],
  );

  useEffect(() => {
    const audioPlayerDidFinishPlayingSubscriptionRef = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_FINISH,
      () => {
        reduxDispatch(stopPlaying());
        setPlayedTime(0);
      },
    );

    const audioPlayerDidInterruptPlayingSubscriptionRef = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_INTERRUPT,
      ({ playingTime }) => {
        reduxDispatch(stopPlaying());
        setPlayedTime(playingTime);
      },
    );

    const audioPlayerDidPausePlayingSubscriptionRef = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_PAUSE,
      ({ playingTime }) => {
        reduxDispatch(stopPlaying());
        setPlayedTime(playingTime);
      },
    );

    const audioPlayerDidStartPlayingSubscriptionRef = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_START,
      ({ playingTime }) => {
        if (selectedAudioRecordingIdMutableValue.current) {
          reduxDispatch(startPlaying(selectedAudioRecordingIdMutableValue.current));
          setPlayedTime(playingTime);
        }
      },
    );

    return () => {
      audioPlayerDidFinishPlayingSubscriptionRef.remove();
      audioPlayerDidInterruptPlayingSubscriptionRef.remove();
      audioPlayerDidStartPlayingSubscriptionRef.remove();
      audioPlayerDidPausePlayingSubscriptionRef.remove();
    };
  }, [reduxDispatch, selectedAudioRecordingIdMutableValue]);

  useEffect(() => {
    if (audioRecordingId) {
      AudioRecordingsDB.update([audioRecordingId], (recording) => {
        recording.played_time = playedTime;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedTime, audioRecordingId]);

  useFocusEffect(
    useCallback(
      () => {
        if (!audioPlayer) {
          return;
        }

        const { filePath, isPlaying, playingTime } = audioPlayer.getCurrentState();

        if (
          filePath !==
          `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedNameMutableValue.current}`
        ) {
          return;
        }

        setPlayedTime(playingTime);

        if (isPlaying && !isCurrentStoryPlayingMutableValue.current) {
          if (selectedAudioRecordingIdMutableValue.current) {
            reduxDispatch(startPlaying(selectedAudioRecordingIdMutableValue.current));
          }
        } else if (
          !isPlaying &&
          isCurrentStoryPlayingMutableValue.current &&
          !currentPlayCallPromise.current
        ) {
          reduxDispatch(stopPlaying());
        }

        return () => {
          if (!audioPlayer) {
            return;
          }

          const { filePath, isPlaying, playingTime } = audioPlayer.getCurrentState();
          if (
            filePath !==
            `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedNameMutableValue.current}`
          ) {
            return;
          }

          if (isPlaying && !isCurrentStoryPlayingMutableValue.current) {
            if (selectedAudioRecordingIdMutableValue.current) {
              reduxDispatch(startPlaying(selectedAudioRecordingIdMutableValue.current));
            }
          } else if (
            !isPlaying &&
            isCurrentStoryPlayingMutableValue.current &&
            !currentPlayCallPromise.current
          ) {
            reduxDispatch(stopPlaying());
          }

          if (selectedAudioRecordingIdMutableValue.current) {
            AudioRecordingsDB.update(
              [selectedAudioRecordingIdMutableValue.current],
              (recording) => {
                recording.played_time = playingTime;
              },
            );
          }
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  );

  useEffect(
    () => {
      const appActiveListener = AppState.addEventListener('change', (state) => {
        if (state === 'active' && audioPlayer) {
          const { filePath, isPlaying, playingTime } = audioPlayer.getCurrentState();

          if (
            filePath !==
            `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedNameMutableValue.current}`
          ) {
            return;
          }

          setPlayedTime(playingTime);

          if (isPlaying) {
            if (selectedAudioRecording?.id) {
              reduxDispatch(startPlaying(selectedAudioRecording?.id));
            }
          } else if (!currentPlayCallPromise.current) {
            reduxDispatch(stopPlaying());
          }

          if (selectedAudioRecording?.id) {
            AudioRecordingsDB.update([selectedAudioRecording.id], (recording) => {
              recording.played_time = playingTime;
            });
          }
        }
      });

      return () => {
        appActiveListener.remove();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAudioRecording?.id],
  );

  return {
    downloadAudioRecording,
    isCurrentStoryPlaying,
    isStoryLoading: isLoading,
    isStoryPlaying,
    isStoryPlayingSharedValue,
    moveStoryPlayingToTime,
    pauseStoryPlaying,
    playedTime,
    setPlayedTime,
    startStoryPlaying,
    stopStoryPlaying,
    storyPlayingSharedValue,
  };
}

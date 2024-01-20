import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, EmitterSubscription, NativeEventEmitter } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { SANDBOX } from '@/constants/common';
import { AudioRecordingsDB } from '@/database';
import { audioPlayer } from '@/native-modules/native-modules';
import { AUDIO_PLAYER_EMITTER_EVENT } from '@/native-modules/native-modules.types';
import { selectIsPlaying, selectSelectedAudioRecoringId } from '@/store/player/player.selector';
import { startPlaying, stopPlaying } from '@/store/player/player.slice';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { generateAudioRecordingCachedName } from '@/utils/generators/generateAudioRecordingCachedName';

import { useAudioRecording } from '../database/useAudioRecording';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

import { notifyStoryPlay } from './utils/notifyStoryPlay';

interface useStoryPlayerProps {
  coverPath: string;
  storyId: number;
  title: string;
  audioRecordingId?: number;
}

export function useStoryPlayer({
  audioRecordingId,
  coverPath,
  storyId,
  title,
}: useStoryPlayerProps) {
  const eventEmmiterRef = useRef(new NativeEventEmitter(audioPlayer));
  const audioPlayerDidFinishPlayingSubscriptionRef = useRef<EmitterSubscription | null>(null);
  const audioPlayerDidInterruptPlayingSubscriptionRef = useRef<EmitterSubscription | null>(null);
  const isStoryPlayNotifiedRef = useRef(false);

  const [selectedAudioRecording, selectedAudioRecordingVersion] = useAudioRecording(
    audioRecordingId,
    ['audio_url', 'cached_name', 'duration'],
  );

  const isStoryPlaying = useAppSelector(selectIsPlaying);
  const selectedAudioRecordingId = useAppSelector(selectSelectedAudioRecoringId);

  const reduxDispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [playedTime, setPlayedTime] = useState(selectedAudioRecording?.played_time ?? 0);

  const isCurrentStoryPlaying = useMemo(() => {
    if (selectedAudioRecordingId) {
      const audioRecording = AudioRecordingsDB.object(selectedAudioRecordingId);

      if (audioRecording && audioRecording.story_id === selectedAudioRecording?.story_id) {
        return isStoryPlaying;
      }
    }

    return false;
  }, [isStoryPlaying, selectedAudioRecording?.story_id, selectedAudioRecordingId]);

  const storyPlayingSharedValue = useSharedValue(isCurrentStoryPlaying ? 1 : 0);
  const isStoryPlayingSharedValue = useDerivedValue(() => storyPlayingSharedValue.value > 0);

  const stopStoryPlaying = useCallback(async () => {
    try {
      await audioPlayer.stopPlaying();

      reduxDispatch(stopPlaying());
    } catch (err) {
      console.error(err);
    }
  }, [reduxDispatch]);

  const pauseStoryPlaying = useCallback(async () => {
    try {
      const { playingTime } = await audioPlayer.pausePlaying();

      reduxDispatch(stopPlaying());

      if (playingTime) {
        setPlayedTime(playingTime);
      }
    } catch (err) {
      console.error(err);
    }
  }, [reduxDispatch, setPlayedTime]);

  const downloadAudioRecording = useCallback(async () => {
    if (selectedAudioRecording && !selectedAudioRecording.cached_name) {
      setIsLoading(true);

      const selectedAudioRecordingCachedName =
        generateAudioRecordingCachedName(selectedAudioRecording);
      const filePath = `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedName}`;

      try {
        if (!(await RNFS.exists(filePath))) {
          const result = await RNFS.downloadFile({
            fromUrl: formatServerFileURLToAbsolutePath(selectedAudioRecording.audio_url),
            toFile: filePath,
          });

          await result.promise;

          await AudioRecordingsDB.modify(() => {
            selectedAudioRecording.cached_name = selectedAudioRecordingCachedName;
          });
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    return `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording?.cached_name}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAudioRecording?.cached_name]);

  const startStoryPlaying = useCallback(async () => {
    if (!selectedAudioRecording) {
      return;
    }

    if (selectedAudioRecordingId && selectedAudioRecordingId !== selectedAudioRecording.id) {
      try {
        await stopStoryPlaying();
      } catch (error) {
        console.error(error);
      }
    }

    reduxDispatch(startPlaying(selectedAudioRecording.id));

    try {
      const filePath = await downloadAudioRecording();

      await audioPlayer.setToPlayFile({ coverPath, filePath, fileTitle: title });

      await audioPlayer.startPlayingFromTime(playedTime);
    } catch (err) {
      console.error(err);
    }

    if (!isStoryPlayNotifiedRef.current) {
      isStoryPlayNotifiedRef.current = true;
      notifyStoryPlay(storyId);
    }
  }, [
    selectedAudioRecording,
    selectedAudioRecordingId,
    reduxDispatch,
    stopStoryPlaying,
    coverPath,
    title,
    playedTime,
    downloadAudioRecording,
    storyId,
  ]);

  const moveStoryPlayingToTime = useCallback(
    async (playedTime: number) => {
      if (!selectedAudioRecording) {
        return;
      }

      try {
        if (playedTime >= selectedAudioRecording.duration) {
          await stopStoryPlaying();
          setPlayedTime(0);
          return;
        }

        let playedTimeToSet = playedTime;

        if (playedTimeToSet < 0) {
          playedTimeToSet = 0;
        } else if (isCurrentStoryPlaying) {
          await audioPlayer.startPlayingFromTime(playedTime);
        }

        setPlayedTime(playedTimeToSet);
      } catch (err) {
        console.error(err);
      }
    },
    [selectedAudioRecording, isCurrentStoryPlaying, setPlayedTime, stopStoryPlaying],
  );

  useEffect(() => {
    audioPlayerDidFinishPlayingSubscriptionRef.current = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_FINISH,
      () => {
        reduxDispatch(stopPlaying());
        setPlayedTime(0);
      },
    );

    audioPlayerDidInterruptPlayingSubscriptionRef.current = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_INTERRUPT,
      ({ playingTime }) => {
        reduxDispatch(stopPlaying());
        setPlayedTime(playingTime);
      },
    );

    return () => {
      audioPlayerDidFinishPlayingSubscriptionRef.current?.remove();
      audioPlayerDidInterruptPlayingSubscriptionRef.current?.remove();
    };
  }, [reduxDispatch, setPlayedTime]);

  useEffect(() => {
    AudioRecordingsDB.modify(() => {
      if (selectedAudioRecording) {
        selectedAudioRecording.played_time = playedTime;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedTime, selectedAudioRecording?.id]);

  useFocusEffect(
    useCallback(
      () => {
        audioPlayer.getCurrentState().then(({ filePath, isPlaying, playingTime }) => {
          if (filePath !== `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording?.cached_name}`) {
            return;
          }

          setPlayedTime(playingTime);

          if (isPlaying && (isCurrentStoryPlaying || !isStoryPlaying)) {
            if (selectedAudioRecording?.id) {
              reduxDispatch(startPlaying(selectedAudioRecording?.id));
            }
          } else {
            reduxDispatch(stopPlaying());
          }
        });

        return () => {
          audioPlayer.getCurrentState().then(({ filePath, isPlaying, playingTime }) => {
            if (filePath !== `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording?.cached_name}`) {
              return;
            }

            if (isPlaying && (isCurrentStoryPlaying || !isStoryPlaying)) {
              if (selectedAudioRecording?.id) {
                reduxDispatch(startPlaying(selectedAudioRecording?.id));
              }
            } else {
              reduxDispatch(stopPlaying());
            }

            AudioRecordingsDB.modify(() => {
              if (selectedAudioRecording) {
                selectedAudioRecording.played_time = playingTime;
              }
            });
          });
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [selectedAudioRecording?.id],
    ),
  );

  useEffect(
    () => {
      const appActiveListener = AppState.addEventListener('change', (state) => {
        if (state === 'active') {
          audioPlayer.getCurrentState().then(({ filePath, isPlaying, playingTime }) => {
            if (filePath !== `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording?.cached_name}`) {
              return;
            }

            setPlayedTime(playingTime);

            if (isPlaying) {
              if (selectedAudioRecording?.id) {
                reduxDispatch(startPlaying(selectedAudioRecording?.id));
              }
            } else {
              reduxDispatch(stopPlaying());
            }

            AudioRecordingsDB.modify(() => {
              if (selectedAudioRecording) {
                selectedAudioRecording.played_time = playingTime;
              }
            });
          });
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
    isStoryLoading: isLoading,
    isStoryPlaying: isCurrentStoryPlaying,
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

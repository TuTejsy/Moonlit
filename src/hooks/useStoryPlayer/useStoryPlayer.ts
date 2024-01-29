import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, EmitterSubscription, NativeEventEmitter } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { SANDBOX } from '@/constants/common';
import { AudioRecordingsDB } from '@/database';
import {
  AUDIO_PLAYER_EMITTER_EVENT,
  audioPlayer,
} from '@/native_modules/MNTAudioPlayer/ts/NativeAudioPlayer';
import { selectIsPlaying, selectSelectedAudioRecoringId } from '@/store/player/player.selector';
import { startPlaying, stopPlaying } from '@/store/player/player.slice';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { generateAudioRecordingCachedName } from '@/utils/generators/generateAudioRecordingCachedName';

import { useAudioRecording } from '../database/useAudioRecording';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

import { MOVE_TO_PROPS, useStoryPlayerProps } from './useStoryPlayers.types';
import { notifyStoryPlay } from './utils/notifyStoryPlay';

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
  const currentPlayCallPromise = useRef<Promise<void> | null>(null);

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

  const stopStoryPlaying = useCallback(() => {
    if (!audioPlayer) {
      return;
    }

    audioPlayer.stopPlaying();
    reduxDispatch(stopPlaying());
  }, [reduxDispatch]);

  const pauseStoryPlaying = useCallback(() => {
    if (!audioPlayer) {
      return;
    }

    const { playingTime } = audioPlayer.pausePlaying();
    reduxDispatch(stopPlaying());

    if (playingTime) {
      setPlayedTime(playingTime);
    }
  }, [reduxDispatch, setPlayedTime]);

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

  const downloadAndPlayStory = useCallback(async () => {
    if (!selectedAudioRecording || !audioPlayer) {
      return;
    }

    if (selectedAudioRecordingId && selectedAudioRecordingId !== selectedAudioRecording.id) {
      stopStoryPlaying();
    }

    try {
      reduxDispatch(startPlaying(selectedAudioRecording.id));

      const filePath = await downloadAudioRecording();

      audioPlayer.setToPlayFile({ coverPath, filePath, fileTitle: title });
      audioPlayer.startPlayingFromTime(playedTime);

      if (!isStoryPlayNotifiedRef.current) {
        isStoryPlayNotifiedRef.current = true;
        notifyStoryPlay(storyId);
      }
    } catch (err) {
      reduxDispatch(stopPlaying());
      console.error(err);
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

  const startStoryPlaying = useCallback(() => {
    const updatePromise = () => {
      currentPlayCallPromise.current = downloadAndPlayStory().finally(() => {
        currentPlayCallPromise.current = null;
      });
    };

    if (currentPlayCallPromise.current) {
      currentPlayCallPromise.current.then(() => {
        stopPlaying();
        updatePromise();
      });
    } else {
      updatePromise();
    }
  }, [downloadAndPlayStory]);

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
            playedTimeToSet = playingTime + moveGap;
          } else if (exactTime !== undefined) {
            playedTimeToSet = exactTime;
          }

          if (playedTimeToSet < 0) {
            playedTimeToSet = 0;

            if (playedTime === 0 || !isPlaying) {
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

        audioPlayer?.startPlayingFromTime(playedTimeToSet);

        reduxDispatch(startPlaying(selectedAudioRecording?.id));
        setPlayedTime(playedTimeToSet);
      } catch (err) {
        console.error(err);
      }
    },
    [selectedAudioRecording, playedTime, isCurrentStoryPlaying, reduxDispatch, stopStoryPlaying],
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
    if (selectedAudioRecording?.id) {
      AudioRecordingsDB.update([selectedAudioRecording.id], (recording) => {
        recording.played_time = playedTime;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedTime, selectedAudioRecording?.id]);

  useFocusEffect(
    useCallback(
      () => {
        if (!audioPlayer) {
          return;
        }

        const { filePath, isPlaying, playingTime } = audioPlayer.getCurrentState();

        if (filePath !== `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording?.cached_name}`) {
          return;
        }

        setPlayedTime(playingTime);

        if (isPlaying && (isCurrentStoryPlaying || !isStoryPlaying)) {
          if (selectedAudioRecording?.id) {
            reduxDispatch(startPlaying(selectedAudioRecording?.id));
          }
        } else if (!isPlaying) {
          reduxDispatch(stopPlaying());
        }

        return () => {
          if (!audioPlayer) {
            return;
          }

          const { filePath, isPlaying, playingTime } = audioPlayer.getCurrentState();
          if (filePath !== `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording?.cached_name}`) {
            return;
          }

          if (isPlaying && (isCurrentStoryPlaying || !isStoryPlaying)) {
            if (selectedAudioRecording?.id) {
              reduxDispatch(startPlaying(selectedAudioRecording?.id));
            }
          } else if (!isPlaying) {
            reduxDispatch(stopPlaying());
          }

          if (selectedAudioRecording?.id) {
            AudioRecordingsDB.update([selectedAudioRecording.id], (recording) => {
              recording.played_time = playedTime;
            });
          }
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [selectedAudioRecording?.id, selectedAudioRecording?.cached_name],
    ),
  );

  useEffect(
    () => {
      const appActiveListener = AppState.addEventListener('change', (state) => {
        if (state === 'active' && audioPlayer) {
          const { filePath, isPlaying, playingTime } = audioPlayer.getCurrentState();

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

          if (selectedAudioRecording?.id) {
            AudioRecordingsDB.update([selectedAudioRecording.id], (recording) => {
              recording.played_time = playedTime;
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

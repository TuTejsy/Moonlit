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

        await AudioRecordingsDB.modify(() => {
          selectedAudioRecording.cached_name = selectedAudioRecordingCachedName;
        });
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    return `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedName}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAudioRecording?.cached_name]);

  const startStoryPlaying = useCallback(async () => {
    if (!selectedAudioRecording || !audioPlayer) {
      return;
    }

    if (selectedAudioRecordingId && selectedAudioRecordingId !== selectedAudioRecording.id) {
      stopStoryPlaying();
    }

    try {
      const filePath = await downloadAudioRecording();

      audioPlayer.setToPlayFile({ coverPath, filePath, fileTitle: title });
      audioPlayer.startPlayingFromTime(playedTime);
      reduxDispatch(startPlaying(selectedAudioRecording.id));

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

  const moveStoryPlayingToTime = useCallback(
    (playedTime: number) => {
      if (!selectedAudioRecording) {
        return;
      }

      try {
        if (playedTime >= selectedAudioRecording.duration) {
          stopStoryPlaying();
          setPlayedTime(0);
          return;
        }

        let playedTimeToSet = playedTime;

        if (playedTimeToSet < 0) {
          playedTimeToSet = 0;
        } else if (isCurrentStoryPlaying) {
          audioPlayer?.startPlayingFromTime(playedTime);
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
        } else {
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
          } else {
            reduxDispatch(stopPlaying());
          }

          AudioRecordingsDB.modify(() => {
            if (selectedAudioRecording) {
              selectedAudioRecording.played_time = playingTime;
            }
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

          AudioRecordingsDB.modify(() => {
            if (selectedAudioRecording) {
              selectedAudioRecording.played_time = playingTime;
            }
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

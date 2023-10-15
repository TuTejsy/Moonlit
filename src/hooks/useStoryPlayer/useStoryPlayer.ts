import { useCallback, useEffect, useRef, useState } from 'react';
import { EmitterSubscription, NativeEventEmitter } from 'react-native';

import RNFS from 'react-native-fs';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { SANDBOX } from '@/constants/common';
import { AudioRecordingsDB } from '@/database';
import { audioPlayer } from '@/native-modules/native-modules';
import { AUDIO_PLAYER_EMITTER_EVENT } from '@/native-modules/native-modules.types';
import { formatServerFileURLToAbsolutePath } from '@/utils/formatters/formatServerFileURLToAbsolutePath';
import { generateAudioRecordingCachedName } from '@/utils/generators/generateAudioRecordingCachedName';

import { useAudioRecording } from '../database/useAudioRecording';

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
    ['played_time', 'audio_url', 'cached_name', 'duration'],
  );

  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playedTime = selectedAudioRecording?.played_time ?? 0;

  const storyPlayingSharedValue = useSharedValue(0);
  const isStoryPlayingSharedValue = useDerivedValue(() => storyPlayingSharedValue.value > 0);

  const setPlayedTime = useCallback(
    (playedTime: number) => {
      AudioRecordingsDB.modify(() => {
        if (selectedAudioRecording) {
          selectedAudioRecording.played_time = playedTime;
        }
      });
    },
    [selectedAudioRecording],
  );

  const stopStoryPlaying = useCallback(async () => {
    try {
      await audioPlayer.stopPlaying();

      setIsStoryPlaying(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const pauseStoryPlaying = useCallback(async () => {
    try {
      const { playingTime } = await audioPlayer.pausePlaying();

      setIsStoryPlaying(false);

      if (playingTime) {
        setPlayedTime(playingTime);
      }
    } catch (err) {
      console.error(err);
    }
  }, [setPlayedTime]);

  const startStoryPlaying = useCallback(async () => {
    if (!selectedAudioRecording) {
      return;
    }

    setIsStoryPlaying(true);

    try {
      let filePath: string;

      if (selectedAudioRecording.cached_name) {
        filePath = `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecording.cached_name}`;
      } else {
        setIsLoading(true);

        const selectedAudioRecordingCachedName =
          generateAudioRecordingCachedName(selectedAudioRecording);
        filePath = `${SANDBOX.DOCUMENTS.VOICE}/${selectedAudioRecordingCachedName}`;

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

        setIsLoading(false);
      }

      await audioPlayer.setToPlayFile({ coverPath, filePath, fileTitle: title });
      await audioPlayer.startPlayingFromTime(playedTime);
    } catch (err) {
      console.error(err);
    }

    if (!isStoryPlayNotifiedRef.current) {
      isStoryPlayNotifiedRef.current = true;
      notifyStoryPlay(storyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverPath, playedTime, selectedAudioRecordingVersion, title, storyId]);

  const moveStoryPlayingToTime = useCallback(
    async (playedTime: number) => {
      if (!selectedAudioRecording) {
        return;
      }

      try {
        if (playedTime > selectedAudioRecording.duration) {
          stopStoryPlaying();
          setPlayedTime(selectedAudioRecording.duration);
          return;
        }

        let playedTimeToSet = playedTime;

        if (playedTimeToSet < 0) {
          playedTimeToSet = 0;
        } else if (isStoryPlaying) {
          await audioPlayer.startPlayingFromTime(playedTime);
        }

        setPlayedTime(playedTimeToSet);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isStoryPlaying, selectedAudioRecordingVersion, stopStoryPlaying, setPlayedTime],
  );

  useEffect(() => {
    audioPlayerDidFinishPlayingSubscriptionRef.current = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_FINISH,
      () => {
        setIsStoryPlaying(false);
        setPlayedTime(0);
      },
    );

    audioPlayerDidInterruptPlayingSubscriptionRef.current = eventEmmiterRef.current?.addListener(
      AUDIO_PLAYER_EMITTER_EVENT.PLAYING_DID_INTERRUPT,
      ({ playingTime }) => {
        setIsStoryPlaying(false);
        setPlayedTime(playingTime);
      },
    );

    return () => {
      audioPlayerDidFinishPlayingSubscriptionRef.current?.remove();
      audioPlayerDidInterruptPlayingSubscriptionRef.current?.remove();
    };
  }, []);

  return {
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

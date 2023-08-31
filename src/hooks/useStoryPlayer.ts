import { useCallback, useEffect, useRef, useState } from 'react';
import { EmitterSubscription, NativeEventEmitter } from 'react-native';

import RNFS from 'react-native-fs';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { SANDBOX } from '@/constants/common';
import { audioPlayer } from '@/native-modules/native-modules';
import { AUDIO_PLAYER_EMITTER_EVENT } from '@/native-modules/native-modules.types';

const AUDIO_PATH =
  'https://lshlquihgvuemvgpgamq.supabase.co/storage/v1/object/public/Test/Initialtales/test.mp3';

const LOCAL_FILE_PATH = `${SANDBOX.DOCUMENTS.STORIES}/test.mp3`;

const DURATION = 4 * 60 + 2;

export function useStoryPlayer(title: string, coverPath: string) {
  const eventEmmiterRef = useRef(new NativeEventEmitter(audioPlayer));
  const audioPlayerDidFinishPlayingSubscriptionRef = useRef<EmitterSubscription | null>(null);
  const audioPlayerDidInterruptPlayingSubscriptionRef = useRef<EmitterSubscription | null>(null);

  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [playedTime, setPlayedTime] = useState(0);

  const storyPlayingSharedValue = useSharedValue(0);
  const isStoryPlayingSharedValue = useDerivedValue(() => storyPlayingSharedValue.value > 0);

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
  }, []);

  const startStoryPlaying = useCallback(async () => {
    try {
      if (!(await RNFS.exists(LOCAL_FILE_PATH))) {
        const result = await RNFS.downloadFile({
          fromUrl: AUDIO_PATH,
          toFile: LOCAL_FILE_PATH,
        });

        await result.promise;
      }

      await audioPlayer.setToPlayFile({ coverPath, filePath: LOCAL_FILE_PATH, fileTitle: title });
      await audioPlayer.startPlayingFromTime(playedTime);

      setIsStoryPlaying(true);
    } catch (err) {
      console.error(err);
    }
  }, [coverPath, playedTime, title]);

  const moveStoryPlayingToTime = useCallback(
    async (playedTime: number) => {
      try {
        if (playedTime > DURATION) {
          stopStoryPlaying();
          setPlayedTime(DURATION);
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
    [isStoryPlaying, stopStoryPlaying],
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

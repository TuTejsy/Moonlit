import { useCallback, useState } from 'react';

import RNFS from 'react-native-fs';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { SANDBOX } from '@/constants/common';
import { audioPlayer } from '@/native-modules/native-modules';

const AUDIO_PATH =
  'https://lshlquihgvuemvgpgamq.supabase.co/storage/v1/object/public/Test/Initialtales/test.mp3';

const LOCAL_FILE_PATH = `${SANDBOX.DOCUMENTS.STORIES}/test.mp3`;

const DURATION = 4 * 60 + 2;

export function useStoryPlayer() {
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

      await audioPlayer.setToPlayFileAtPath(LOCAL_FILE_PATH);
      await audioPlayer.startPlayingFromTime(playedTime);

      setIsStoryPlaying(true);
    } catch (err) {
      console.error(err);
    }
  }, [playedTime]);

  const moveStoryPlayingToTime = useCallback(
    async (playedTime: number) => {
      try {
        let playedTimeToSet = playedTime;

        if (playedTimeToSet < 0) {
          playedTimeToSet = 0;
        } else if (playedTimeToSet > DURATION) {
          playedTimeToSet = DURATION;
        }

        if (isStoryPlaying) {
          await audioPlayer.startPlayingFromTime(playedTime);
        }

        setPlayedTime(playedTime);
      } catch (err) {
        console.error(err);
      }
    },
    [isStoryPlaying],
  );

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

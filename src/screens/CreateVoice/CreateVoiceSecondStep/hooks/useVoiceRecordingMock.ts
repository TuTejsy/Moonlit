import { useCallback, useEffect, useRef, useState } from 'react';

import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const TOTAL_DURATION_SECONDS = 120;
const TOTAL_DURATION_LABEL = '2:00';
const VOICE_SIMULATION_INTERVAL_MS = 300;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const useVoiceRecordingMock = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const voicePowerSharedValue = useSharedValue(1);

  const stopRecording = useCallback(() => {
    setIsRecording(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    voicePowerSharedValue.value = 1;
  }, [voicePowerSharedValue]);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;

          if (next >= TOTAL_DURATION_SECONDS) {
            stopRecording();

            return TOTAL_DURATION_SECONDS;
          }

          return next;
        });
      }, 1000);

      const simulateVoice = () => {
        const randomPower = 1 + Math.random() * 5;

        voicePowerSharedValue.value = withTiming(randomPower, {
          duration: VOICE_SIMULATION_INTERVAL_MS,
          easing: Easing.inOut(Easing.cubic),
        });
      };

      simulateVoice();
      const voiceInterval = setInterval(simulateVoice, VOICE_SIMULATION_INTERVAL_MS);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        clearInterval(voiceInterval);
      };
    }

    return undefined;
  }, [isRecording, stopRecording, voicePowerSharedValue]);

  const formattedTime = formatTime(elapsedSeconds);
  const progress = elapsedSeconds / TOTAL_DURATION_SECONDS;

  return {
    formattedTime,
    isRecording,
    progress,
    stopRecording,
    totalDuration: TOTAL_DURATION_LABEL,
    voicePowerSharedValue,
  };
};

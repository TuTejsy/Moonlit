import { useCallback, useEffect, useRef, useState } from 'react';

import Animated, { scrollTo, useAnimatedRef } from 'react-native-reanimated';

const PARAGRAPH_SWITCH_INTERVAL_MS = 8000;

export const useAutoScrollText = (isRecording: boolean, paragraphCount: number) => {
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const paragraphOffsetsRef = useRef<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleParagraphLayout = useCallback((index: number, y: number) => {
    paragraphOffsetsRef.current[index] = y;
  }, []);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setActiveParagraphIndex((prev) => {
          const next = prev + 1;

          if (next >= paragraphCount) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            return prev;
          }

          return next;
        });
      }, PARAGRAPH_SWITCH_INTERVAL_MS);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }

    return undefined;
  }, [isRecording, paragraphCount]);

  useEffect(() => {
    const offset = paragraphOffsetsRef.current[activeParagraphIndex];

    if (offset !== undefined) {
      scrollTo(scrollRef, 0, offset, true);
    }
  }, [activeParagraphIndex, scrollRef]);

  return {
    activeParagraphIndex,
    handleParagraphLayout,
    scrollRef,
  };
};

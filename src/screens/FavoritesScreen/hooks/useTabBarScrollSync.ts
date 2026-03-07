import { useCallback, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface UseTabBarScrollSyncProps {
  handleOpacityScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollOffsetSharedValue: SharedValue<number>;
  tabWidth: number;
  windowWidth: number;
}

export const useTabBarScrollSync = ({
  handleOpacityScroll,
  scrollOffsetSharedValue,
  tabWidth,
  windowWidth,
}: UseTabBarScrollSyncProps) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const startScrollPositionRef = useRef(0);

  const [isFirstTabScrolled, setIsFirstTabScrolled] = useState(false);
  const [isSecondTabScrolled, setIsSecondTabScrolled] = useState(false);

  const animatedTabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollOffsetSharedValue.value,
          [0, windowWidth],
          [4, tabWidth - 4],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const animatedSavedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, windowWidth],
      [1, 0.5],
      Extrapolation.CLAMP,
    ),
  }));

  const animatedRecentlyPlayedTabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffsetSharedValue.value,
      [0, windowWidth],
      [0.5, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const changeBarColor = useCallback(
    (isTabScrolled: boolean) => {
      const offset = isTabScrolled ? 10 : 0;

      handleOpacityScroll({
        nativeEvent: {
          contentOffset: { x: 0, y: offset },
        },
      } as NativeSyntheticEvent<NativeScrollEvent>);
    },
    [handleOpacityScroll],
  );

  const handleSavedTabPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: 0 });
    changeBarColor(isFirstTabScrolled);
  }, [changeBarColor, isFirstTabScrolled, scrollViewRef]);

  const handleRecentlyPlayedTabPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: windowWidth });
    changeBarColor(isSecondTabScrolled);
  }, [changeBarColor, isSecondTabScrolled, scrollViewRef, windowWidth]);

  const handleBeginEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    startScrollPositionRef.current = contentOffset.x;
  }, []);

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      const scrollPosition = Math.round(contentOffset.x / windowWidth);

      const isScrolled = scrollPosition === 1 ? isSecondTabScrolled : isFirstTabScrolled;
      changeBarColor(isScrolled);
    },
    [changeBarColor, isFirstTabScrolled, isSecondTabScrolled, windowWidth],
  );

  const handleFirstTabScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = event.nativeEvent.contentOffset;

      if (y > 0) {
        setIsFirstTabScrolled(true);
        changeBarColor(true);
      } else {
        setIsFirstTabScrolled(false);
        changeBarColor(false);
      }
    },
    [changeBarColor],
  );

  const handleSecondTabScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = event.nativeEvent.contentOffset;

      if (y > 0) {
        setIsSecondTabScrolled(true);
        changeBarColor(true);
      } else {
        setIsSecondTabScrolled(false);
        changeBarColor(false);
      }
    },
    [changeBarColor],
  );

  return {
    animatedRecentlyPlayedTabStyle,
    animatedSavedTabStyle,
    animatedTabIndicatorStyle,
    handleBeginEndDrag,
    handleFirstTabScroll,
    handleRecentlyPlayedTabPress,
    handleSavedTabPress,
    handleScrollEndDrag,
    handleSecondTabScroll,
    scrollViewRef,
  };
};

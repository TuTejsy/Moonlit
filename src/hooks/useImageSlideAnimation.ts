/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';

export const useImageSlideAnimation = (containerWidth: number) => {
  const imageTranslateXSharedValue = useSharedValue(0);
  const imageWidthSharedValue = useSharedValue(1);

  const [imageWidth, setImageWidth] = useState(0);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: imageTranslateXSharedValue.value }],
    ...(imageWidthSharedValue.value && { width: imageWidthSharedValue.value }),
  }));

  const handleImageLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setImageWidth(width);
  }, []);

  useEffect(() => {
    if (imageWidth > containerWidth && imageTranslateXSharedValue.value === 0) {
      const widthDiff = imageWidth - containerWidth;
      const imageRatio = imageWidth / containerWidth;

      imageTranslateXSharedValue.value = withRepeat(
        withTiming(-widthDiff, {
          duration: imageRatio * 15000,
        }),
        -1,
        true,
      );
    } else if (imageWidth <= containerWidth) {
      cancelAnimation(imageTranslateXSharedValue);
      imageTranslateXSharedValue.value = 0;
      imageWidthSharedValue.value = containerWidth;
    }
  }, [containerWidth, imageWidth]);

  return {
    handleImageLayout,
    imageAnimatedStyle,
  };
};

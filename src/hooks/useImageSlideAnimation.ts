import { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export const useImageSlideAnimation = (containerWidth: number) => {
  const imageTranslateXSharedValue = useSharedValue(0);

  const [imageWidth, setImageWidth] = useState(0);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: imageTranslateXSharedValue.value }],
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
    }
  }, [containerWidth, imageTranslateXSharedValue, imageTranslateXSharedValue.value, imageWidth]);

  return {
    handleImageLayout,
    imageAnimatedStyle,
  };
};

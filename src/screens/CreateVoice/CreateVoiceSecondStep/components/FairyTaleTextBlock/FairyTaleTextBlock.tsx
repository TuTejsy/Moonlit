import React, { useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './FairyTaleTextBlock.styles';
import { FairyTaleTextBlockProps } from './FairyTaleTextBlock.types';

const GAP_BETWEEN_PARAGRAPHS = 16;

export const FairyTaleTextBlock = ({
  activeParagraphIndex,
  onParagraphLayout,
  paragraphs,
  scrollRef,
}: FairyTaleTextBlockProps) => {
  const styles = useMakeStyles(makeStyles);

  const handleLayout = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { y } = event.nativeEvent.layout;

      onParagraphLayout(index, y);
    },
    [onParagraphLayout],
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {paragraphs.map((paragraph, index) => {
          const isActive = index === activeParagraphIndex;

          return (
            <View
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={[styles.paragraphContainer, { marginBottom: GAP_BETWEEN_PARAGRAPHS }]}
              onLayout={handleLayout(index)}
            >
              <TextView
                style={[
                  styles.paragraphText,
                  isActive ? styles.activeParagraphText : styles.inactiveParagraphText,
                ]}
              >
                {paragraph}
              </TextView>
            </View>
          );
        })}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </View>
  );
};

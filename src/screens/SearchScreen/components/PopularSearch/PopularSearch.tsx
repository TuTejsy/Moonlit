import React, { useCallback, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './PopularSearch.styles';

interface PopularSearchPropTypes {
  onPopularSearchItemSelected: (item: string) => void;
  popularSearchItems: Array<string>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

function PopularSearch({
  onPopularSearchItemSelected,
  onScroll,
  popularSearchItems,
}: PopularSearchPropTypes) {
  const styles = useMakeStyles(makeStyles);

  const handleScrollToTop = useCallback(() => {
    onScroll?.({
      nativeEvent: {
        contentOffset: { x: 0, y: 0 },
      },
    } as NativeSyntheticEvent<NativeScrollEvent>);
  }, [onScroll]);

  useEffect(() => {
    handleScrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.popularSearchContainer}
      keyboardShouldPersistTaps='always'
      onScroll={onScroll}
      onScrollToTop={handleScrollToTop}
    >
      <TextView style={styles.titleText} type='bold'>
        Popular search
      </TextView>
      <View style={styles.separator} />

      {popularSearchItems.map((item) => (
        <TextView
          key={item}
          style={styles.itemText}
          onPress={() => onPopularSearchItemSelected(item)}
        >
          {item}
        </TextView>
      ))}
    </ScrollView>
  );
}

export default React.memo(PopularSearch);

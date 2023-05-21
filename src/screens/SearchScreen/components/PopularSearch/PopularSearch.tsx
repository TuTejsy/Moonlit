import React from 'react';
import { ScrollView, View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './PopularSearch.styles';

interface PopularSearchPropTypes {
  onPopularSearchItemSelected: (item: string) => void;
  popularSearchItems: Array<string>;
}

function PopularSearch({
  onPopularSearchItemSelected,
  popularSearchItems,
}: PopularSearchPropTypes) {
  const styles = useMakeStyles(makeStyles);

  return (
    <ScrollView
      contentContainerStyle={styles.popularSearchContainer}
      keyboardShouldPersistTaps='always'
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

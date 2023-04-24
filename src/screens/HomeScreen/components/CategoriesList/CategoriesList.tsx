import React, { useCallback } from 'react';
import { FlatList, View, ListRenderItemInfo } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './CategoriesList.styles';

const CATEGORIES = [
  ['Magical Creatures', 'Wishes and Magic'],
  ['Enchanted Forests', 'Friendship and Teamwork'],
  ['Nautical Adventures', 'Princes and Princesses'],
  ["The Hero's Adventure", 'Animal Adventures'],
];

function CategoriesList() {
  const styles = useMakeStyles(makeStyles);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<(typeof CATEGORIES)[0]>) => {
      return (
        <View key={`${item[0]}-${item[1]}`} style={styles.categoryPreviewsContainer}>
          {item.map((category) => (
            <View key={category} style={styles.categoryPreview}>
              <TextView style={styles.cateogryText}>{category}</TextView>
            </View>
          ))}
        </View>
      );
    },
    [styles.categoryPreview, styles.categoryPreviewsContainer, styles.cateogryText],
  );

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.categoriesListContent}
      data={CATEGORIES}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesList}
    />
  );
}

export default CategoriesList;

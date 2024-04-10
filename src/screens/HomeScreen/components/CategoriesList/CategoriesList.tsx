import React, { useCallback } from 'react';
import { FlatList, View, ListRenderItemInfo } from 'react-native';

import { TouchableHighlight } from 'react-native-gesture-handler';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { CATEGORY_IDS, MAP_CATEGORY_ID_TO_NAMES } from '@/constants/stories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { navigationService } from '@/services/navigation/navigationService';
import { getRouteNameForTab } from '@/utils/navigation/getRouteNameForTab';

import { makeStyles } from './CategoriesList.styles';

const CATEGORIES = [
  [CATEGORY_IDS.CLASSIC_TRANSFORMATIONS, CATEGORY_IDS.FOREST_ADVENTURES],
  [CATEGORY_IDS.MAGICAL_JOURNEYS, CATEGORY_IDS.KINGDOMS_AND_CASTELS],
  [CATEGORY_IDS.MYSTERIES_AND_ENIGMAS, CATEGORY_IDS.HEROIC_TALES],
  [CATEGORY_IDS.ANIMAL_TALES, CATEGORY_IDS.TALES_OF_LOVE_AND_FRIENDSHIP],
  [CATEGORY_IDS.TALES_OF_MAGICAL_OBJECTS, CATEGORY_IDS.TALES_OF_WIZARDS_AND_WITCHES],
  [CATEGORY_IDS.TALES_OF_OVERCOMING, CATEGORY_IDS.MAGICAL_CREATURES_AND_HELPERS],
];

export const CategoriesList = () => {
  const styles = useMakeStyles(makeStyles);

  const navigation = useAppNavigation<SharedRoutes.HOME>();

  const handleCategoryPress = useCallback(
    (categoryId: CATEGORY_IDS) => {
      navigation.push(getRouteNameForTab(SharedRoutes.STORIES_LIST, navigationService.activeTab), {
        storiesFilter: `ANY category_ids == ${categoryId}`,
        title: MAP_CATEGORY_ID_TO_NAMES[categoryId],
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<(typeof CATEGORIES)[0]>) => {
      return (
        <View key={`${item[0]}-${item[1]}`} style={styles.categoryPreviewsContainer}>
          {item.map((categoryId) => (
            <TouchableHighlight
              key={categoryId}
              style={styles.categoryPreview}
              onPress={() => handleCategoryPress(categoryId)}
            >
              <TextView numberOfLines={2} style={styles.cateogryText}>
                {MAP_CATEGORY_ID_TO_NAMES[categoryId]}
              </TextView>
            </TouchableHighlight>
          ))}
        </View>
      );
    },
    [
      handleCategoryPress,
      styles.categoryPreview,
      styles.categoryPreviewsContainer,
      styles.cateogryText,
    ],
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
};

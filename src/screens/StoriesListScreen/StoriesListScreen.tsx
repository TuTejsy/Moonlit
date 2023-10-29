import { View } from 'react-native';

import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './StoriesListScreen.styles';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';

export const StoriesListScreen = () => {
  const styles = useMakeStyles(makeStyles);

  const { params } = useAppRoute<SharedRoutes.STORIES_LIST>();
  const { storiesFilter, title } = params || {};

  const [stories, storiesVersion] = useStories(storiesFilter);

  return (
    <View style={styles.container}>
      <ScreenHeader title={title ?? 'All tales'} />

      <SmallStoriesList
        stories={stories}
        storiesVersion={storiesVersion}
        style={styles.smallList}
      />
    </View>
  );
};

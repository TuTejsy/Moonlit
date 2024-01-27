import { useMemo } from 'react';

import LinearGradient from 'react-native-linear-gradient';

import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { LARGE_TITLE_HEIGHT } from '@/components/Headers/ScreenHeader/ScreenHeader.constants';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAnimatedScrollHandlerValue } from '@/hooks/useAnimatedScrollHandlerValue';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';

import { StoriesWithPromotion } from './components/StoriesWithPromotion/StoriesWithPromotion';
import { makeStyles } from './StoriesListScreen.styles';

export const StoriesListScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const { params } = useAppRoute<SharedRoutes.STORIES_LIST>();
  const { storiesFilter, title } = params || {};

  const [stories, storiesVersion] = useStories(storiesFilter);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headerStories = useMemo(() => stories.slice(0, 2), [stories, storiesVersion]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listStories = useMemo(() => stories.slice(2), [stories, storiesVersion]);

  const { handleAnimatedScroll, scrollPositionSharedValue } =
    useAnimatedScrollHandlerValue(LARGE_TITLE_HEIGHT);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <ScreenHeader
        color={colors.purple}
        scrollPositionSharedValue={scrollPositionSharedValue}
        title={title ?? 'All tales'}
      />

      <SmallStoriesList
        contentContainerStyle={styles.smallListContainerStyle}
        stories={listStories}
        storiesVersion={storiesVersion}
        ListHeaderComponent={
          <StoriesWithPromotion stories={headerStories} storiesVersion={storiesVersion} />
        }
        onScroll={handleAnimatedScroll}
      />
    </LinearGradient>
  );
};

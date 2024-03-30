import { useMemo } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { WINDOW_HEIGHT } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
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
  const { storiesFilter, storiesSortConfig, title } = params || {};

  const insets = useSafeAreaInsets();

  const [stories, storiesVersion] = useStories(storiesFilter, storiesSortConfig);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headerStories = useMemo(() => stories.slice(0, 2), [stories, storiesVersion]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listStories = useMemo(() => stories.slice(2), [stories, storiesVersion]);

  const gradientStartLocation = useMemo(() => {
    return (DEFAULT_HEADER_HEIGHT + insets.top) / WINDOW_HEIGHT;
  }, [insets.top]);

  const { handleAnimatedScroll, scrollPositionSharedValue } = useAnimatedScrollHandlerValue();

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[gradientStartLocation, 1]}
      style={styles.screen}
    >
      <ScreenHeader
        color={colors.purple}
        scrollPositionSharedValue={scrollPositionSharedValue}
        title={title ?? 'All tales'}
      />

      <SmallStoriesList
        contentContainerStyle={styles.smallListContainerStyle}
        isScrollable={!!listStories.length}
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

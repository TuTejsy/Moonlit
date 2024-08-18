import { useMemo } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { MoreTalesComingFooter } from '@/components/Lists/MoreTalesComingFooter/MoreTalesComingFooter';
import { PREVIEW_SIZE } from '@/components/Lists/SmallStoriesList/components/StoryPreview/StoryPreview.constants';
import { SmallStoriesList } from '@/components/Lists/SmallStoriesList/SmallStoriesList';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/layout';
import { DEFAULT_HEADER_HEIGHT } from '@/constants/sizes';
import { useStories } from '@/hooks/database/useStories';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAnimatedScrollHandlerValue } from '@/hooks/useAnimatedScrollHandlerValue';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';

import { StoriesWithPromotion } from './components/StoriesWithPromotion/StoriesWithPromotion';
import { makeStyles } from './StoriesListScreen.styles';

export const StoriesListScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { horizontalPadding } = useLayout();

  const { params } = useAppRoute<SharedRoutes.STORIES_LIST>();
  const { storiesFilter, storiesSortConfigs, title } = params || {};

  const insets = useSafeAreaInsets();

  const [stories, storiesVersion] = useStories(storiesFilter, storiesSortConfigs);

  const numColumns = useMemo(() => {
    return Math.floor((WINDOW_WIDTH - horizontalPadding * 2) / PREVIEW_SIZE);
  }, [horizontalPadding]);

  const headerStories = useMemo(
    () => stories.slice(0, numColumns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stories, storiesVersion, numColumns],
  );
  const listStories = useMemo(
    () => stories.slice(numColumns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stories, storiesVersion, numColumns],
  );

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
        stories={listStories}
        storiesVersion={storiesVersion}
        tab={(title ?? 'All tales') as TabEventType}
        ListFooterComponent={
          <MoreTalesComingFooter
            source={SOURCE.CONTENT}
            style={styles.footer}
            tab={(title ?? 'All tales') as TabEventType}
          />
        }
        ListHeaderComponent={
          <StoriesWithPromotion
            source={SOURCE.CONTENT}
            stories={headerStories}
            storiesVersion={storiesVersion}
            tab={(title ?? 'All tales') as TabEventType}
          />
        }
        onScroll={handleAnimatedScroll}
      />
    </LinearGradient>
  );
};

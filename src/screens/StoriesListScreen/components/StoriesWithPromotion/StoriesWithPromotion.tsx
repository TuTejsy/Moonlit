import { memo } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { UnlockButton } from '@/components/Buttons/UnlockButton/UnlockButton';
import { StoryPreview } from '@/components/Lists/SmallStoriesList/components/StoryPreview/StoryPreview';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { TabEventType } from '@/services/analytics/analytics.types';
import { selectFreeOfferDays, selectIsFullVersion } from '@/store/user/user.selector';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { makeStyles } from './StoriesWithPromotion.styles';

interface StoriesWithPromotionProps {
  source: SOURCE;
  stories: Array<StorySchema>;
  storiesVersion: number;
  tab?: TabEventType;
}

export const StoriesWithPromotion = memo(
  ({ source, stories, storiesVersion, tab }: StoriesWithPromotionProps) => {
    const styles = useMakeStyles(makeStyles);
    const { colors } = useTheme();

    const isFullVersion = useAppSelector(selectIsFullVersion);
    const freeOfferDays = useAppSelector(selectFreeOfferDays);

    return (
      <View style={styles.container}>
        <View style={styles.stories}>
          {stories.map((story) => (
            <StoryPreview
              key={story.id}
              description={story.description}
              isComingSoon={story.is_coming_soon}
              isFree={story.is_free}
              isImageLoaded={!!story.small_cover_cached_name}
              previewURL={getImageFilePathForStory(story, 'small')}
              source={source}
              storyId={story.id}
              tab={tab}
              title={story.name}
            />
          ))}
        </View>

        {isFullVersion ? (
          <View style={styles.storiesSeparator} />
        ) : (
          <LinearGradient
            angle={180}
            locations={[0, 0.5, 1]}
            style={styles.promotionContainer}
            colors={[
              colors.opacityLightPurple(0),
              colors.opacityLightPurple(1),
              colors.opacityLightPurple(0),
            ]}
          >
            <View style={styles.separator} />

            <UnlockButton
              source={SOURCE.STORIES_LIST}
              style={styles.unlockButton}
              tab={tab}
              theme='light'
            >
              Try {freeOfferDays} days for free
            </UnlockButton>

            <View style={styles.separator} />
          </LinearGradient>
        )}
      </View>
    );
  },
);

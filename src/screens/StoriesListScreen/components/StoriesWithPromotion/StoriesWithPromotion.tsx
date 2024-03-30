import { memo } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { UnlockButton } from '@/components/Buttons/UnlockButton/UnlockButton';
import { StoryPreview } from '@/components/Lists/SmallStoriesList/components/StoryPreview/StoryPreview';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectFreeOfferDays, selectIsFullVersion } from '@/store/user/user.selector';
import { getImageFilePathForStory } from '@/utils/urls/getImageFilePathForStory';

import { makeStyles } from './StoriesWithPromotion.styles';

interface StoriesWithPromotionProps {
  stories: Array<StorySchema>;
  storiesVersion: number;
}

export const StoriesWithPromotion = memo(
  ({ stories, storiesVersion }: StoriesWithPromotionProps) => {
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
              isFree={story.is_free}
              isImageLoaded={!!story.small_cover_cached_name}
              previewURL={getImageFilePathForStory(story, 'small')}
              storyId={story.id}
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

            <UnlockButton style={styles.unlockButton} theme='light'>
              Try {freeOfferDays} days for free
            </UnlockButton>

            <View style={styles.separator} />
          </LinearGradient>
        )}
      </View>
    );
  },
);

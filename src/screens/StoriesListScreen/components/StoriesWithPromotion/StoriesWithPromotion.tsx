import { memo } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { UnlockButton } from '@/components/Buttons/UnlockButton/UnlockButton';
import { StoryPreview } from '@/components/Lists/SmallStoriesList/components/StoryPreview/StoryPreview';
import { SANDBOX } from '@/constants/common';
import { StorySchema } from '@/database/schema/stories/types';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './StoriesWithPromotion.styles';

interface StoriesWithPromotionProps {
  stories: Array<StorySchema>;
  storiesVersion: number;
}

export const StoriesWithPromotion = memo(
  ({ stories, storiesVersion }: StoriesWithPromotionProps) => {
    const styles = useMakeStyles(makeStyles);
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
        <View style={styles.stories}>
          {stories.map((story) => (
            <StoryPreview
              key={story.id}
              description={story.description}
              isFree={story.is_free}
              isImageLoaded={!!story.small_cover_cached_name}
              previewURL={`file://${SANDBOX.DOCUMENTS.SMALL_PREVIEW}/${story.small_cover_cached_name}`}
              storyId={story.id}
              title={story.name}
            />
          ))}
        </View>

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
            Try 7 days for free
          </UnlockButton>

          <View style={styles.separator} />
        </LinearGradient>
      </View>
    );
  },
);

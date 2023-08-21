import { StorySchema } from '@/database/schema/stories/StorySchema.types';

type StoryCoverType = 'small' | 'medium' | 'full';

const mapStoryPreivewTypeToPreviewURL: {
  [key: string]: 'full_cover_url' | 'medium_cover_url' | 'small_cover_url';
} = {
  full: 'full_cover_url',
  medium: 'medium_cover_url',
  small: 'small_cover_url',
};

export function generateStoryCoverCachedName(story: StorySchema, type: StoryCoverType) {
  const key = mapStoryPreivewTypeToPreviewURL[type];
  const fileExtension = story[key].split('.').at(-1);

  return `${story.id}.${fileExtension}`;
}

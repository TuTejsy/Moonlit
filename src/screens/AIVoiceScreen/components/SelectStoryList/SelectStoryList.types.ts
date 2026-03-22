import { StorySchema } from '@/database/schema/stories/types';

export interface SelectStoryListProps {
  onStorySelect: (storyId: number) => void;
  selectedStoryId: number | null;
  stories: ArrayLike<StorySchema>;
  storiesVersion: number;
}

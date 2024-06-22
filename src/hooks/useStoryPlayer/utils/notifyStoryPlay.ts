import { StoriesRepository } from '@/api/stories/stories';
import { StoriesDB } from '@/database';

export function notifyStoryPlay(storyId: number) {
  StoriesRepository.playNotify(storyId).catch((err) => {
    console.error(err);
  });

  StoriesDB.update([storyId], (story) => {
    story.played_at_timestamp = Date.now();
  });
}

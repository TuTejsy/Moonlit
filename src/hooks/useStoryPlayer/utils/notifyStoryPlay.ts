import { StoriesDB } from '@/database';
import { StoriesRepository } from '@/services/repositories/stories/stories';

export function notifyStoryPlay(storyId: number) {
  StoriesRepository.playNotify(storyId).catch((err) => {
    console.error(err);
  });

  StoriesDB.update([storyId], (story) => {
    story.played_at_timestamp = Date.now();
  });
}

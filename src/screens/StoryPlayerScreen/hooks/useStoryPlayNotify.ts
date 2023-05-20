import { useEffect } from 'react';

import { StoriesRepository } from '@/services/repositories/stories/stories';

export function useStoryPlayNotify(storyId: number) {
  useEffect(() => {
    StoriesRepository.playNotify(storyId).catch((err) => {
      console.error(err);
    });
  }, []);
}

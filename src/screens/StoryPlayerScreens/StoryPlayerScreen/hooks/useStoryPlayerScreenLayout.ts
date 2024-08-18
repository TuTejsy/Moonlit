import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

const STORY_IMAGE_WIDTH = 686;
const STORY_IMAGE_HEIGHT = 764;

export interface StoryPlayerScreenLayout {
  storyContainerMinWidth: number;
  storyCoverMinHeight: number;
}

export const useStoryPlayerScreenLayout = (): StoryPlayerScreenLayout => {
  const { dh, windowWidth } = useLayout();

  const layout = useMemo(() => {
    const storyCoverMinHeight = dh(382);

    const storyContainerMinWidth = Math.min(
      windowWidth - 32,
      (STORY_IMAGE_HEIGHT / STORY_IMAGE_WIDTH) * storyCoverMinHeight,
    );

    return { storyContainerMinWidth, storyCoverMinHeight };
  }, [dh, windowWidth]);

  return layout;
};

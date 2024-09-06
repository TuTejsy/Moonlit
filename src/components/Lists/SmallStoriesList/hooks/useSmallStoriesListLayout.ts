import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

import { STORY_PREVIEW_SIZE } from '../components/StoryPreview/StoryPreview.constants';

export interface SmallStoriesListLayout {
  cellSpace: number;
  numColumns: number;
}

export const useSmallStoriesListLayout = (): SmallStoriesListLayout => {
  const { horizontalPadding, windowWidth } = useLayout();

  const layout = useMemo(() => {
    const numColumns = Math.max(
      Math.floor((windowWidth - horizontalPadding) / (STORY_PREVIEW_SIZE + horizontalPadding)),
      2,
    );

    const cellSpace =
      (windowWidth - horizontalPadding - STORY_PREVIEW_SIZE * numColumns) / numColumns;

    return {
      cellSpace,
      numColumns,
    };
  }, [horizontalPadding, windowWidth]);

  return layout;
};

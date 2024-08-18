import { WINDOW_WIDTH } from '@/constants/layout';
import { dh } from '@/utils/sizes';

const STORY_IMAGE_WIDTH = 686;
const STORY_IMAGE_HEIGHT = 764;

export const STORY_COVER_MIN_HEIGHT = dh(382);

export const STORY_CONTAINER_MIN_WIDTH = Math.min(
  WINDOW_WIDTH - 32,
  (STORY_IMAGE_HEIGHT / STORY_IMAGE_WIDTH) * STORY_COVER_MIN_HEIGHT,
);

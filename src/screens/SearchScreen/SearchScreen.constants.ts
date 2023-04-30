/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import { ImageSourcePropType } from 'react-native/types';

import { SCREEN_WIDTH } from '@/constants/layout';

export const PROMOTION_BANNER_WIDTH = SCREEN_WIDTH - 32;
export const PROMOTION_BANNER_HEIGHT = (PROMOTION_BANNER_WIDTH / 343) * 480;

export const FEATURING_STORIES = [
  {
    image: require('@/assets/images/story1/story1.png') as ImageSourcePropType,
    title: 'The Elves and the Shoemaker',
  },
  {
    image: require('@/assets/images/story2/story2.png') as ImageSourcePropType,
    title: 'The Twelve Dancing Princesses',
  },
];

export const POPULAR_STORIES = [
  {
    image: require('@/assets/images/story3/story3.png') as ImageSourcePropType,
    title: 'The Elves and the Shoemaker',
  },
  {
    image: require('@/assets/images/story4/story4.png') as ImageSourcePropType,
    title: 'The Twelve Dancing Princesses',
  },
];

export const ALL_STORIES = [...FEATURING_STORIES, ...POPULAR_STORIES, ...FEATURING_STORIES];

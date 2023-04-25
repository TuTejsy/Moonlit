/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import { ImageSourcePropType } from 'react-native/types';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';

const STORIES = [
  {
    image: require('@/assets/images/story1/story1.png') as ImageSourcePropType,
    title: 'The Elves and the Shoemaker',
  },
  {
    image: require('@/assets/images/story2/story2.png') as ImageSourcePropType,
    title: 'The Twelve Dancing Princesses',
  },
  {
    image: require('@/assets/images/story3/story3.png') as ImageSourcePropType,
    title: 'The Elves and the Shoemaker',
  },
  {
    image: require('@/assets/images/story4/story4.png') as ImageSourcePropType,
    title: 'The Twelve Dancing Princesses',
  },
];

export const SAVED_STORIES = [...STORIES, ...STORIES, ...STORIES, ...STORIES];

export const RECENTLY_PLAYED_STORIES = [...SAVED_STORIES].reverse();

export const TAB_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2) / 2 - 8;

export const EXTROPOLATION_CONFIG = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

/* eslint-disable import/no-unresolved */
import firstStepImage from './images/firstStep/firstStep.png';
import secondStepImage from './images/secondStep/secondStep.png';
import thirdStepImage from './images/thirdStep/thirdStep.png';

export const STEPS = [
  {
    description:
      'Pick the perfect voice to make each story feel like home and turn bedtime into an enchanting dream journey.',
    image: firstStepImage,
    tag: 'Unique voices',
    title: 'Enliven bedtime\ntales',
  },
  {
    description:
      'Download your favorite tales and let your child drift into dreamland without distractions.',
    image: secondStepImage,
    tag: 'Play offline',
    title: 'Storytime, anytime',
  },
  {
    description:
      'Rediscover timeless stories that captivate and soothe, sparking imagination and sweet dreams.',
    image: thirdStepImage,
    tag: 'Rich collection',
    title: 'A treasury of\ntimeless tales',
  },
];

export const MAX_STEP = STEPS.length - 1;

export const ANIMATION_DAMPING = 100;
export const ANIMATION_STIFFNESS = 100;

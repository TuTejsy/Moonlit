/* eslint-disable import/no-unresolved */
import firstStepImage from './images/firstStep/firstStep.png';
import fourthStep from './images/fourthStep/fourthStep.png';
import secondStepImage from './images/secondStep/secondStep.png';
import thirdStepImage from './images/thirdStep/thirdStep.png';

export const STEPS = [
  {
    description:
      'Pick the perfect voice to make each story\nfeel like home and turn bedtime into an\nenchanting dream journey.',
    image: firstStepImage,
    tag: 'Unique voices',
    title: 'Enliven bedtime\ntales',
  },
  {
    description:
      'Download your favorite tales and let your\nchild drift into dreamland without\ndistractions.',
    image: secondStepImage,
    tag: 'Play offline',
    title: 'Storytime, anytime',
  },
  {
    description:
      'Add a personal touch to bedtime — create\nstories in your voice for a warm and familiar\nsleep experience.',
    image: thirdStepImage,
    tag: 'Personal Touch',
    title: 'Sleep Stories\nby You',
  },
  {
    description:
      'Rediscover timeless stories that captivate\nand soothe, sparking imagination and\nsweet dreams.',
    image: fourthStep,
    tag: 'Rich collection',
    title: 'A treasury of\ntimeless tales',
  },
];

export const MAX_STEP = STEPS.length - 1;

export const ANIMATION_DAMPING = 100;
export const ANIMATION_STIFFNESS = 100;

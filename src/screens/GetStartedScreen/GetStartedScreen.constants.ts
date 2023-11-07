import firstStepImage from './images/firstStep/firstStep.png';
import secondStepImage from './images/secondStep/secondStep.png';
import thirdStepImage from './images/thirdStep/thirdStep.png';

export const STEPS = [
  {
    description:
      'Create personalized audio stories, making bedtime stories more engaging and memorable',
    image: firstStepImage,
    tag: 'Unique voices',
    title: 'Make Storytime\nSpecial',
  },
  {
    description:
      'Download stories for offline access, to create the perfect storytelling experience for your child',
    image: secondStepImage,
    tag: 'Play offline',
    title: 'Enjoy Anytime,\nAnywhere',
  },
  {
    description:
      "Explore a growing library of children's stories, keeping your children entertained and fostering a love for reading.",
    image: thirdStepImage,
    tag: 'Audio stories',
    title: 'Discover a World\nof Stories',
  },
];

export const MAX_STEP = STEPS.length - 1;

export const ANIMATION_DAMPING = 100;

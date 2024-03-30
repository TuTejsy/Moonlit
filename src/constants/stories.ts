import { SortConfig } from '@/hooks/database/useStories';

export type StoryCoverType = 'small' | 'medium' | 'full';

export const POPULAR_STORIES_CONFIG: SortConfig = {
  reverse: true,
  sortDescriptor: 'played_count',
};

export const FEATURING_STORIES_FILTER = 'is_featuring = true';

export const FEATURING_STORIES_CONFIG: SortConfig = {
  reverse: false,
  sortDescriptor: 'played_count',
};

export const FREE_STORIES_FILTER = 'is_free = true';

export enum CATEGORY_IDS {
  CLASSIC_TRANSFORMATIONS = 1,
  FOREST_ADVENTURES,
  MAGICAL_JOURNEYS,
  KINGDOMS_AND_CASTELS,
  MYSTERIES_AND_ENIGMAS,
  HEROIC_TALES,
  ANIMAL_TALES,
  TALES_OF_LOVE_AND_FRIENDSHIP,
  TALES_OF_MAGICAL_OBJECTS,
  TALES_OF_WIZARDS_AND_WITCHES,
  TALES_OF_OVERCOMING,
  MAGICAL_CREATURES_AND_HELPERS,
}

export const CATEGORY_NAMES = {
  [CATEGORY_IDS.CLASSIC_TRANSFORMATIONS]: 'Classic Transformations',
  [CATEGORY_IDS.FOREST_ADVENTURES]: 'Forest Adventures',
  [CATEGORY_IDS.MAGICAL_JOURNEYS]: 'Magical Journeys',
  [CATEGORY_IDS.KINGDOMS_AND_CASTELS]: 'Kingdoms and Castles',
  [CATEGORY_IDS.MYSTERIES_AND_ENIGMAS]: 'Mysteries and Enigmas',
  [CATEGORY_IDS.HEROIC_TALES]: 'Heroic Tales',
  [CATEGORY_IDS.ANIMAL_TALES]: 'Animal Tales',
  [CATEGORY_IDS.TALES_OF_LOVE_AND_FRIENDSHIP]: 'Tales of Love and Friendship',
  [CATEGORY_IDS.MAGICAL_CREATURES_AND_HELPERS]: 'Tales of Magical Objects',
  [CATEGORY_IDS.TALES_OF_MAGICAL_OBJECTS]: 'Tales of Wizards and Witches',
  [CATEGORY_IDS.TALES_OF_OVERCOMING]: 'Tales of Overcoming',
  [CATEGORY_IDS.TALES_OF_WIZARDS_AND_WITCHES]: 'Magical Creatures and Helpers',
};

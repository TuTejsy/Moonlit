import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { CARD_HEIGHT, CARD_WIDTH, TITLE_WIDTH } from '../../SelectStoryList.constants';

export interface SelectStoryCellStyleContext {
  isSelected: boolean;
}

export const makeStyles = (
  { colors, fonts }: MakeStylesProps,
  { isSelected }: SelectStoryCellStyleContext,
) => {
  const borderColor = isSelected ? colors.pink : colors.transparent;

  return StyleSheet.create({
    cardContainer: {
      borderColor,
      borderRadius: 16,
      borderStyle: 'solid',
      borderWidth: 4,
      height: CARD_HEIGHT,
      marginRight: 16,
      overflow: 'hidden',
      width: CARD_WIDTH,
    },
    lockIcon: {
      position: 'absolute',
      right: 7,
      top: 7,
    },
    preview: {
      borderRadius: 12,
      height: '100%',
      width: '100%',
    },
    titleText: {
      ...fonts.size_14,
      color: colors.white,
      marginLeft: 4,
      marginTop: 8,
      width: TITLE_WIDTH,
    },
  });
};

import { StyleSheet } from 'react-native';

import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { CLOSE_BUTTON_MARGIN_LEFT, CLOSE_BUTTON_WIDTH } from './SearchBar.constants';

interface Context {
  isInputFocused: boolean;
}

export const makeStyles = (
  { colors, fonts, insets }: MakeStylesProps,
  { isInputFocused }: Context,
) =>
  StyleSheet.create({
    closeButton: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.2),
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    closeButtonText: {
      ...fonts.size_12,
      color: colors.white,
    },
    inputContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityBlack(0.2),
      borderColor: isInputFocused ? colors.white : colors.opacityWhite(0.2),
      borderRadius: 8,
      borderWidth: 1,
      flexDirection: 'row',
      height: 48,
      justifyContent: 'flex-start',
      paddingHorizontal: 4,
    },
    searchBar: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginHorizontal: HORIZONTAL_PADDING,
      paddingBottom: 10,
    },
    searchIcon: {
      marginHorizontal: 12,
    },
    textInput: {
      ...fonts.fontFamilyRegular,
      ...fonts.size_16,
      color: colors.white,
      flex: 1,
    },
  });

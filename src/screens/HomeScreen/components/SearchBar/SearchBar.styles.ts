import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '@/constants/layout';
import { HORIZONTAL_PADDING } from '@/constants/sizes';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

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
    closeIcon: {
      marginHorizontal: 8,
    },
    contentContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingBottom: 10,
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: insets.top + 10,
      position: 'relative',
      width: SCREEN_WIDTH,
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
      position: 'absolute',
    },
    searchIcon: {
      marginLeft: 12,
      marginRight: 3,
    },
    textInput: {
      ...fonts.fontFamilyRegular,
      ...fonts.size_16,
      color: colors.white,
      flex: 1,
    },
  });

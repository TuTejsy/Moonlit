import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { UnlockButtonTheme } from './UnlockButton.types';

interface Context {
  theme: UnlockButtonTheme;
}

export const makeStyles = ({ colors, fonts }: MakeStylesProps, { theme }: Context) =>
  StyleSheet.create({
    button: StyleSheet.flatten([
      {
        alignItems: 'center',
        borderRadius: 24,
        flex: 1,
        flexDirection: 'row',
        height: 48,
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 25,
        maxHeight: 48,
      },
      theme === 'opacity' && {
        backgroundColor: colors.opacityWhite(0.2),
      },
      theme === 'light' && {
        backgroundColor: colors.white,
      },
    ]),
    buttonText: StyleSheet.flatten([
      {
        ...fonts.size_16,
        marginLeft: 24,
      },
      theme === 'opacity' && {
        color: colors.white,
      },
      theme === 'light' && {
        color: colors.darkPurple,
      },
    ]),
    unlockIcon: StyleSheet.flatten([
      {
        marginRight: 8,
      },
      theme === 'light' && {
        backgroundColor: colors.orange,
      },
    ]),
  });

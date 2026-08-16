import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';
import { flattenStyle } from '@/utils/styles/flattenStyle';

import { UnlockButtonTheme } from './UnlockButton.types';

interface Context {
  theme: UnlockButtonTheme;
}

export const makeStyles = ({ colors, fonts }: MakeStylesProps, { theme }: Context) =>
  StyleSheet.create({
    button: flattenStyle([
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
      theme === 'opacity'
        ? {
            backgroundColor: colors.opacityWhite(0.2),
          }
        : undefined,
      theme === 'light'
        ? {
            backgroundColor: colors.white,
          }
        : undefined,
    ]),
    buttonText: flattenStyle([
      {
        ...fonts.size_16,
        marginLeft: 24,
      },
      theme === 'opacity'
        ? {
            color: colors.white,
          }
        : undefined,
      theme === 'light'
        ? {
            color: colors.darkPurple,
          }
        : undefined,
    ]),
    unlockIcon: flattenStyle([
      {
        marginRight: 8,
      },
      theme === 'light'
        ? {
            backgroundColor: colors.orange,
          }
        : undefined,
    ]),
  });

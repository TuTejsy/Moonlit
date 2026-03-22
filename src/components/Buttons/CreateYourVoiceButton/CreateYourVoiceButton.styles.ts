import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

import { CreateYourVoiceButtonVariant } from './CreateYourVoiceButton.types';

export interface CreateYourVoiceButtonStyleContext {
  variant: CreateYourVoiceButtonVariant;
}

export const makeStyles = (
  { colors, fonts }: MakeStylesProps,
  { variant }: CreateYourVoiceButtonStyleContext,
) => {
  const isCompact = variant === 'compact';

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: 32,
      height: 32,
      justifyContent: 'center',
      width: isCompact ? 173 : 142,
    },
    buttonContent: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
    },
    buttonText: {
      ...fonts.size_12,
      color: colors.white,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityWhite(0.05),
      borderRadius: 16,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      paddingHorizontal: isCompact ? 20 : 16,
      paddingVertical: isCompact ? 20 : 16,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      width: 40,
    },
    leftContent: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    textHeadline: {
      ...(isCompact ? fonts.size_12 : fonts.size_12_16),
      color: colors.white,
      lineHeight: isCompact ? 14.4 : 16,
    },
  });
};

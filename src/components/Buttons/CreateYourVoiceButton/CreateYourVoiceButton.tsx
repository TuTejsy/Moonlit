import React, { useMemo } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { TEST_ID_CREATE_YOUR_VOICE_BUTTON } from './CreateYourVoiceButton.constants';
import { CreateYourVoiceButtonStyleContext, makeStyles } from './CreateYourVoiceButton.styles';
import { CreateYourVoiceButtonProps } from './CreateYourVoiceButton.types';

export const CreateYourVoiceButton = ({
  onPress,
  style,
  variant = 'default',
  ...restProps
}: CreateYourVoiceButtonProps) => {
  const styleContext = useMemo<CreateYourVoiceButtonStyleContext>(() => ({ variant }), [variant]);
  const styles = useMakeStyles(makeStyles, styleContext);
  const { localize } = useAppLocalization();
  const theme = useTheme();

  const isCompact = variant === 'compact';

  return (
    <PressableView
      onPress={onPress}
      style={[styles.container, style]}
      testID={TEST_ID_CREATE_YOUR_VOICE_BUTTON}
      {...restProps}
    >
      <View style={styles.leftContent}>
        {!isCompact && (
          <View style={styles.iconContainer}>
            <Icons.Mic />
          </View>
        )}
        <TextView style={styles.textHeadline} type={isCompact ? 'bold' : 'medium'}>
          {localize('common', 'readTalesInYourOwnVoice')}
        </TextView>
      </View>
      <LinearGradient
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.button}
        colors={[
          theme.colors.gradientButtonStart,
          theme.colors.gradientButtonMiddle,
          theme.colors.gradientButtonEnd,
        ]}
      >
        <View style={styles.buttonContent}>
          {isCompact && (
            <TextView style={styles.buttonText} type='medium'>
              +
            </TextView>
          )}
          <TextView style={styles.buttonText} type='medium'>
            {localize('common', 'createYourVoice')}
          </TextView>
        </View>
      </LinearGradient>
    </PressableView>
  );
};

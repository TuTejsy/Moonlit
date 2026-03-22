import React from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import {
  TEST_ID_CREATE_YOUR_VOICE_BUTTON,
  TEST_ID_CREATE_YOUR_VOICE_PRESSABLE,
} from './CreateYourVoiceButton.constants';
import { makeStyles } from './CreateYourVoiceButton.styles';
import { CreateYourVoiceButtonProps } from './CreateYourVoiceButton.types';

export const CreateYourVoiceButton = ({
  onPress,
  style,
  ...restProps
}: CreateYourVoiceButtonProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();
  const theme = useTheme();

  return (
    <View
      style={[styles.container, style]}
      testID={TEST_ID_CREATE_YOUR_VOICE_BUTTON}
      {...restProps}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <Icons.Mic />
        </View>
        <TextView style={styles.textHeadline} type='medium'>
          {localize('common', 'readTalesInYourOwnVoice')}
        </TextView>
      </View>
      <PressableView testID={TEST_ID_CREATE_YOUR_VOICE_PRESSABLE} onPress={onPress}>
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
          <TextView style={styles.buttonText} type='medium'>
            {localize('common', 'createYourVoice')}
          </TextView>
        </LinearGradient>
      </PressableView>
    </View>
  );
};

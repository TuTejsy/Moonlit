import React, { useCallback } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Icons } from '@/assets/icons/Icons';
import { MoonlitStars } from '@/components/Decorations/MoonlitStars/MoonlitStars';
import { GradientButton } from '@/components/GradientButton/GradientButton';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { GradientTextView } from '@/components/Primitives/GradientTextView/GradientTextView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { useAppRoute } from '@/navigation/hooks/useAppRoute';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { TabRoutes } from '@/navigation/TabNavigator/TabNavigator.routes';

import { ProcessingNote } from './components/ProcessingNote/ProcessingNote';
import { makeStyles } from './CreateVoiceThirdStep.styles';
import { CreateVoiceThirdStepProps } from './CreateVoiceThirdStep.types';

const PLUMP_MOON_SIZE = 81;

export const CreateVoiceThirdStep = (_props: CreateVoiceThirdStepProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();
  const navigation = useAppNavigation<RootRoutes.CREATE_VOICE_THIRD_STEP>();
  const route = useAppRoute<RootRoutes.CREATE_VOICE_THIRD_STEP>();

  const { storyName } = route.params;

  const handleGoToMainScreen = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <LinearGradient colors={[colors.purple, colors.darkPurple]} style={styles.container}>
      <ScreenHeader title={localize('common', 'createYourVoice')} />

      <View style={styles.contentContainer}>
        <View style={styles.decorationContainer}>
          <View style={styles.starsContainer}>
            <MoonlitStars />
          </View>
          <Icons.PlumpMoon
            height={PLUMP_MOON_SIZE}
            style={styles.plumpMoonIcon}
            width={PLUMP_MOON_SIZE}
          />
        </View>

        <GradientTextView
          useAngle
          angle={100}
          colors={[colors.white, colors.opacityWhite(0.5)]}
          locations={[0.17, 0.62]}
          style={styles.title}
          type='bold'
        >
          {localize('createVoice', 'voiceSubmitted')}
        </GradientTextView>

        <TextView style={styles.description}>
          {localize('createVoice', 'voiceSubmittedDescription', { data: storyName })}
        </TextView>

        <ProcessingNote />
      </View>

      <GradientButton onPress={handleGoToMainScreen} style={styles.button}>
        {localize('createVoice', 'goToMainScreen')}
      </GradientButton>
    </LinearGradient>
  );
};

import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

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
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';

import { VoiceTipsCard } from './components/VoiceTipsCard/VoiceTipsCard';
import { makeStyles } from './CreateVoiceFirstStep.styles';
import { CreateVoiceFirstStepProps } from './CreateVoiceFirstStep.types';

export const CreateVoiceFirstStep = (_props: CreateVoiceFirstStepProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();
  const navigation = useAppNavigation();

  const handleStartRecording = useCallback(() => {
    navigation.navigate(SharedRoutes.CREATE_VOICE_SECOND_STEP);
  }, [navigation]);

  const renderLeftIcon = useCallback(() => <Icons.Mic color={colors.white} />, [colors.white]);

  return (
    <LinearGradient
      colors={[colors.opacityPink(0.1), colors.purple, colors.darkPurple]}
      locations={[0, 0.5, 1]}
    >
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <ScreenHeader title={localize('common', 'createYourVoice')} />

        <View style={styles.decorationContainer}>
          <View style={styles.starsContainer}>
            <MoonlitStars />
          </View>
          <Icons.PlumpMoon height={81} style={styles.plumpMoonIcon} width={81} />
        </View>

        <GradientTextView
          useAngle
          angle={100}
          colors={[colors.white, colors.opacityWhite(0.5)]}
          locations={[0.17, 0.62]}
          style={styles.title}
          type='bold'
        >
          {localize('createVoice', 'readyToRecord')}
        </GradientTextView>

        <TextView style={styles.description}>
          {localize('createVoice', 'recordDescription')}
        </TextView>

        <VoiceTipsCard />

        <GradientButton
          onPress={handleStartRecording}
          renderLeftIcon={renderLeftIcon}
          style={styles.button}
        >
          {localize('createVoice', 'startRecording')}
        </GradientButton>
      </ScrollView>
    </LinearGradient>
  );
};

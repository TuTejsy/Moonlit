import { useEffect } from 'react';
import { View, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { IS_ANDROID } from '@/constants/common';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';
import { AnalyticsService } from '@/services/analytics/analytics';

import { StepIndicator } from './components/StepIndicator/StepIndicator';
import { STEPS } from './GetStartedScreen.constants';
import { makeStyles } from './GetStartedScreen.styles';
import { useOnboardingAnimations } from './hooks/useOnboardingAnimations';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';

export const GetStartedScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { windowWidth } = useLayout();
  const { localize } = useAppLocalization();

  const { currentStepSharedValue, handleBackPress, handleContinuePress } = useOnboardingSteps();

  const {
    backButtonAnimatedStyle,
    stepDescriptionsAnimatedStyle,
    stepImagesAnimatedStyle,
    stepTagsAnimatedStyle,
    stepTitlesAnimatedStyle,
  } = useOnboardingAnimations({
    currentStepSharedValue,
    windowWidth,
  });

  useEffect(() => {
    AnalyticsService.setIsUserPaid(false);
    AnalyticsService.logOnboardingEvent({ screen: 1 });
  }, []);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <View style={styles.stepsContentContainer}>
        <Animated.View style={[styles.stepImagesContainer, stepImagesAnimatedStyle]}>
          {STEPS.map(({ image, title }, step) => (
            <View key={title} style={styles.stepContainer}>
              <Image
                resizeMode='contain'
                source={image}
                style={[styles.image, styles[`image${step + 1}` as 'image1' | 'image2' | 'image3']]}
              />
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.stepTagsContainer, stepTagsAnimatedStyle]}>
          {STEPS.map(({ tag }) => (
            <View key={tag} style={styles.stepContainer}>
              <View style={styles.tagContainer}>
                <TextView style={styles.tag} type='medium'>
                  {tag}
                </TextView>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.stepTitlesContainer, stepTitlesAnimatedStyle]}>
          {STEPS.map(({ title }) => (
            <View key={title} style={styles.stepContainer}>
              <TextView style={styles.title} type='bold'>
                {title}
              </TextView>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[styles.stepDescriptionsContainer, stepDescriptionsAnimatedStyle]}>
          {STEPS.map(({ description }) => (
            <View key={description} style={styles.stepContainer}>
              <TextView key={description} style={styles.description} type='regular'>
                {description}
              </TextView>
            </View>
          ))}
        </Animated.View>
      </View>

      <View style={styles.controls}>
        <GradientButton style={styles.continueButton} onPress={handleContinuePress}>
          {localize('common', 'continue')}
        </GradientButton>

        {IS_ANDROID && (
          <Animated.View style={[styles.backButtonContainer, backButtonAnimatedStyle]}>
            <TextView style={styles.backText} type='bold' onPress={handleBackPress}>
              {localize('common', 'back')}
            </TextView>
          </Animated.View>
        )}

        <View style={styles.indicatorsContainer}>
          {STEPS.map(({ title }, step) => (
            <StepIndicator
              key={title}
              currentStepSharedValue={currentStepSharedValue}
              maxStep={STEPS.length - 1}
              step={step}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

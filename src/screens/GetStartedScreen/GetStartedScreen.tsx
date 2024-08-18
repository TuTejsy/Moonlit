import { useCallback, useEffect, useRef } from 'react';
import { View, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { GradientButton } from '@/components/GradientButton/GradientButton';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { IS_ANDROID } from '@/constants/common';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useLayout } from '@/hooks/theme/useLayout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';

import { StepIndicator } from './components/StepIndicator/StepIndicator';
import { ANIMATION_DAMPING, ANIMATION_STIFFNESS, STEPS } from './GetStartedScreen.constants';
import { makeStyles } from './GetStartedScreen.styles';

export const GetStartedScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { windowWidth } = useLayout();

  const navigation = useAppNavigation<RootRoutes.GET_STARTED_SCREEN>();

  const currentStepRef = useRef(0);
  const currentStepSharedValue = useSharedValue(currentStepRef.current);
  const currentTranslateXSharedValue = useDerivedValue(
    () => -currentStepSharedValue.value * windowWidth,
  );

  const handleClosePaywallModal = useCallback(() => {
    navigation.replace(RootRoutes.TAB, {
      screen: SharedRoutes.HOME,
    });
  }, [navigation]);

  const { showPaywallModal } = useShowPaywallModal({
    animationType: 'push',
    onClose: handleClosePaywallModal,
    shouldReplace: true,
  });

  const handleContinuePress = useCallback(() => {
    if (currentStepRef.current === STEPS.length - 1) {
      storage.set(StorageKeys.isOnboarded, true);

      showPaywallModal({ source: SOURCE.ONBOARDING });
    } else {
      currentStepRef.current += 1;
      AnalyticsService.logOnboardingEvent({ screen: currentStepRef.current + 1 });
    }

    currentStepSharedValue.value = withTiming(currentStepRef.current);
  }, [currentStepSharedValue, showPaywallModal]);

  const handleBackPress = useCallback(() => {
    if (currentStepRef.current !== 0) {
      currentStepRef.current -= 1;
      currentStepSharedValue.value = withTiming(currentStepRef.current);
    }
  }, [currentStepSharedValue]);

  const stepImagesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1,
        }),
      },
    ],
  }));

  const stepTagsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1.3,
          stiffness: ANIMATION_STIFFNESS,
        }),
      },
    ],
  }));

  const stepTitlesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1.3,
          stiffness: ANIMATION_STIFFNESS,
        }),
      },
    ],
  }));

  const stepDescriptionsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: ANIMATION_DAMPING,
          mass: 1.7,
          stiffness: ANIMATION_STIFFNESS,
        }),
      },
    ],
  }));

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(currentStepSharedValue.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

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
          Continue
        </GradientButton>

        {IS_ANDROID && (
          <Animated.View style={[styles.backButtonContainer, backButtonAnimatedStyle]}>
            <TextView style={styles.backText} type='bold' onPress={handleBackPress}>
              Back
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

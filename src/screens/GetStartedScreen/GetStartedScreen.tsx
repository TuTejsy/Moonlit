import { useCallback, useRef } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { WINDOW_WIDTH } from '@/constants/layout';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { SharedRoutes } from '@/navigation/SharedNavigator/SharedNavigator.routes';
import { storage } from '@/services/storage/storage';
import { StorageKeys } from '@/services/storage/storage.constants';

import { StepIndicator } from './components/StepIndicator/StepIndicator';
import { STEPS } from './GetStartedScreen.constants';
import { makeStyles } from './GetStartedScreen.styles';

export const GetStartedScreen = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  const navigation = useAppNavigation<RootRoutes.GET_STARTED_SCREEN>();

  const currentStepRef = useRef(0);
  const currentStepSharedValue = useSharedValue(currentStepRef.current);
  const currentTranslateXSharedValue = useDerivedValue(
    () => -currentStepSharedValue.value * WINDOW_WIDTH,
  );

  const handleContinuePress = useCallback(() => {
    if (currentStepRef.current === STEPS.length - 1) {
      currentStepRef.current = 0;
      // storage.set(StorageKeys.isOnboarded, true);
      // navigation.replace(RootRoutes.TAB, { screen: SharedRoutes.HOME });
    } else {
      currentStepRef.current += 1;
    }

    currentStepSharedValue.value = withTiming(currentStepRef.current, {
      easing: Easing.cubic,
    });
  }, [currentStepSharedValue, navigation]);

  const stepTitlesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: 100,
          stiffness: 60,
        }),
      },
    ],
  }));

  const stepDescriptionsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(currentTranslateXSharedValue.value, {
          damping: 100,
          stiffness: 100,
        }),
      },
    ],
  }));

  return (
    <LinearGradient
      angle={180}
      colors={[colors.purple, colors.darkPurple]}
      locations={[0, 1]}
      style={styles.screen}
    >
      <View style={styles.stepsContentContainer}>
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
        <PressableView style={styles.continueButton} onPress={handleContinuePress}>
          <TextView style={styles.continueText} type='bold'>
            Continue
          </TextView>
        </PressableView>

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

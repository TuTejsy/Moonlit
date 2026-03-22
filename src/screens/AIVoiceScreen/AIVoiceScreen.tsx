import React, { memo, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { CreateYourVoiceButton } from '@/components/Buttons/CreateYourVoiceButton/CreateYourVoiceButton';
import { GradientButton } from '@/components/GradientButton/GradientButton';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useStories } from '@/hooks/database/useStories';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { FREE_STORIES_CONFIG } from './AIVoiceScreen.constants';
import { makeStyles } from './AIVoiceScreen.styles';
import type { AIVoiceScreenProps } from './AIVoiceScreen.types';
import { SelectStoryList } from './components/SelectStoryList/SelectStoryList';

export const AIVoiceScreen = memo((_props: AIVoiceScreenProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();

  const [stories, storiesVersion] = useStories(undefined, FREE_STORIES_CONFIG, 5);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);

  const handleSeeAllPress = useCallback(() => {
    // TODO: Navigate to all tales
  }, []);

  const handleStorySelect = useCallback((storyId: number) => {
    setSelectedStoryId((prev) => (prev === storyId ? null : storyId));
  }, []);

  const handleCreateVoicePress = useCallback(() => {
    // TODO: Navigate to voice creation
  }, []);

  const handleCreateFairytalePress = useCallback(() => {
    // TODO: Handle create fairytale
  }, []);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.purple, colors.darkPurple]}
        locations={[0.3, 1]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1 — Choose a tale */}
          <View style={styles.stepSection}>
            <TextView style={styles.stepLabel} type='bold'>
              {localize('aiVoice', 'stepOne')}
            </TextView>
            <View style={styles.titleRow}>
              <TextView style={styles.sectionTitle} type='bold'>
                {localize('common', 'chooseATale')}
              </TextView>
              <PressableView onPress={handleSeeAllPress}>
                <TextView style={styles.seeAllText}>{localize('common', 'seeAll')}</TextView>
              </PressableView>
            </View>
            <SelectStoryList
              selectedStoryId={selectedStoryId}
              stories={stories}
              storiesVersion={storiesVersion}
              onStorySelect={handleStorySelect}
            />
          </View>

          {/* Step 2 — Create your voice */}
          <View style={styles.stepSection}>
            <TextView style={styles.stepLabel} type='bold'>
              {localize('aiVoice', 'stepTwo')}
            </TextView>
            <View style={styles.sectionHeader}>
              <TextView style={styles.createVoiceTitle} type='bold'>
                {localize('aiVoice', 'createYourVoice')}
              </TextView>
            </View>
            <CreateYourVoiceButton
              style={styles.createVoiceButton}
              variant='compact'
              onPress={handleCreateVoicePress}
            />
          </View>

          {/* Step 3 — Create your fairytale */}
          <View style={styles.stepSection}>
            <TextView style={styles.stepLabel} type='bold'>
              {localize('aiVoice', 'stepThree')}
            </TextView>
            <View style={styles.gradientButtonContainer}>
              <GradientButton style={styles.gradientButton} onPress={handleCreateFairytalePress}>
                {localize('common', 'createYourFairytale')}
              </GradientButton>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
});

AIVoiceScreen.displayName = 'AIVoiceScreen';

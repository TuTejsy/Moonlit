import React from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './RecordingActionButtons.styles';
import { RecordingActionButtonsProps } from './RecordingActionButtons.types';

export const RecordingActionButtons = ({
  onBackPress,
  onSavePress,
}: RecordingActionButtonsProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();

  return (
    <View style={styles.container}>
      <PressableView style={styles.backButton} onPress={onBackPress}>
        <TextView style={styles.backButtonText} type='bold'>
          {localize('common', 'back')}
        </TextView>
      </PressableView>
      <PressableView style={styles.saveButton} onPress={onSavePress}>
        <LinearGradient
          useAngle
          angle={93}
          colors={[
            colors.gradientButtonStart,
            colors.gradientButtonMiddle,
            colors.gradientButtonEnd,
          ]}
          locations={[0.05, 0.54, 1]}
          style={styles.saveButtonGradient}
        >
          <TextView style={styles.saveButtonText} type='bold'>
            {localize('createVoice', 'save')}
          </TextView>
        </LinearGradient>
      </PressableView>
    </View>
  );
};

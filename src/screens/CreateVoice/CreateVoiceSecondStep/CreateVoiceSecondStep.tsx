import React from 'react';
import { View } from 'react-native';

import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './CreateVoiceSecondStep.styles';
import { CreateVoiceSecondStepProps } from './CreateVoiceSecondStep.types';

export const CreateVoiceSecondStep = (_props: CreateVoiceSecondStepProps) => {
  const styles = useMakeStyles(makeStyles);
  const { localize } = useAppLocalization();

  return (
    <View style={styles.container}>
      <ScreenHeader title={localize('common', 'createYourVoice')} />
    </View>
  );
};

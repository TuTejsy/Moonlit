import React from 'react';
import { View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useAppLocalization } from '@/localization/useAppLocalization';

import { makeStyles } from './ProcessingNote.styles';

const MIC_ICON_SIZE = 18;

export const ProcessingNote = () => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();
  const { localize } = useAppLocalization();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icons.Mic color={colors.pink} height={MIC_ICON_SIZE} width={MIC_ICON_SIZE} />
      </View>

      <View style={styles.textContainer}>
        <TextView style={styles.title} type='medium'>
          {localize('createVoice', 'processingTime')}
        </TextView>
        <TextView style={styles.subtitle}>{localize('createVoice', 'processingProgress')}</TextView>
      </View>
    </View>
  );
};

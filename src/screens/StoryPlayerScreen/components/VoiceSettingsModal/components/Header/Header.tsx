import React from 'react';
import { View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './Header.styles';

interface HeaderProps {
  onCloseIconPress: () => void;
}

export function Header({ onCloseIconPress }: HeaderProps) {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.titleContainer}>
      <PressableView style={styles.closeIcon} onPress={onCloseIconPress}>
        <Icons.Close />
      </PressableView>

      <TextView style={styles.title} type='medium'>
        Select voice
      </TextView>
    </View>
  );
}

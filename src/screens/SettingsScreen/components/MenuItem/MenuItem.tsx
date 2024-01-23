import React from 'react';

import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './MenuItem.styles';

interface MenuItemProps {
  icon: React.ReactElement;
  title: string;
  onPress?: () => void;
}

export const MenuItem = ({ icon, onPress, title }: MenuItemProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <PressableView style={styles.container} onPress={onPress}>
      {icon}

      <TextView style={styles.title} type='medium'>
        {title}
      </TextView>
    </PressableView>
  );
};

import React from 'react';
import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './MenuItem.styles';

interface MenuItemProps {
  icon: React.ReactElement;
  title: string;
}

export const MenuItem = ({ icon, title }: MenuItemProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.container}>
      {icon}

      <TextView style={styles.title} type='medium'>
        {title}
      </TextView>
    </View>
  );
};

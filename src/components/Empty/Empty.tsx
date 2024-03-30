import { memo } from 'react';
import { View, Image } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { TextView } from '../Primitives/TextView/TextView';

import { makeStyles } from './Empty.styles';
import Moon from './images/Moon/Moon.png';

interface EmptyProps {
  text: string;
}

export const Empty = memo(({ text }: EmptyProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.container}>
      <Image source={Moon} style={styles.image} />

      <TextView style={styles.text}>{text}</TextView>
    </View>
  );
});

import React from 'react';
import { View, Text } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './StoryPlayerScreen.styles';

function StoryPlayerScreen() {
  const styles = useMakeStyles(makeStyles, {});

  return (
    <View style={styles.screen}>
      <Text>text</Text>
    </View>
  );
}

export default StoryPlayerScreen;

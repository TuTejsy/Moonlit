import React, { useCallback } from 'react';
import { View } from 'react-native';

import { noop } from 'lodash';

import { Icons } from '@/assets/icons/Icons';
import { ScreenHeader } from '@/components/Headers/ScreenHeader/ScreenHeader';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './StoryPlayerScreen.styles';

function StoryPlayerScreen() {
  const styles = useMakeStyles(makeStyles, {});

  const handleGoBack = useCallback(() => {
    noop();
  }, []);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        renderRight={<Icons.Share />}
        subtitle='Wishes and Magic'
        title='Little Red Riding Hood'
        onGoBack={handleGoBack}
      />
    </View>
  );
}

export default StoryPlayerScreen;

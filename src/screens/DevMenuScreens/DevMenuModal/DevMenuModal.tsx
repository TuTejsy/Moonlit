import { View } from 'react-native';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { DevMenuNavigator } from '@/navigation/DebugNavigator/DevMenuNavigator';

import { makeStyles } from './DevMenuModal.styles';

export const DevMenuModal = () => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.screen}>
      <DevMenuNavigator />
    </View>
  );
};

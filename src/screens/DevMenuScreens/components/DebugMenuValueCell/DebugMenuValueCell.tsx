import { View } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

import { makeStyles } from './DebugMenuValueCell.styles';

interface DebugMenuValueCellProps {
  title: string;
  value: string;
}

export const DebugMenuValueCell = ({ title, value }: DebugMenuValueCellProps) => {
  const styles = useMakeStyles(makeStyles);

  return (
    <View style={styles.container}>
      <TextView style={styles.title}>{title}</TextView>
      <TextView style={styles.value}>{value}</TextView>
    </View>
  );
};

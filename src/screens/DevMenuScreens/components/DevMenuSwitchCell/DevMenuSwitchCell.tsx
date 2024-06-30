import { View, Switch } from 'react-native';

import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import { makeStyles } from './DevMenuSwitchCell.styles';

interface DevMenuSwitchCellProps {
  onValueChange: (value: boolean) => void;
  title: string;
  value: boolean;
}

export const DevMenuSwitchCell = ({ onValueChange, title, value }: DevMenuSwitchCellProps) => {
  const styles = useMakeStyles(makeStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TextView style={styles.title}>{title}</TextView>
      <Switch trackColor={{ true: colors.pink }} value={value} onValueChange={onValueChange} />
    </View>
  );
};

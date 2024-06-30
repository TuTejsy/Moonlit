import { StackNavigationOptions } from '@react-navigation/stack';

import { ITheme } from '@/hooks/theme/useTheme';

export const devMenuOptions = ({ colors }: ITheme): StackNavigationOptions => ({
  cardStyle: {
    backgroundColor: colors.darkPurple,
  },
  headerShadowVisible: false,
  headerShown: false,
  presentation: 'card',
});

import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

const ICON_CONTAINER_SIZE = 36;

export const makeStyles = ({ colors, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.opacityPink(0.1),
      borderColor: colors.opacityPink(0.2),
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 12,
      marginTop: 32,
      paddingHorizontal: 17,
      paddingVertical: 16,
      width: '100%',
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: colors.opacityPink(0.15),
      borderRadius: ICON_CONTAINER_SIZE / 2,
      height: ICON_CONTAINER_SIZE,
      justifyContent: 'center',
      width: ICON_CONTAINER_SIZE,
    },
    subtitle: {
      ...fonts.size_12,
      color: colors.opacityWhite(0.5),
    },
    textContainer: {
      flex: 1,
      gap: 2,
    },
    title: {
      ...fonts.size_14_21,
      color: colors.white,
    },
  });

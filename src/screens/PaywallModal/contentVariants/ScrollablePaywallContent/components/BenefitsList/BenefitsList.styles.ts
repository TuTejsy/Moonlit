import { StyleSheet } from 'react-native';

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, fonts }: MakeStylesProps) =>
  StyleSheet.create({
    benefit: {
      flexDirection: 'row',
      marginTop: dh(18),
    },
    benefitText: {
      ...fonts.size_12_4,
      color: colors.white,
      marginLeft: 8,
    },
    benefitsContainer: {
      marginBottom: dh(24),
      marginTop: dh(142),
    },
  });

import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors }: MakeStylesProps) => ({
  container: {
    flex: 1,
    backgroundColor: colors.darkPurple,
  },
});

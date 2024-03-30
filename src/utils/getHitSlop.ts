import { omit } from 'lodash';

export const getHitSlop = (v: number, filter: Array<'right' | 'top' | 'bottom' | 'left'> = []) =>
  omit(
    {
      bottom: v,
      left: v,
      right: v,
      top: v,
    },
    filter,
  );

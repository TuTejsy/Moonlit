import pipe from 'lodash/fp/pipe';

import { RootState } from '../store';

const userSelector = (state: RootState) => state.user;

export const selectIsFullVersion = pipe(userSelector, (state) => state.isFullVersion);

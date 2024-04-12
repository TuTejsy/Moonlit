import pipe from 'lodash/fp/pipe';

import { RootState } from '../store';

const subscriptionSelector = (state: RootState) => state.subscription;

export const selectProducts = pipe(subscriptionSelector, (state) => state.products);

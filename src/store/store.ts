import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import { rootReducer } from './rootReducer';

type StoreState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<StoreState>) =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
    preloadedState: preloadedState as StoreState | undefined,
    reducer: rootReducer,
  });

export const store = setupStore();
export const storePersistor = persistStore(store);

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<Result> = ThunkAction<Result, RootState, unknown, Action<string>>;

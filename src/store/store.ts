import { Action, configureStore, PreloadedState, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import { rootReducer } from './rootReducer';

const middlewares: any[] = [];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  // const createDebugger = require('redux-flipper').default;
  // middlewares.push(createDebugger());
}

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(middlewares),
    preloadedState,
    reducer: rootReducer,
  });

export const store = setupStore();
export const storePersistor = persistStore(store);

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<Result> = ThunkAction<Result, RootState, unknown, Action<string>>;

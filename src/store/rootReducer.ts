import { combineReducers } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { reduxPersistStorage } from './persistStorage';
import { playerSlice } from './player/player.slice';
import { subscriptionSlice } from './subscription/subscription.slice';
import { userSlice } from './user/user.slice';

const reducers = combineReducers({
  [playerSlice.name]: playerSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [subscriptionSlice.name]: subscriptionSlice.reducer,
});

const persistConfig: PersistConfig<any> = {
  key: 'root-reducer-persist',
  stateReconciler: autoMergeLevel2,
  storage: reduxPersistStorage,
  version: 1,
  whitelist: [userSlice.name],
};

export const rootReducer = persistReducer<ReturnType<typeof reducers>>(persistConfig, reducers);

import { ThunkDispatch, Action } from '@reduxjs/toolkit';

import { StorageKeys } from '@/services/storage/storage.constants';
import { authorize, logout } from '@/store/profile/profile.actions';
import { selectUserId } from '@/store/profile/profile.selector';
import { RootState } from '@/store/store';
import { decodeJWT } from '@/utils/decoders/decodeJWT';

import { storage } from '../storage';

export const setupStorageListeners = (
  dispatch: ThunkDispatch<RootState, void, Action<string>>,
  getState: () => RootState,
) => {
  storage.addOnValueChangedListener((key) => {
    switch (key) {
      case StorageKeys.AccessToken: {
        const stateUserId = selectUserId(getState());
        const accessToken = storage.getString(StorageKeys.AccessToken);

        if (accessToken) {
          const decodedAccessToken = decodeJWT(accessToken);
          if (stateUserId) {
            if (!!decodedAccessToken.ano || decodedAccessToken.sub !== String(stateUserId)) {
              dispatch(logout());
            }
          } else if (!decodedAccessToken.ano) {
            dispatch(authorize({ email: '', id: Number(decodedAccessToken.sub) }));
          }
        }

        break;
      }

      default: {
        break;
      }
    }
  });
};

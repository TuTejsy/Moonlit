import Realm, { Configuration } from 'realm';

export type ZRKRealmConfiguration = Configuration & {
  deleteCache: (dbInstance: Realm) => void;
};

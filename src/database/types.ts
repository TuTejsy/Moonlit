import Realm, { BaseConfiguration } from 'realm';

export type ZRKRealmConfiguration = BaseConfiguration & {
  deleteCache: (dbInstance: Realm) => void;
};

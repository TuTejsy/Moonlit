declare namespace Realm {
  type ZRKRealmConfiguration = Configuration & {
    deleteCache: (dbInstance: Realm) => void;
  };
}

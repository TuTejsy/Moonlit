import Realm, { Results, ZRKRealmConfiguration } from 'realm';

export class RealmDB<ObjectType> {
  protected instance: InstanceType<typeof Realm>;

  private realmPath: string;

  // eslint-disable-next-line no-useless-constructor
  constructor(private realmConfig: ZRKRealmConfiguration, public objectName: string) {}

  get realm() {
    return this.instance;
  }

  schema = () => this.instance.schema;

  open = () => {
    const { defaultPath } = Realm;
    this.realmPath = `${defaultPath.substring(0, defaultPath.lastIndexOf('/'))}/Realm-${
      this.objectName
    }.realm`;

    if (__DEV__) {
      console.log(`${this.objectName}DB path: ${this.realmPath}`);
    }

    return Realm.open({
      ...this.realmConfig,
      path: this.realmPath,
    })
      .then((realmInstance) => {
        this.instance = realmInstance;
        return realmInstance;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetch = (input: Array<number>): [Array<ObjectType>, Array<number>] => {
    const results: Array<ObjectType> = [];
    const notFoundObjects: Array<number> = [];

    input.forEach((id) => {
      const object = this.object(id);

      if (object) {
        results.push(object);
      } else {
        notFoundObjects.push(id);
      }
    });

    return [results, notFoundObjects];
  };

  find = (
    input: Array<number>,
    callback: (obj: ObjectType) => boolean,
  ): [Array<ObjectType>, Array<ObjectType>, Array<number>] => {
    const results: Array<ObjectType> = [];
    const notSuitObjects: Array<ObjectType> = [];
    const notFoundObjectsIds: Array<number> = [];

    input.forEach((id) => {
      const object = this.object(id);

      if (object) {
        if (callback(object)) {
          results.push(object);
        } else {
          notSuitObjects.push(object);
        }
      } else {
        notFoundObjectsIds.push(id);
      }
    });

    return [results, notSuitObjects, notFoundObjectsIds];
  };

  filter = (input: Array<number>, callback: (obj: ObjectType) => boolean): Array<number> => {
    const results: Array<number> = [];

    input.forEach((id) => {
      const object = this.object(id);

      if (object && callback(object)) {
        results.push(id);
      }
    });

    return results;
  };

  object = (id: number) => {
    if (id) {
      return this.instance.objectForPrimaryKey<ObjectType>(this.objectName, id);
    }
    return null;
  };

  // eslint-disable-next-line arrow-parens
  subObject = <SubObjectType>(subObjectName: string, id: number) => {
    if (id) {
      return this.instance.objectForPrimaryKey<SubObjectType>(subObjectName, id);
    }
    return null;
  };

  subObjects = <SubObjectType>(subObjectsName: string) =>
    this.instance.objects<SubObjectType>(subObjectsName);

  objects = () => this.instance.objects<ObjectType>(this.objectName);

  upsert = (input: Array<ObjectType> | ObjectType) =>
    new Promise<[Array<ObjectType>, Array<{ err: Error; object: ObjectType }>]>((res, rej) => {
      const upserted: Array<ObjectType> = [];
      const notUpserted: Array<{ err: Error; object: ObjectType }> = [];

      this.performAfterTransactionComplete(() => {
        this.instance.write(() => {
          if (Array.isArray(input)) {
            input.forEach((object) => {
              try {
                const created = this.instance.create<ObjectType>(
                  this.objectName,
                  object,
                  Realm.UpdateMode.Modified,
                );
                upserted.push(created);
              } catch (err) {
                notUpserted.push({ err: err as Error, object });
              }
            });
          } else {
            try {
              const created = this.instance.create<ObjectType>(
                this.objectName,
                input,
                Realm.UpdateMode.Modified,
              );
              upserted.push(created);
            } catch (err) {
              notUpserted.push({ err: err as Error, object: input });
              console.error(err);
            }
          }

          res([upserted, notUpserted]);
        });
      });
    });

  delete = (input: Array<ObjectType | number> | Results<ObjectType> | ObjectType | number) => {
    if (!input) {
      return;
    }

    this.performAfterTransactionComplete(() => {
      this.instance.write(() => {
        if (Array.isArray(input)) {
          input.forEach((data) => {
            const object = typeof data === 'number' ? this.object(data) : data;

            if (object) {
              this.instance.delete(object);
            }
          });
        } else {
          const object = typeof input === 'number' ? this.object(input) : input;

          if (object) {
            this.instance.delete(object);
          }
        }
      });
    });
  };

  transaction = (callback: (instance: Realm, objectName: string) => void) => {
    this.performAfterTransactionComplete(() => {
      this.instance.write(() => {
        callback(this.instance, this.objectName);
      });
    });
  };

  modify = (callback: () => void) => {
    this.performAfterTransactionComplete(() => {
      try {
        this.instance.write(callback);
      } catch (err) {
        console.error(err);
      }
    });
  };

  update = (ids: Array<number>, updater: (object: ObjectType) => void) => {
    this.modify(() => {
      const [foundObjects, notFoundObjects] = this.fetch(ids);
      foundObjects.forEach((object) => updater(object));
    });
  };

  updateSelected = (filter: string, updater: (object: ObjectType) => void) => {
    this.modify(() => {
      const foundObjects = this.objects().filtered(filter);
      // Array is needed, because if you iterate over the "live" object (results)
      // -> the size of results may change during the forEach cycle (during update)
      const foundObjectsArray = foundObjects.map((obj) => obj);

      foundObjectsArray.forEach((object) => updater(object));
    });
  };

  resetDatabase = () => {
    if (this.instance && !this.instance.isClosed) {
      this.realmConfig.deleteCache(this.instance);
    }
    this.close();
    Realm.deleteFile({
      ...this.realmConfig,
      path: this.realmPath,
    });
    this.open();
  };

  dropDatabase = () => {
    this.realmConfig.deleteCache(this.instance);

    this.performAfterTransactionComplete(() => {
      this.instance.write(() => {
        this.instance.deleteAll();
      });
    });
  };

  close = () => {
    if (this.instance && !this.instance.isClosed) {
      this.instance.close();
    }
  };

  performAfterTransactionComplete = (callback: () => void) => {
    if (this.instance.isInTransaction) {
      setTimeout(this.performAfterTransactionComplete, 50, callback);
    } else {
      callback();
    }
  };
}

export const cloneRealmObject = <T>(object: T): T => {
  const clone: T = {} as T;
  for (const key in object) {
    clone[key] = object[key];
  }

  return clone;
};

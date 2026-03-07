import { cloneRealmObject } from '../realm/cloneRealmObject';

describe('cloneRealmObject', () => {
  it('creates a shallow copy of a plain object', () => {
    const original = { a: 1, b: 'hello', c: true };

    const clone = cloneRealmObject(original);

    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  it('copies all enumerable properties', () => {
    const original = { x: 10, y: 20, z: 30 };

    const clone = cloneRealmObject(original);

    expect(Object.keys(clone)).toEqual(['x', 'y', 'z']);
  });

  it('handles an empty object', () => {
    const original = {};

    const clone = cloneRealmObject(original);

    expect(clone).toEqual({});
    expect(clone).not.toBe(original);
  });

  it('mutations on the clone do not affect the original', () => {
    const original = { name: 'Story', score: 5 };

    const clone = cloneRealmObject(original);
    clone.name = 'Modified';
    clone.score = 99;

    expect(original.name).toBe('Story');
    expect(original.score).toBe(5);
  });

  it('handles objects with null and undefined values', () => {
    const original = { a: null, b: undefined, c: 'value' };

    const clone = cloneRealmObject(original);

    expect(clone).toEqual(original);
  });

  it('creates a shallow clone (nested objects reference the same object)', () => {
    const nested = { inner: true };
    const original = { data: nested, id: 1 };

    const clone = cloneRealmObject(original);

    expect(clone.data).toBe(original.data);
  });
});

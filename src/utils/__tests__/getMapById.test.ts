import { mapById } from '../getMapById';

describe('mapById', () => {
  describe('toExists', () => {
    it('creates a map of string IDs to true from a flat string array', () => {
      const collection = ['id1', 'id2', 'id3'];

      const result = mapById.toExists(collection);

      expect(result).toEqual({ id1: true, id2: true, id3: true });
    });

    it('creates a map using a key from objects', () => {
      const collection = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
      ];

      const result = mapById.toExists(collection, 'id');

      expect(result).toEqual({ a: true, b: true });
    });

    it('returns an empty object for an empty collection', () => {
      const result = mapById.toExists([]);

      expect(result).toEqual({});
    });

    it('logs an error when value is not a string (flat array)', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      mapById.toExists([123 as unknown as string]);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('logs an error when object key value is not a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      mapById.toExists([{ id: 123, name: 'Alice' }], 'id');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('toObject', () => {
    it('maps objects by their string key', () => {
      const items = [
        { id: 'x', value: 10 },
        { id: 'y', value: 20 },
      ];

      const result = mapById.toObject(items, 'id');

      expect(result).toEqual({
        x: { id: 'x', value: 10 },
        y: { id: 'y', value: 20 },
      });
    });

    it('returns an empty object for an empty collection', () => {
      const result = mapById.toObject([], 'id' as never);

      expect(result).toEqual({});
    });

    it('logs an error when key value is not a string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      mapById.toObject([{ id: 99, value: 'test' }], 'id');

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('toKeyValue', () => {
    it('maps objects to a specific value extracted by valueKey', () => {
      const items = [
        { id: 'a', score: 100 },
        { id: 'b', score: 200 },
      ];

      const result = mapById.toKeyValue(items, 'id', 'score');

      expect(result).toEqual({ a: 100, b: 200 });
    });

    it('uses the getDefaultKeyValue fallback when valueKey is undefined on the object', () => {
      const items = [{ id: 'a', score: undefined as unknown as number }];

      const result = mapById.toKeyValue(items, 'id', 'score', () => 0);

      expect(result).toEqual({ a: 0 });
    });

    it('does not use fallback when valueKey is defined', () => {
      const items = [{ id: 'a', score: 42 }];

      const result = mapById.toKeyValue(items, 'id', 'score', () => 0);

      expect(result).toEqual({ a: 42 });
    });
  });

  describe('toKeysValue', () => {
    it('maps objects to a subset of their properties', () => {
      const items = [
        { id: 'a', name: 'Alice', score: 100 },
        { id: 'b', name: 'Bob', score: 200 },
      ];

      const result = mapById.toKeysValue(items, 'id', ['name', 'score']);

      expect(result).toEqual({
        a: { name: 'Alice', score: 100 },
        b: { name: 'Bob', score: 200 },
      });
    });

    it('returns an empty object for empty arrays', () => {
      const result = mapById.toKeysValue([], 'id' as never, []);

      expect(result).toEqual({});
    });
  });

  describe('toDefaultValue', () => {
    it('maps each object to a copy of the default value', () => {
      const items = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
      ];

      const result = mapById.toDefaultValue(items, 'id', { loaded: false });

      expect(result).toEqual({
        a: { loaded: false },
        b: { loaded: false },
      });
    });

    it('creates independent copies of the default value', () => {
      const items = [
        { id: 'x', name: 'X' },
        { id: 'y', name: 'Y' },
      ];

      const result = mapById.toDefaultValue(items, 'id', { loaded: false });

      // Mutating one should not affect the other
      (result.x as { loaded: boolean }).loaded = true;
      expect((result.y as { loaded: boolean }).loaded).toBe(false);
    });
  });
});

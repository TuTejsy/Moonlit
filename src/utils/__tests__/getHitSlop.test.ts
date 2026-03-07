import { getHitSlop } from '../getHitSlop';

describe('getHitSlop', () => {
  it('returns all four sides set to the given value when no filter is provided', () => {
    const result = getHitSlop(10);

    expect(result).toEqual({
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    });
  });

  it('returns all four sides set to zero when value is 0', () => {
    const result = getHitSlop(0);

    expect(result).toEqual({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    });
  });

  it('omits the specified side from the result', () => {
    const result = getHitSlop(15, ['top']);

    expect(result).toEqual({
      bottom: 15,
      left: 15,
      right: 15,
    });
    expect(result).not.toHaveProperty('top');
  });

  it('omits multiple specified sides from the result', () => {
    const result = getHitSlop(20, ['top', 'bottom']);

    expect(result).toEqual({
      left: 20,
      right: 20,
    });
    expect(result).not.toHaveProperty('top');
    expect(result).not.toHaveProperty('bottom');
  });

  it('returns an empty object when all sides are filtered', () => {
    const result = getHitSlop(10, ['top', 'bottom', 'left', 'right']);

    expect(result).toEqual({});
  });

  it('handles negative values correctly', () => {
    const result = getHitSlop(-5);

    expect(result).toEqual({
      bottom: -5,
      left: -5,
      right: -5,
      top: -5,
    });
  });

  it('returns all sides when an empty filter array is provided', () => {
    const result = getHitSlop(8, []);

    expect(result).toEqual({
      bottom: 8,
      left: 8,
      right: 8,
      top: 8,
    });
  });
});

import { flattenStyle } from '../styles/flattenStyle';

describe('flattenStyle', () => {
  it('drops undefined, false, and null entries', () => {
    const result = flattenStyle([
      undefined,
      false,
      null,
      {
        opacity: 1,
      },
    ]);

    expect(result).toEqual({
      opacity: 1,
    });
  });

  it('merges style objects from left to right', () => {
    const result = flattenStyle([
      {
        marginTop: 8,
        opacity: 0.5,
      },
      {
        opacity: 1,
      },
    ]);

    expect(result).toEqual({
      marginTop: 8,
      opacity: 1,
    });
  });

  it('returns an empty object when every entry is dropped', () => {
    expect(flattenStyle([undefined, false, null])).toEqual({});
  });

  it('returns an empty object for an empty array', () => {
    expect(flattenStyle([])).toEqual({});
  });
});

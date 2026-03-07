import { formatSecondsToMins } from '../formatters/formatSecondsToMins';

describe('formatSecondsToMins', () => {
  it('returns "0" for 0 seconds', () => {
    expect(formatSecondsToMins(0)).toBe('0');
  });

  it('returns "1" for 30 seconds (rounds to nearest minute)', () => {
    expect(formatSecondsToMins(30)).toBe('1');
  });

  it('returns "1" for 60 seconds', () => {
    expect(formatSecondsToMins(60)).toBe('1');
  });

  it('returns "2" for 90 seconds', () => {
    expect(formatSecondsToMins(90)).toBe('2');
  });

  it('returns "2" for 120 seconds', () => {
    expect(formatSecondsToMins(120)).toBe('2');
  });

  it('returns "0" for values under 30', () => {
    expect(formatSecondsToMins(29)).toBe('0');
  });

  it('returns correct value for 600 seconds (10 minutes)', () => {
    expect(formatSecondsToMins(600)).toBe('10');
  });

  it('handles fractional seconds', () => {
    expect(formatSecondsToMins(90.5)).toBe('2');
  });
});

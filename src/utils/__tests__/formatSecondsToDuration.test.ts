import { formatSecondsToDuration } from '../formatters/formatSecondsToDuration';

describe('formatSecondsToDuration', () => {
  it('formats 0 seconds as "00:00"', () => {
    expect(formatSecondsToDuration(0)).toBe('00:00');
  });

  it('formats seconds under a minute with leading zero', () => {
    expect(formatSecondsToDuration(5)).toBe('00:05');
  });

  it('formats exactly 60 seconds as "01:00"', () => {
    expect(formatSecondsToDuration(60)).toBe('01:00');
  });

  it('formats seconds with both minutes and seconds', () => {
    expect(formatSecondsToDuration(125)).toBe('02:05');
  });

  it('formats double-digit minutes properly', () => {
    expect(formatSecondsToDuration(610)).toBe('10:10');
  });

  it('formats hours when seconds exceed 3600', () => {
    expect(formatSecondsToDuration(3661)).toBe('01:01:01');
  });

  it('formats large hour values', () => {
    expect(formatSecondsToDuration(36000)).toBe('10:00:00');
  });

  it('handles fractional seconds by truncating', () => {
    expect(formatSecondsToDuration(65.9)).toBe('01:05');
  });

  it('formats exactly one hour as "01:00:00"', () => {
    expect(formatSecondsToDuration(3600)).toBe('01:00:00');
  });

  it('formats 59 minutes and 59 seconds as "59:59"', () => {
    expect(formatSecondsToDuration(3599)).toBe('59:59');
  });
});

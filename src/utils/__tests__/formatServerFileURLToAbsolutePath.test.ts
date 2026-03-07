import { STORAGE_URL } from '@/constants/auth';

import { formatServerFileURLToAbsolutePath } from '../formatters/formatServerFileURLToAbsolutePath';

describe('formatServerFileURLToAbsolutePath', () => {
  it('prepends the STORAGE_URL to the file URL', () => {
    const fileURL = 'images/cover.png';
    const result = formatServerFileURLToAbsolutePath(fileURL);

    expect(result).toBe(`${STORAGE_URL}${fileURL}`);
  });

  it('handles file URLs starting with a slash', () => {
    const fileURL = '/images/cover.png';
    const result = formatServerFileURLToAbsolutePath(fileURL);

    expect(result).toBe(`${STORAGE_URL}${fileURL}`);
  });

  it('handles empty file URL', () => {
    const result = formatServerFileURLToAbsolutePath('');

    expect(result).toBe(STORAGE_URL);
  });

  it('handles nested file paths', () => {
    const fileURL = 'stories/images/large/cover.webp';
    const result = formatServerFileURLToAbsolutePath(fileURL);

    expect(result).toBe(`${STORAGE_URL}${fileURL}`);
  });
});

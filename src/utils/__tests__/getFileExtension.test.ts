import { getFileExtension } from '../generators/getFileExtension';

describe('getFileExtension', () => {
  it('returns the extension for a simple file path', () => {
    expect(getFileExtension('image.png')).toBe('png');
  });

  it('returns the extension for a full URL path', () => {
    expect(getFileExtension('https://example.com/files/document.pdf')).toBe('pdf');
  });

  it('returns the last extension for a path with multiple dots', () => {
    expect(getFileExtension('archive.tar.gz')).toBe('gz');
  });

  it('returns the extension for a file with a single character extension', () => {
    expect(getFileExtension('script.r')).toBe('r');
  });

  it('returns the filename itself when there is no extension', () => {
    expect(getFileExtension('Makefile')).toBe('Makefile');
  });

  it('handles an empty string', () => {
    expect(getFileExtension('')).toBe('');
  });

  it('returns the extension for webp format', () => {
    expect(getFileExtension('cover.webp')).toBe('webp');
  });

  it('returns the extension for file paths with query strings', () => {
    expect(getFileExtension('image.jpg?w=100')).toBe('jpg?w=100');
  });
});

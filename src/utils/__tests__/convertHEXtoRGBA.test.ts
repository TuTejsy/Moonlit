import { convertHEXtoRGBA } from '../converters/convertHEXtoRGBA';

describe('convertHEXtoRGBA', () => {
  it('converts a 6-digit HEX color to RGBA with default alpha of 1', () => {
    const result = convertHEXtoRGBA('#FF0000');

    expect(result).toBe('rgba(255,0,0,1)');
  });

  it('converts a HEX color to RGBA with a custom alpha value', () => {
    const result = convertHEXtoRGBA('#00FF00', 0.5);

    expect(result).toBe('rgba(0,255,0,0.5)');
  });

  it('handles black color correctly', () => {
    const result = convertHEXtoRGBA('#000000');

    expect(result).toBe('rgba(0,0,0,1)');
  });

  it('handles white color correctly', () => {
    const result = convertHEXtoRGBA('#FFFFFF');

    expect(result).toBe('rgba(255,255,255,1)');
  });

  it('converts a mixed HEX color correctly', () => {
    const result = convertHEXtoRGBA('#1A2B3C', 0.75);

    expect(result).toBe('rgba(26,43,60,0.75)');
  });

  it('handles HEX without the hash prefix', () => {
    const result = convertHEXtoRGBA('FF5733');

    expect(result).toBe('rgba(255,87,51,1)');
  });

  it('handles zero alpha', () => {
    const result = convertHEXtoRGBA('#AABBCC', 0);

    expect(result).toBe('rgba(170,187,204,0)');
  });

  it('handles lowercase hex characters', () => {
    const result = convertHEXtoRGBA('#aabbcc');

    expect(result).toBe('rgba(170,187,204,1)');
  });
});

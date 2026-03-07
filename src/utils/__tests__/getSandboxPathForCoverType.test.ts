import { getSandboxPathForCoverType } from '../urls/getSandboxPathForCoverType';

jest.mock('@/constants/common', () => ({
  SANDBOX: {
    DOCUMENTS: {
      FULL_COVER: '/mock/documents/full_cover',
      MEDIUM_PREVIEW: '/mock/documents/medium_preview',
      SMALL_PREVIEW: '/mock/documents/small_preview',
    },
  },
}));

describe('getSandboxPathForCoverType', () => {
  it('returns the small preview path for "small" type', () => {
    expect(getSandboxPathForCoverType('small')).toBe('/mock/documents/small_preview');
  });

  it('returns the medium preview path for "medium" type', () => {
    expect(getSandboxPathForCoverType('medium')).toBe('/mock/documents/medium_preview');
  });

  it('returns the full cover path for "full" type', () => {
    expect(getSandboxPathForCoverType('full')).toBe('/mock/documents/full_cover');
  });

  it('returns the medium preview path as default for unknown types', () => {
    expect(getSandboxPathForCoverType('unknown' as never)).toBe('/mock/documents/medium_preview');
  });
});

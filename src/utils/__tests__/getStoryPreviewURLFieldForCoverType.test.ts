import { getStoryPreviewURLFieldForCoverType } from '../urls/getStoryPreviewURLFieldForCoverType';

describe('getStoryPreviewURLFieldForCoverType', () => {
  it('returns "small_cover_url" for "small" type', () => {
    expect(getStoryPreviewURLFieldForCoverType('small')).toBe('small_cover_url');
  });

  it('returns "medium_cover_url" for "medium" type', () => {
    expect(getStoryPreviewURLFieldForCoverType('medium')).toBe('medium_cover_url');
  });

  it('returns "full_cover_url" for "full" type', () => {
    expect(getStoryPreviewURLFieldForCoverType('full')).toBe('full_cover_url');
  });

  it('returns "medium_cover_url" as the default for unknown types', () => {
    expect(getStoryPreviewURLFieldForCoverType('unknown' as never)).toBe('medium_cover_url');
  });
});

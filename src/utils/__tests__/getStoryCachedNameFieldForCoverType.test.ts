import { getStoryCachedNameFieldForCoverType } from '../urls/getStoryCachedNameFieldForCoverType';

describe('getStoryCachedNameFieldForCoverType', () => {
  it('returns "small_cover_cached_name" for "small" type', () => {
    expect(getStoryCachedNameFieldForCoverType('small')).toBe('small_cover_cached_name');
  });

  it('returns "medium_cover_cached_name" for "medium" type', () => {
    expect(getStoryCachedNameFieldForCoverType('medium')).toBe('medium_cover_cached_name');
  });

  it('returns "full_cover_cached_name" for "full" type', () => {
    expect(getStoryCachedNameFieldForCoverType('full')).toBe('full_cover_cached_name');
  });

  it('returns "medium_cover_cached_name" as the default for unknown types', () => {
    expect(getStoryCachedNameFieldForCoverType('unknown' as never)).toBe(
      'medium_cover_cached_name',
    );
  });
});

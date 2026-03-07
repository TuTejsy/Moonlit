import { getStorageData } from '@/services/storage/storage';

import { getApplicationEnv } from '../getEnv';

jest.mock('@/services/storage/storage', () => ({
  getStorageData: jest.fn(),
}));

const mockedGetStorageData = getStorageData as jest.MockedFunction<typeof getStorageData>;

describe('getApplicationEnv', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns "dev" when devMode is true', () => {
    mockedGetStorageData.mockReturnValue({ devMode: true } as ReturnType<typeof getStorageData>);

    const result = getApplicationEnv();

    expect(result).toBe('dev');
  });

  it('returns "prod" when devMode is false', () => {
    mockedGetStorageData.mockReturnValue({ devMode: false } as ReturnType<typeof getStorageData>);

    const result = getApplicationEnv();

    expect(result).toBe('prod');
  });

  it('returns "prod" when devMode is undefined', () => {
    mockedGetStorageData.mockReturnValue({ devMode: undefined } as ReturnType<
      typeof getStorageData
    >);

    const result = getApplicationEnv();

    expect(result).toBe('prod');
  });
});

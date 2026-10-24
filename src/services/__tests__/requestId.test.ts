import { createRequestId, isValidRequestId, resolveRequestId } from '../networkClient/requestId';

describe('requestId', () => {
  it('creates a safe id within 64 characters', () => {
    const first = createRequestId();
    const second = createRequestId();

    expect(isValidRequestId(first)).toBe(true);
    expect(isValidRequestId(second)).toBe(true);
    expect(first).not.toBe(second);
  });

  it('creates a safe id when randomUUID is missing', () => {
    const original = globalThis.crypto;
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: {
        getRandomValues: original.getRandomValues.bind(original),
      },
    });

    try {
      const requestId = createRequestId();
      expect(isValidRequestId(requestId)).toBe(true);
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        configurable: true,
        value: original,
      });
    }
  });

  it('creates a safe id when crypto is missing', () => {
    const original = globalThis.crypto;
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: undefined,
    });

    try {
      const requestId = createRequestId();
      expect(isValidRequestId(requestId)).toBe(true);
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        configurable: true,
        value: original,
      });
    }
  });

  it('keeps a valid supplied id', () => {
    const explicitId = 'Ab.C_d-1';
    const maxLengthId = 'a'.repeat(64);

    expect(resolveRequestId(explicitId)).toBe(explicitId);
    expect(resolveRequestId(maxLengthId)).toBe(maxLengthId);
    expect(resolveRequestId(['explicit_id'])).toBe('explicit_id');
  });

  it('replaces a missing or invalid id', () => {
    const invalidValues: unknown[] = [
      undefined,
      '',
      ' ',
      'bad id',
      'a'.repeat(65),
      'bad/id',
      'id?',
      'café',
      ['one', 'two'],
      12,
    ];

    invalidValues.forEach((value) => {
      const requestId = resolveRequestId(value);
      expect(isValidRequestId(requestId)).toBe(true);
      expect(requestId).not.toBe(value);
    });
  });
});

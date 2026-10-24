export const REQUEST_ID_HEADER = 'X-Request-ID';

const REQUEST_ID_PATTERN = /^[A-Za-z0-9._-]{1,64}$/;

export function isValidRequestId(value: unknown): value is string {
  return typeof value === 'string' && REQUEST_ID_PATTERN.test(value);
}

function suppliedRequestId(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && value.length === 1 && typeof value[0] === 'string') {
    return value[0];
  }

  return undefined;
}

function randomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  const webCrypto = globalThis.crypto;

  if (typeof webCrypto?.getRandomValues === 'function') {
    try {
      webCrypto.getRandomValues(bytes);
      return bytes;
    } catch {
      // Some runtimes expose crypto but reject getRandomValues. Use Math.random.
    }
  }

  const fallback = new Uint8Array(length);
  for (let index = 0; index < fallback.length; index += 1) {
    fallback[index] = Math.floor(Math.random() * 256);
  }

  return fallback;
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = '';

  for (let index = 0; index < bytes.length; index += 1) {
    const byte = bytes[index] ?? 0;
    hex += byte.toString(16).padStart(2, '0');
  }

  return hex;
}

function createFallbackRequestId(): string {
  const hex = bytesToHex(randomBytes(16));
  const parts = [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ];

  return parts.join('-');
}

export function createRequestId(): string {
  const webCrypto = globalThis.crypto;

  if (typeof webCrypto?.randomUUID === 'function') {
    try {
      const generated = webCrypto.randomUUID();
      if (isValidRequestId(generated)) {
        return generated;
      }
    } catch {
      // randomUUID can throw when the runtime has no entropy source.
    }
  }

  return createFallbackRequestId();
}

export function resolveRequestId(value: unknown): string {
  const supplied = suppliedRequestId(value);

  if (isValidRequestId(supplied)) {
    return supplied;
  }

  return createRequestId();
}

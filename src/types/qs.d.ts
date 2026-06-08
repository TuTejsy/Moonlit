declare module 'qs' {
  const qs: {
    parse: (str: string, options?: Record<string, unknown>) => Record<string, unknown>;
    stringify: (obj: Record<string, unknown>, options?: Record<string, unknown>) => string;
  };

  export default qs;
}

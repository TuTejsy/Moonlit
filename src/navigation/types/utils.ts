export type Key = keyof any;

export type Params<R extends Key> = Partial<Record<R, object | undefined>>;

export type GenerateRouteParams<R extends Key, P extends Params<R> = Params<R>> = {
  [K in R]: K extends keyof P ? P[K] : undefined;
};

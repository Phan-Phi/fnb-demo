export * from "./responseSchema";

interface IPage<T extends unknown[]> {
  initData: T;
  fallback: {
    [key: string]: any;
  };
}
type responseSchema<T> = {
  meta: {
    total_count: number;
    [key: string]: any;
  };
  next: string | null;
  previous: string | null;
  items: T[];
};

type Mutable<Type> = {
  readonly [Key in keyof Type]: Type[Key];
};

export type { IPage, responseSchema, Mutable };

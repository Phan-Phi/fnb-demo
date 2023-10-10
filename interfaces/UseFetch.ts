import { AxiosError } from "axios";

type ResponseType<T> = {
  next: string | null;
  previous: string | null;
  meta: { total_count: number };
  items: T[];
};

type ResponseErrorType<T = any> = AxiosError<T>;

export type { ResponseType, ResponseErrorType };

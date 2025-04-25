export type ServiceResponse<T> = T & {
    error?: string;
  };
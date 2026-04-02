export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export interface ApiErrorDetail {
  field?: string;
  message: string;
  value?: unknown;
}

export interface ApiErrorPayload {
  code: ApiErrorCode;
  message: string;
  details?: ApiErrorDetail[];
}

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiFailureResponse {
  ok: false;
  error: ApiErrorPayload;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export interface PageQuery {
  page?: number;
  pageSize?: number;
}

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PageResult<T> {
  items: T[];
  meta: PageMeta;
}

export interface DateRange {
  from?: string;
  to?: string;
}

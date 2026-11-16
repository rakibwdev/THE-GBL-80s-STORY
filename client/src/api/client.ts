import axios, { AxiosError } from 'axios';
import { ERROR_CODES, type ApiError, type ApiResponse, type PaginationMeta } from '@gbl80s/shared';

/**
 * API service layer base instance.
 * Dev: same-origin "/api/v1" — Vite proxies /api to the Express server, so
 * cookies (refresh token) work without CORS friction.
 * Prod: override with VITE_API_URL if the API is on a separate domain.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.trim() || '/api/v1',
  withCredentials: true,
  timeout: 30_000,
});

/** Normalised error shape the app code consumes — never raw axios errors. */
export class ApiClientError extends Error {
  readonly code: string;
  readonly status: number;
  readonly fields?: Record<string, string[]>;

  constructor(status: number, code: string, message: string, fields?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }

  get isAuthError() {
    return this.code === ERROR_CODES.UNAUTHORIZED || this.code === ERROR_CODES.FORBIDDEN;
  }
}

export function toApiClientError(err: unknown): ApiClientError {
  if (err instanceof ApiClientError) return err;

  if (err instanceof AxiosError) {
    const body = err.response?.data as ApiError | undefined;
    if (body?.success === false) {
      return new ApiClientError(
        err.response?.status ?? 0,
        body.error.code,
        body.error.message,
        body.error.fields,
      );
    }
    if (err.code === 'ECONNABORTED') {
      return new ApiClientError(0, ERROR_CODES.INTERNAL_ERROR, 'The request timed out. Please try again.');
    }
    return new ApiClientError(
      err.response?.status ?? 0,
      ERROR_CODES.INTERNAL_ERROR,
      'Cannot reach the server. Please check your connection.',
    );
  }

  return new ApiClientError(0, ERROR_CODES.INTERNAL_ERROR, 'An unexpected error occurred.');
}

/** Typed GET that unwraps the response envelope. */
export async function apiGet<T>(
  url: string,
  params?: Record<string, unknown>,
): Promise<{ data: T; meta?: PaginationMeta }> {
  try {
    const res = await api.get<ApiResponse<T>>(url, { params });
    if (res.data.success === false) throw new ApiClientError(0, res.data.error.code, res.data.error.message);
    return { data: res.data.data, meta: 'meta' in res.data ? res.data.meta : undefined };
  } catch (err) {
    throw toApiClientError(err);
  }
}

/** Typed POST/PATCH/PUT/DELETE that unwraps the response envelope. */
export async function apiSend<T>(
  method: 'post' | 'put' | 'patch' | 'delete',
  url: string,
  body?: unknown,
): Promise<T> {
  try {
    const res = await api.request<ApiResponse<T>>({ method, url, data: body });
    if (res.data.success === false) {
      throw new ApiClientError(0, res.data.error.code, res.data.error.message, res.data.error.fields);
    }
    return res.data.data;
  } catch (err) {
    throw toApiClientError(err);
  }
}

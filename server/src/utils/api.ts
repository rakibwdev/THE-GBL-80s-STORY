import { ERROR_CODES, type ApiError, type ApiSuccess, type PaginationMeta } from '@gbl80s/shared';

/** Operational error carrying a stable machine-readable code for the SPA. */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly fields?: Record<string, string[]>;

  constructor(status: number, code: string, message: string, fields?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }

  static badRequest(message: string, fields?: Record<string, string[]>) {
    return new ApiError(400, ERROR_CODES.BAD_REQUEST, message, fields);
  }
  static unauthorized(message = 'Authentication required') {
    return new ApiError(401, ERROR_CODES.UNAUTHORIZED, message);
  }
  static forbidden(message = 'You do not have permission to perform this action') {
    return new ApiError(403, ERROR_CODES.FORBIDDEN, message);
  }
  static notFound(message = 'Resource not found') {
    return new ApiError(404, ERROR_CODES.NOT_FOUND, message);
  }
  static conflict(message: string) {
    return new ApiError(409, ERROR_CODES.CONFLICT, message);
  }
}

export function ok<T>(data: T, meta?: PaginationMeta): ApiSuccess<T> {
  return meta ? { success: true, data, meta } : { success: true, data };
}

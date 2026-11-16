import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ERROR_CODES, type ApiError as ApiErrorShape } from '@gbl80s/shared';
import { ApiError } from '../utils/api.js';
import { logger } from '../config/logger.js';

/** 404 for unmatched routes — keeps the envelope contract. */
export function notFoundHandler(_req: Request, res: Response) {
  const body: ApiErrorShape = {
    success: false,
    error: { code: ERROR_CODES.NOT_FOUND, message: 'Endpoint not found' },
  };
  res.status(404).json(body);
}

/**
 * Central error handler. Every error surfaces as the consistent envelope:
 * { success: false, error: { code, message, fields? } }
 * Unexpected errors are logged server-side but never leak internals to clients.
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    const body: ApiErrorShape = {
      success: false,
      error: { code: err.code, message: err.message, ...(err.fields ? { fields: err.fields } : {}) },
    };
    res.status(err.status).json(body);
    return;
  }

  if (err instanceof ZodError) {
    const fields: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const key = issue.path.join('.') || '_';
      (fields[key] ??= []).push(issue.message);
    }
    const body: ApiErrorShape = {
      success: false,
      error: { code: ERROR_CODES.VALIDATION_ERROR, message: 'Validation failed', fields },
    };
    res.status(422).json(body);
    return;
  }

  logger.error('Unhandled error', { err: err instanceof Error ? err.stack : String(err) });
  const body: ApiErrorShape = {
    success: false,
    error: { code: ERROR_CODES.INTERNAL_ERROR, message: 'Something went wrong. Please try again.' },
  };
  res.status(500).json(body);
}

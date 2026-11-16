import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import { ok } from './utils/api.js';

/**
 * Application factory — exported without listen() so tests can drive it via supertest.
 * Route modules are registered in later phases (auth in Phase 3, content in Phase 4+).
 */
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  // Global coarse rate limit; stricter per-route limits (login, forms) come later.
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 300,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
    }),
  );

  app.get(`${'/api/v1'}/health`, (_req, res) => {
    res.json(
      ok({
        status: 'ok',
        service: 'gbl80s-api',
        time: new Date().toISOString(),
      }),
    );
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

import { z } from 'zod';

/**
 * Environment validation — fail fast at boot, never trust the shell.
 * Extended in later phases (auth secrets in Phase 3, storage in Phase 5).
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:5173')
    .transform((v) => v.split(',').map((s) => s.trim())),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgresql://gbl:gbl_dev_password@localhost:5432/gbl80s?schema=public'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

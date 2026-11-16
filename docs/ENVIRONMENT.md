# Environment Variables Reference

Copy `server/.env.example` → `server/.env` and `client/.env.example` → `client/.env`.
Never commit real `.env` files. In production, secrets come from the host's secret manager.

## Server (`server/.env`)

| Variable | Required | Default (dev) | Description |
|---|---|---|---|
| `NODE_ENV` | yes | `development` | `development` \| `test` \| `production`. Fail-fast boot in production without required secrets. |
| `PORT` | no | `4000` | API listen port. |
| `CORS_ORIGIN` | no | `http://localhost:5173` | Comma-separated list of allowed browser origins. Only needed when SPA and API are on different origins. |
| `DATABASE_URL` | yes | `postgresql://gbl:gbl_dev_password@localhost:5432/gbl80s?schema=public` | PostgreSQL connection string for Prisma. |
| `JWT_ACCESS_SECRET` | Phase 3 | — | `openssl rand -hex 32`. Must be ≥ 32 chars. Required in production. |
| `JWT_ACCESS_TTL_MINUTES` | no | `15` | Access token lifetime. |
| `JWT_REFRESH_TTL_DAYS` | no | `30` | Refresh token lifetime. |
| `S3_ENDPOINT` | Phase 5 | `http://localhost:9000` | S3-compatible endpoint (MinIO in dev, R2/B2/Zendesk in prod). |
| `S3_BUCKET` | Phase 5 | `gbl80s-media` | Bucket for originals + derivatives. |
| `S3_ACCESS_KEY` / `S3_SECRET_KEY` | Phase 5 | — | Storage credentials. |
| `S3_REGION` | no | `us-east-1` | Provider region. |
| `S3_FORCE_PATH_STYLE` | no | `true` | Keep `true` for MinIO/localstack. |
| `RESEND_API_KEY` / `NOTIFY_EMAIL_FROM` | optional | — | Email notifications (dashboard-only in v1; email is a later enhancement). |

## Client (`client/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | no | *(empty → `/api/v1`)* | Leave empty in dev: Vite proxies `/api` → `http://localhost:4000`, so cookies are same-origin. Set only when the API runs on another domain. |

> Only variables prefixed with `VITE_` are exposed to the browser bundle. **Never** put
> secrets in `client/.env` — everything under `VITE_` is public.

## Database options on a dev machine

1. **Docker (standard):** `docker compose up -d` — matches the default `DATABASE_URL`.
2. **Embedded PostgreSQL (no Docker/sudo):** the `embedded-postgres` npm package runs
   user-space Postgres binaries configured against the same `DATABASE_URL` port (5432).
   Wired up in Phase 3.

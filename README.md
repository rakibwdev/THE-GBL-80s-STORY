# The GBL 80s Story

Historical basketball archive platform for the Gippsland Basketball League (GBL) 1980s.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 · TypeScript · Vite · Tailwind CSS · React Router · TanStack Query · React Hook Form + Zod · Axios |
| Backend | Node.js · Express · TypeScript · Prisma ORM · Zod validation · JWT auth |
| Database | PostgreSQL 16 |
| Media | S3-compatible object storage (MinIO in dev) |
| Testing | Vitest · Supertest · React Testing Library |

## Repository layout

```
packages/shared/   Shared TypeScript types + Zod schemas (client & server)
server/            Express REST API
client/            React SPA
docs/              Architecture, environment and schema documentation
```

## Quick start (local development)

```bash
npm install                # install all workspaces
cp server/.env.example server/.env
cp client/.env.example client/.env
docker compose up -d       # start PostgreSQL + MinIO (skip if using embedded Postgres)

npm run dev:server         # API on http://localhost:4000
npm run dev:client         # SPA on http://localhost:5173 (proxies /api → :4000)
```

No Docker? See `docs/ENVIRONMENT.md` for the embedded PostgreSQL option.

## Useful commands

```bash
npm run typecheck          # type-check all workspaces
npm run test               # run all workspace tests
npm run build:client       # production SPA build
```

## Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system architecture and key decisions
- [`DEVELOPMENT_PROGRESS.md`](./DEVELOPMENT_PROGRESS.md) — phase-by-phase progress log
- [`docs/ENVIRONMENT.md`](./docs/ENVIRONMENT.md) — environment variable reference
- [`docs/DATABASE_SCHEMA.md`](./docs/DATABASE_SCHEMA.md) — database schema and relationships
# THE-GBL-80s-STORY

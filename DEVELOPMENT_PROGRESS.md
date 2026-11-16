# DEVELOPMENT PROGRESS

The GBL 80s Story — phase-by-phase progress log. Update after every completed unit of work.

---

## Phase 1 — Architecture & planning ✅

- [x] Requirements analysis (3 surfaces: public / contributor / admin)
- [x] System architecture (SPA + REST, monorepo, media pipeline, search strategy)
- [x] Database schema design (documented in Phase 1 plan; Prisma schema in Phase 3)
- [x] Authentication & authorization design (Argon2, refresh rotation, 3-layer RBAC)
- [x] REST API surface definition
- [x] Folder structure proposal
- [x] Risk register + roadmap
- [x] Design reference approved (`Design Refferance/`) → tokens extracted into Phase 2 config

## Phase 2 — Project setup ✅ (this machine)

- [x] npm workspaces monorepo: `packages/shared`, `server`, `client`
- [x] Removed stray `headroom-ai` dependency from root package.json
- [x] Shared package: domain constants, API envelope types, historical-date + pagination schemas
- [x] Server: Express + TypeScript, env validation (Zod), helmet, CORS, rate limit,
      consistent response envelope, central error handler, health endpoint, graceful shutdown
- [x] Server tests: Vitest + Supertest (health + 404 envelope)
- [x] Client: Vite + React 19 + TS strict, TanStack Query, React Router,
      axios service layer with typed errors, fontsource self-hosted fonts
- [x] Design tokens from `Design Refferance/` encoded in Tailwind config + globals.css
- [x] Public layout (header/nav/footer) + route table for 7 public sections (placeholders)
- [x] Client smoke test (RTL)
- [x] docker-compose.yml (Postgres 16 + MinIO) — requires Docker, unavailable on this machine
- [x] Environment documentation (`.env.example` for server/client, `docs/ENVIRONMENT.md`)
- [x] ARCHITECTURE.md, DEVELOPMENT_PROGRESS.md, README.md
- [x] Git repository initialised

### Phase 2 environment note
This machine has **no Docker and no passwordless sudo**, so local Postgres runs via the
`embedded-postgres` npm package (user-space binaries). Set up in Phase 3 together with
`prisma migrate dev`. `docker-compose.yml` remains available for Docker-capable machines.

## Phase 3 — Database & authentication (next)

- [ ] Prisma schema (all entities from Phase 1 design)
- [ ] Initial migration + `docs/DATABASE_SCHEMA.md`
- [ ] Embedded PostgreSQL runtime + seed (15 clubs, divisions, recognition categories, admin user)
- [ ] Argon2 auth, access/refresh token rotation with reuse detection
- [ ] RBAC + club-scope middleware
- [ ] Auth integration tests

## Phase 4 — Public website (pending)

## Phase 5 — Contributor dashboard (pending)

## Phase 6 — Admin dashboard (pending)

## Phase 7 — Search & nominations (pending)

## Phase 8 — Testing & deployment (pending)

---

### Decisions log (dated)

| Date | Decision |
|---|---|
| 2026-11-16 | Phase 1 architecture approved; design locked to `Design Refferance/` |
| 2026-11-16 | S3-compatible storage + sharp chosen over Cloudinary (original preservation, no lock-in); MinIO in dev |
| 2026-11-16 | Embedded PostgreSQL for this dev machine (no Docker/sudo); docker-compose kept as the standard option |

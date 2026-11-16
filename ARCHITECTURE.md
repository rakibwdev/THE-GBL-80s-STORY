# ARCHITECTURE — The GBL 80s Story

> Living document. Updated whenever a significant technical decision is made.
> Last updated: Phase 2 (project setup).

## 1. Overview

Three applications share one PostgreSQL database and one design language:

| Surface | Users | Behaviour |
|---|---|---|
| Public museum site | Anonymous visitors | Read-only browsing, search, nomination/contact forms |
| Contributor dashboard | Club representatives | Multi-file submissions scoped to assigned clubs |
| Admin dashboard | Central administrators | Moderation, publishing, user/club management, audit |

## 2. Approved design reference

`Design Refferance/` is the visual source of truth (cream "paper" sections alternating with deep navy, Barlow Condensed display type, orange `#ff9850` accents, kicker pattern, squared flat components). Tokens are encoded in `client/tailwind.config.ts` and `client/src/styles/globals.css`. All shadcn-style components are re-themed to this vocabulary.

## 3. Monorepo & module boundaries

npm workspaces:

- `packages/shared` — Zod schemas + constants + API envelope types. Consumed by *both* client and server, so frontend forms validate with the same rules the backend enforces. Currently compiled in-source (`exports` → `src/index.ts`); a production `dist` build is added before deployment (Phase 8).
- `server` — Express API. Layers per module: `routes → controller → service → repository → Prisma`. Controllers do HTTP, services hold business rules, repositories are the only Prisma access point.
- `client` — React SPA. `api/` (axios layer) → `services/` (domain calls) → `hooks/` (TanStack Query) → pages. Route trees: public (Phase 4), contributor (Phase 5), admin (Phase 6).

## 4. Client ↔ server contract

- REST under `/api/v1`, JSON only; file uploads via `multipart/form-data`.
- **Response envelope** (both directions always):
  - success: `{ success: true, data, meta? }`
  - error: `{ success: false, error: { code, message, fields? } }`
  - Error `code` is a stable enum (`ERROR_CODES` in shared) — the SPA maps codes to UI states, never raw messages.
- Dev networking: Vite proxies `/api` → `:4000`, making the SPA and API same-origin — cookies work without CORS friction. Production may set `VITE_API_URL` for a separate API domain.

## 5. Authentication & authorization (design, implemented Phase 3)

- Argon2id password hashing.
- Short-lived access token (JWT, ~15 min) held in memory only; never in localStorage.
- Refresh token (~30 d) in `HttpOnly; Secure; SameSite=Lax` cookie, stored hashed in `refresh_tokens`, rotated on every use within a token **family**; presenting an already-rotated token revokes the family (reuse detection).
- Three enforcement layers: route middleware (`requireAuth`, `requireRole`) → service-layer policy (club membership re-verified on every contributor call) → repository guarantees (public repositories structurally cannot return unpublished content).
- CSRF protection on cookie-based auth endpoints (double-submit pattern).

## 6. Media pipeline (design, implemented Phase 5)

- Upload once via API (Multer → MIME magic-byte validation → S3-compatible storage). Originals are immutable and never overwritten.
- On approval, background job generates derivatives with `sharp`: thumb (400px), card (900px), display (1600px webp), plus first-page raster preview for PDFs.
- Public delivery of derivatives via signed URLs or CDN; originals never exposed publicly.

## 7. Search (design, implemented Phase 7)

PostgreSQL full-text search: generated `tsvector` column over title/description/caption/people with weighted A > B > C, queried via `websearch_to_tsquery`, combined with structured filters (club, person, year, decade, event, category, content type). Only `status = 'PUBLISHED' AND deletedAt IS NULL` rows are searchable — enforced inside a single `publicArchiveRepository` used by all public routes.

## 8. Historical data model principles

- Dates are modelled as `datePrecision` (`EXACT | YEAR | RANGE | UNKNOWN`) + optional `yearFrom`/`yearTo` — never fabricated dates.
- People ↔ archive items is many-to-many with a `confidence` flag (`PROPOSED | CONFIRMED`) supporting historically corrected labels.
- People ↔ clubs is many-to-many with roles and year ranges.
- Full schema: see `docs/DATABASE_SCHEMA.md` (written in Phase 3 alongside the Prisma schema).

## 9. Key decisions log

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | SPA + REST (no SSR) | Archive + dashboards; SEO handled via meta/sitemap, revisit if analytics demand | Phase 1 |
| 2 | npm workspaces monorepo with shared Zod package | Zero schema drift between form validation and API validation | Phase 1 |
| 3 | Role enum (ADMIN/CONTRIBUTOR) + `user_clubs` table | Three fixed roles don't need a roles table; club access is the real authorization axis | Phase 1 |
| 4 | Access token in memory, refresh in HttpOnly cookie | XSS-safe; CSRF handled for cookie endpoints only | Phase 1 |
| 5 | Embedded PostgreSQL fallback for dev environments without Docker | This dev machine has no Docker and no sudo; embedded-postgres runs user-space | Phase 2 |
| 6 | Self-hosted fonts via @fontsource | Visual fidelity + privacy/GDPR; no runtime Google Fonts | Phase 2 |

## 10. Technical risks

See Phase 1 plan (risk table) — top items: upload abuse on public forms (mitigated with rate limits + magic-byte validation), refresh rotation correctness (dedicated tests in Phase 3), never inventing historical facts (schema-level `UNKNOWN` dates + sample data flags).

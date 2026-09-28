# ADR 0004: API in NestJS + Python sidecar for AI jobs

- **Status:** Accepted (2026-09-28)
- **Context:** The API carries 20+ features including exact money logic; AI photo/text checks need Python tooling.
- **Decision:** Standalone NestJS project (`apps/api`, NOT Next.js API routes) for all domain logic, plus a small Python sidecar for AI jobs.
- **Consequences:** Organized, typed money code; borrow (don't rebuild) AI tooling. Must verify Better Auth ↔ NestJS integration in Phase 0.

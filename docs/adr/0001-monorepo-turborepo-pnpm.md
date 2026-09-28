# ADR 0001: TypeScript monorepo (Turborepo + pnpm)

- **Status:** Accepted (2026-09-28)
- **Context:** Web, mobile, and API must agree exactly on money (escrow), order states, and roles. Three separate repos invite drift.
- **Decision:** One TypeScript monorepo managed with Turborepo + pnpm. Shared types and design tokens live in `packages/`.
- **Consequences:** One clone, one language, shared contracts. Slower first setup; faster everything after.

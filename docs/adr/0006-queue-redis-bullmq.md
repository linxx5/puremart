# ADR 0006: Redis + BullMQ for background jobs

- **Status:** Accepted (2026-09-28)
- **Context:** AI checks, notifications, score recomputation, and escrow releases must not block customers and must survive crashes.
- **Decision:** Redis as the job list + BullMQ as the worker (TypeScript, same language as the API).
- **Consequences:** Crash-safe, self-retrying, scheduled jobs built in. Cheap to run for years.

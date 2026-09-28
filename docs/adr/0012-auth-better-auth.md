# ADR 0012: Better Auth, self-hosted

- **Status:** Accepted (2026-09-28)
- **Context:** Login must work for every Nigerian user (phone-first), cost nothing per user, and stay under our control.
- **Decision:** Better Auth, self-hosted inside the NestJS API with sessions in our PostgreSQL. Phone-OTP login via Termii, email + password reset as backup, passkeys later.
- **Consequences:** Tested security without per-user rent. NestJS integration is community-driven — verify it in Phase 0 before building on it (see Phase 2 scope).

# ADR 0005: PostgreSQL self-hosted on local device

- **Status:** Accepted (2026-09-28)
- **Context:** Orders, escrow ledger, and disputes are relational. Hosting stays on the local device for now.
- **Decision:** Self-hosted PostgreSQL (via Docker Compose per environment). Automated daily backups stored off-device with tested restores.
- **Consequences:** Full control, no cloud bill. Power/hardware failure is our problem — backups and containerization (cloud-portable migrations) are mandatory.

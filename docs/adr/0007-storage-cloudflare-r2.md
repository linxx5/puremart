# ADR 0007: Cloudflare R2 for file storage

- **Status:** Accepted (2026-09-28)
- **Context:** Product photos, seller IDs, and dispute evidence need private-by-default storage with fast viewing and no viewing fees.
- **Decision:** Cloudflare R2 (S3-compatible). Rules: (a) product photos public, compressed, multiple sizes; (b) seller IDs + dispute evidence private with short-lived links, deletable on request; (c) cross-region backup from day one.
- **Consequences:** Near-zero viewing costs, no vendor lock-in (S3 standard), evidence survives disputes.

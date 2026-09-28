# ADR 0010: Hosting on local device (no cloud)

- **Status:** Accepted (2026-09-28)
- **Context:** Keep costs at zero and hardware under our control during build and pilot.
- **Decision:** Host on the local device. Docker Compose isolates dev/staging/prod. A temporary tunnel serves as the test-run webhook endpoint (production-grade endpoints deferred to Phase 9).
- **Consequences:** Zero hosting bill, full control. Power/network/hardware fragility must be offset with UPS, off-device backups, and fully containerized services so a future cloud move is a redeploy, not a rewrite.

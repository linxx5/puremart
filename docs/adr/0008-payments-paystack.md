# ADR 0008: Paystack for payments

- **Status:** Accepted (2026-09-28)
- **Context:** Nigerian buyers pay by card and transfer; escrow needs reliable pay-in, payout, and webhook confirmation.
- **Decision:** Paystack for collections, seller payouts, and webhooks. Escrow modeled as a platform-held ledger + dedicated settlement account (append-only entries, never mutated balances).
- **Consequences:** Local coverage and deliverability. Legal review of holding buyer funds is a Phase 5 gate. Test keys + tunnel for Phase 0 test runs.

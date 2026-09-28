# ADR 0011: Hosted vision + LLM APIs behind internal review service

- **Status:** Accepted (2026-09-28)
- **Context:** Every listing needs photo + text safety screening from day one; training our own models is a chicken-and-egg problem.
- **Decision:** Rent eyes (vision) and brain (LLM) via hosted APIs, called only from our internal review service (Python sidecar). AI outputs reasons and a verdict of Passed / Under Review / Rejected — it can never approve or reject on its own. Admin decides.
- **Consequences:** Screening works on day one, costs scale with usage, suppliers stay swappable. Measure flag accuracy from Phase 3; store every verdict as future training data.

# Puremart — Implementation Plan

Companion to [`Puremart.md`](./Puremart.md) (PRD v1.3). Work is divided into sequenced phases. Every phase lists **scope, concrete outputs, dependencies, and exit criteria** — a phase is only done when all its outputs exist and its exit criteria pass.

**Proposed timeline:** ~24–28 weeks with a team of 2 frontend, 2 backend, 1 designer, 1 QA, 1 PM/founder (part-time AI/ML support from Phase 5).

---

## Phase 0 — Foundations & Architectural Decisions (Weeks 1–2)

Decide the stack once, document it, and set up the engineering backbone before any feature work.

### Proposed architecture (to confirm in ADRs)

| Area | Recommendation | Rationale |
|---|---|---|
| Monorepo | TypeScript monorepo (Turborepo + pnpm) | One repo, shared types between web, mobile, API |
| Web app | Next.js (storefront + admin) | SEO for product pages, fast iteration |
| Mobile app | Expo React Native, shared design tokens with web | Android dominates the market; one team ships both |
| API | NestJS (Node) + Python sidecar for AI jobs | Typed CRUD velocity + Python for image/text models |
| Database | PostgreSQL (row-level multitenancy ready) | Relational fit for orders, escrow ledger, disputes |
| Queue/jobs | Redis + BullMQ | AI checks, notifications, score recomputation |
| File storage | S3-compatible (product images, dispute evidence) | Signed uploads, lifecycle rules |
| Payments | Paystack (cards, transfers, webhooks) | Nigerian coverage; escrow modeled as platform-held ledger + dedicated settlement account |
| Comms | Termii or Africa's Talking (SMS), WhatsApp Business API, email + push | Matches PRD notification channels |
| Hosting | Managed containers (AWS ECS / Render) + managed Postgres/Redis | Small-team operability |
| AI | Hosted vision + LLM APIs behind an internal review service | No model training in v1; AI flags, human decides |

### Scope

- Write ADRs (Architecture Decision Records) for each row above.
- Repo scaffolding, environments (dev/staging/prod), CI/CD with automated tests and preview deploys.
- Baseline observability (logs, errors, uptime) and secret management.

### Concrete outputs

- [ ] `docs/adr/` with one ADR per decision above (status: proposed/accepted)
- [ ] Monorepo scaffold building locally and in CI
- [ ] CI pipeline green: lint + typecheck + unit tests + preview deploy
- [ ] Three environments live with health-check endpoints
- [ ] Staging Paystack test keys wired; webhook receiver skeleton returning 200

### Exit criteria

New engineer can clone, run one command, and open the app against dev backend in under 30 minutes.

---

## Phase 1 — Design System (Weeks 2–5, overlaps Phase 0)

No screens before the system. Everything later is composed from these primitives.

### Scope

- Brand tokens: color, type, spacing, radius, elevation (light mode first, dark-mode-ready tokens).
- Component library in Figma **and** code, with parity checks.
- Marketplace-specific components: Verified Seller badge, PureTrust score chip, safety status pills (Passed / Under Review / Rejected), escrow state banner, delivery timeline, price/MOQ block, star rating input.

### Concrete outputs

- [ ] Figma library v1 (tokens + 30+ components, documented variants)
- [ ] Code component library with Storybook deployed (same 30+ components)
- [ ] Tokens package consumed by web and mobile (`@puremart/tokens`)
- [ ] Accessibility baseline: keyboard navigable, contrast-checked, screen-reader labels on all interactive components
- [ ] Empty/loading/error states defined for every data component

### Exit criteria

Designer and engineer can each build the same product card independently and the results are pixel-identical.

---

## Phase 2 — Identity, Roles & Seller Verification (Weeks 5–8)

### Scope

- Auth: email + phone OTP (SMS), sessions, password reset.
- Three roles: Buyer, Seller (retail/wholesale modes on one account), Admin — per PRD Section 4.
- Seller verification flow: document submission → admin review → Verified badge (PRD Sections 4–5).

### Concrete outputs

- [ ] Sign-up/login with phone OTP; role selection at onboarding
- [ ] Seller verification application (identity, business info, contact, address, registration upload)
- [ ] Admin approval queue: approve / reject / request-more-information with reasons
- [ ] Verified Seller badge visible on storefront wherever sellers appear
- [ ] Audit log of every verification decision (who, what, when)

### Exit criteria

A test seller can register, get verified, and see the badge; a test buyer can register and browse — all on staging.

---

## Phase 3 — Catalog & AI Product Safety (Weeks 8–12)

### Scope

- Admin-managed categories with ON/OFF toggles (PRD Section 6).
- Seller product listings: images, descriptions, brand, ingredients, expiry, certifications, pricing.
- AI safety pipeline: image + text checks → Passed / Under Review / Rejected → admin final decision (PRD Section 7).
- Risk-tiered approval: low-risk fast track, medium AI+admin, high-risk mandatory admin (PRD Section 8).

### Concrete outputs

- [ ] Category CRUD + ON/OFF toggle (admin), enforced on storefront
- [ ] Listing CRUD with image upload, validation, and drafts
- [ ] `safety-service`: checks images, text, brand, ingredients, expiry, certifications, price anomalies, seller history, complaints, duplicates (PRD checklist §7)
- [ ] Safety status on every listing; Under Review listings hidden until decided
- [ ] Admin review UI: AI reasons per flag, approve / reject / suspend / request-info
- [ ] Duplicate/counterfeit detector (perceptual image hash + text similarity) wired into the pipeline

### Exit criteria

A flagged listing (e.g., no certification on a health product) is auto-held, shows AI reasons to admin, and cannot be bought until approved.

---

## Phase 4 — Buying: Search, Cart, Wholesale (Weeks 12–15)

### Scope

- Search, compare, product pages, cart, retail/wholesale quantity selection (PRD Section 9).
- Wholesale mechanics: MOQs, carton prices, bulk discounts, negotiation + custom quotations (PRD Section 17).

### Concrete outputs

- [ ] Search with filters (category, price, verified-only, wholesale-available)
- [ ] Product page: safety signals, seller badge + PureTrust score, retail/wholesale price tiers
- [ ] Cart supporting mixed retail + wholesale lines with MOQ enforcement
- [ ] Quotation flow: buyer requests → seller quotes → buyer accepts → converts to order
- [ ] Checkout skeleton (shipping + totals) ready for Phase 5 payment hookup

### Exit criteria

Adaeze's journey steps 1–2 and Musa's journey steps 1–2 are clickable end-to-end on staging.

---

## Phase 5 — Escrow Payments (Weeks 15–19) ⚠️ Highest risk

### Scope

- Paystack pay-in, platform-held escrow ledger, release rules: buyer confirm OR protection expiry OR dispute resolution (PRD Section 10).
- Flexible holds: fast retail release, longer high-value protection, wholesale inspection period.
- Refunds: full / partial, wired to dispute outcomes (PRD Section 14).

### Concrete outputs

- [ ] Escrow state machine: `held → released | refunded | split`, with every transition journaled in an append-only ledger
- [ ] Paystack integration: collections, transfers/payouts to sellers, idempotent webhook handlers
- [ ] Release scheduler: protection windows per order type; expiry auto-release job
- [ ] Buyer "confirm delivery" action; seller payout dashboard with pending/available balances
- [ ] Daily reconciliation report (ledger vs Paystack settlements); mismatch alerts
- [ ] **Compliance note signed off**: legal review of holding buyer funds (license/partner-bank requirements) before mainnet launch

### Exit criteria

On staging with test keys: pay → hold → confirm → seller payout, plus expiry auto-release and a partial refund — all reconciling to zero.

---

## Phase 6 — Delivery Tracking & Notifications (Weeks 18–21, overlaps Phase 5)

### Scope

- Seller-managed + Puremart-approved logistics partners (PRD Section 11).
- Eight-state tracking timeline; notifications across app, SMS, email, WhatsApp (PRD Section 12).

### Concrete outputs

- [ ] Shipment model with the 8 PRD states and valid-transition enforcement
- [ ] Buyer tracking timeline UI (real-time updates)
- [ ] Logistics partner interface (assign, accept, update status) + manual seller updates
- [ ] Notification service: templated order/payment/delivery/approval/dispute/promo events across all four channels, with user preferences
- [ ] Delivery confirmation handshake feeding escrow release (Phase 5)

### Exit criteria

An order can be tracked through all 8 states with a notification firing at each transition.

---

## Phase 7 — Disputes, Reviews & PureTrust (Weeks 21–24)

### Scope

- Disputes on all orders: photo/video evidence, seller response, admin decision, escrow execution (PRD Sections 13–14).
- Ratings (product/seller/delivery) feeding the PureTrust score (PRD Sections 15–16).

### Concrete outputs

- [ ] Dispute filing with evidence upload; seller response window with SLA timers
- [ ] Admin resolution console: side-by-side evidence, outcome picker (full/partial refund, replacement, return+refund, release to seller, settlement)
- [ ] Outcomes auto-executed against escrow (calls Phase 5 ledger, never manual transfers)
- [ ] Rating flows post-delivery; PureTrust engine (deliveries, complaints, quality, ratings, verification level) recomputed on a schedule
- [ ] Abuse guards: fake-review detection, dispute-rate alerts on sellers

### Exit criteria

Blessing's full journey (flag → review → dispute → escrow execution with audit trail) works on staging without engineer intervention.

---

## Phase 8 — AI Commerce & Admin Dashboard (Weeks 23–26, overlaps Phase 7)

### Scope

- Smart search ("Best toothpaste under ₦5,000"), recommendations (similar/bulk/trusted), fraud detection (PRD Section 18).
- Full admin dashboard: users, products, disputes, approvals, reports, AI alerts, escrow (PRD Section 19).

### Concrete outputs

- [ ] Natural-language search parsing budget + intent over the catalog
- [ ] Recommendation widgets (similar products, bulk options, trusted sellers)
- [ ] Fraud signals: fake accounts, fraudulent buyers, suspicious sellers → admin alerts
- [ ] Admin dashboard with reports (GMV, disputes, safety stats, escrow exposure)
- [ ] Feature-flag framework for phased rollouts

### Exit criteria

Admin can run the marketplace from the dashboard alone; AI features behind flags, measurable (CTR, dispute-rate deltas).

---

## Phase 9 — Hardening, Pilot & Launch (Weeks 26–28+)

### Scope

- Security, performance, financial correctness, then a live pilot with real Musa-type sellers before public launch.

### Concrete outputs

- [ ] Security: auth review, PII handling, upload scanning, rate limiting, third-party pen test with remediated criticals
- [ ] Performance: load test to 10x pilot traffic; image CDN; slow-query pass
- [ ] Financial: escrow reconciliation runbook, payout failure handling, incident playbook for stuck funds
- [ ] Pilot: 20–50 real sellers, concierge onboarding, weekly metric review (conversion, dispute rate, delivery times, NPS)
- [ ] Launch checklist signed: legal (terms, returns, privacy), support staffing, App Store/Play listings

### Exit criteria

Pilot dispute rate and payout accuracy within agreed thresholds; go/no-go signed by founder.

---

## Phase 10 — Future (parked, per PRD Section 21)

Puremart Verified Products, warehouse/fulfillment, international trade, business loans, AI shopping assistant. Each gets its own phased plan only after Phase 9 metrics justify it.

---

## Cross-cutting requirements (apply to all phases)

- Double-entry-style money handling: never mutate balances, only append ledger entries.
- Every admin action is attributed and auditable.
- Phone-first, low-bandwidth-tolerant UI; images lazy and compressed.
- English first; architecture ready for additional languages.

## Milestone summary

| Milestone | Phases | Signal |
|---|---|---|
| M1 Buildable | 0–1 | CI green, design system live in Storybook |
| M2 Sellable | 2–4 | Verified seller lists a product a buyer can order (no real money) |
| M3 Money-safe | 5–6 | Real-money escrow + tracking reconciles end-to-end |
| M4 Trustworthy | 7–8 | Disputes resolve through the system; PureTrust live |
| M5 Launchable | 9 | Pilot metrics pass go/no-go |

## Top risks

1. **Escrow compliance** — holding buyer funds may require licensing or a partner bank/MFB. Legal review is a Phase 5 gate, not an afterthought.
2. **Logistics reliability** — tracking is only as good as partner updates; design manual fallbacks from day one.
3. **AI precision** — false flags erode seller trust; keep humans decisive and measure flag accuracy from Phase 3.
4. **Dispute load** — staffing model for Blessing's team must scale with GMV, not headcount hopes.

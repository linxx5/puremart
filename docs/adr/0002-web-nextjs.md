# ADR 0002: Web storefront + admin in Next.js

- **Status:** Accepted (2026-09-28)
- **Context:** Puremart needs Google-searchable product pages plus a team admin dashboard.
- **Decision:** Next.js hosts both storefront and admin in one project (`apps/web`).
- **Consequences:** Free search traffic, shared login/components between shop and admin. Plain React would lose the SEO advantage.

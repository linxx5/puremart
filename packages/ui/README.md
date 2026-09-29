# @puremart/ui

Marketplace component library. Every component reads its look from `@puremart/tokens` —
no hardcoded colors, radii, or type sizes.

## Accessibility baseline (enforced, not suggested)

- Real `<button>`, `<label>`, `<input>`, `<ol>` elements — never clickable divs.
- Every input has a label; errors use `role="alert"` and `aria-invalid`.
- Interactive stars are `radiogroup`/`radio`; read-only stars are `img` with a text label.
- Timeline marks the current step with `aria-current="step"`; status pills use `role="status"`.
- Focus is always visible (browser default outline preserved; inputs add a blue ring).
- Touch targets ≥ 40px; body text ≥ 14px with ink-on-white contrast.

## Components

Button, TextInput, SearchInput, VerifiedBadge, TrustScoreChip, SafetyPill,
EscrowBanner, DeliveryTimeline, PriceBlock, StarRating, ProductCard,
EmptyState, LoadingState, ErrorState.

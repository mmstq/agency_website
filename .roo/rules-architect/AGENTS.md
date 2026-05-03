# Architect Mode — Project Architecture Rules

## Non-Obvious Architecture Constraints

- **Single-page architecture** — currently only [`page.tsx`](../../src/app/page.tsx) exists. All content is on one page with a bento grid layout. New pages must be added as routes under `src/app/`.
- **`MasterLayout` wraps everything** — [`MasterLayout.tsx`](../../src/components/MasterLayout.tsx) composes [`CanvasGrid`](../../src/components/CanvasGrid.tsx) behind all content. New layouts must compose inside this, not replace it.
- **`GlassSurface` is the only card wrapper** — do NOT create alternative card containers. All major sections use [`GlassSurface.jsx`](../../src/components/GlassSurface.jsx) with consistent params.
- **Animation coupling** — [`AnalyticsCard.tsx`](../../src/components/AnalyticsCard.tsx) and [`FeatureCardsStack.tsx`](../../src/components/FeatureCardsStack.tsx) share the same RAF physics pattern (FAST_SPEED → SLOW_SPEED deceleration). Any new animated component must follow this pattern.
- **Static export limits** — [`next.config.ts`](../../next.config.ts:4) has `output: 'export'`. No `getServerSideProps`, no dynamic API routes, no `rewrites`/`redirects` that require a server. Netlify deploy from `out/`.
- **No routing library** — Next.js App Router is the only routing mechanism. No react-router.
- **`styled-jsx` SSR requirement** — [`registry.tsx`](../../src/app/registry.tsx) must wrap all pages. Missing registry = broken SSR styles.
- **`cursor: none` is global** — set on `<html>` in [`CanvasGrid.tsx`](../../src/components/CanvasGrid.tsx). Any component that needs a visible cursor on touch devices must feature-detect.
- **Nav links are dead** — [`Navbar.tsx`](../../src/components/Navbar.tsx:57) links to non-existent anchor IDs. Any new section/page must either create those anchors or update the nav.
- **Newsletter is a stub** — [`route.ts`](../../src/app/api/newsletter/route.ts) has no provider integration. Any production deployment needs a real email service.
- **`recharts` is unused** — available for chart components but currently dead weight in [`package.json`](../../package.json:19).
- **No test infrastructure** — no testing framework installed. Any new code is untested by default.
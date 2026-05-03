# Debug Mode — Project Debug Rules

## Non-Obvious Debugging Rules

- **RAF animations stop when not visible** — [`AnalyticsCard.tsx`](../../src/components/AnalyticsCard.tsx:64) and [`FeatureCardsStack.tsx`](../../src/components/FeatureCardsStack.tsx:67) cancel `requestAnimationFrame` when speed hits 0. If an animation isn't running, check hover state or speed refs.
- **Canvas cursor breaks touch devices** — [`CanvasGrid.tsx`](../../src/components/CanvasGrid.tsx) sets `cursor: none` on `<html>`. On touch devices, the cursor never appears. Check for feature detection (`'ontouchstart' in window`).
- **Newsletter API is a stub** — [`route.ts`](../../src/app/api/newsletter/route.ts:19) only `console.log`s emails. No provider wired. 200 response is fake.
- **Nav links go nowhere** — [`Navbar.tsx`](../../src/components/Navbar.tsx:57) anchor IDs (`#industries`, `#case-studies`, `#about`, `#blog`) don't exist on any page.
- **Static export kills server routes** — [`next.config.ts`](../../next.config.ts:4) has `output: 'export'`. API routes only work during `npm run dev`. Production build generates static HTML only.
- **`recharts` is dead weight** — installed in [`package.json`](../../package.json:19) but no component imports it. Safe to remove.
- **`styled-jsx` SSR** — [`registry.tsx`](../../src/app/registry.tsx) must wrap all pages. Missing registry causes styled-jsx styles to not render on server.
- **GlassSurface uses SVG filters** — [`GlassSurface.jsx`](../../src/components/GlassSurface.jsx) creates `<filter>` elements. If glass effect breaks, check browser SVG filter support.
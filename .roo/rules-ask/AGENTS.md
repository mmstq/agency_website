# Ask Mode — Project Documentation Context

## Non-Obvious Documentation Context

- **"Modall" is the agency name** — the project is a B2B agency website, not a product. See [`.planning/PROJECT.md`](../../.planning/PROJECT.md:1).
- **Design system is "Digital Monolith"** — defined in [`DESIGN.md`](../../DESIGN.md:5). Near-black (`#131313`), glassmorphism, Manrope/Inter, 24px radius, no 1px borders.
- **Animation decisions documented separately** — [`DESIGN_LOG.md`](../../DESIGN_LOG.md) covers AnalyticsCard physics; [`CURSOR_ANIMATION_DESIGN.md`](../../CURSOR_ANIMATION_DESIGN.md) covers CanvasGrid.
- **`src/components/` is flat** — no subdirectories except `ui/` for shadcn primitives. All custom components live at top level.
- **Only one page exists** — [`page.tsx`](../../src/app/page.tsx) is the home page. No about, services, portfolio, blog, or contact pages yet.
- **`recharts` is unused** — installed but no component imports it. [`package.json`](../../package.json:19).
- **Newsletter API is a stub** — [`route.ts`](../../src/app/api/newsletter/route.ts:19) logs to console only. No email provider wired.
- **Nav links are placeholder** — [`Navbar.tsx`](../../src/components/Navbar.tsx:57) anchor IDs don't exist.
- **`cursor: none` on `<html>`** — custom canvas cursor. Affects touch devices negatively.
- **Static export** — [`next.config.ts`](../../next.config.ts:4) has `output: 'export'`. Deployed to Netlify from `out/` directory.
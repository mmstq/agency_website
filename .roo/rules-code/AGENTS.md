# Code Mode — Project Coding Rules

## Non-Obvious Coding Rules

- **All card containers use `GlassSurface`** — do NOT create new card wrappers. Import from [`src/components/GlassSurface.jsx`](../../src/components/GlassSurface.jsx) with standard params: `borderRadius={24}`, `backgroundOpacity={0.08}`, `saturation={1.55}`, `distortionScale={-110}`.
- **Animations use `requestAnimationFrame` + `useRef` DOM mutation** — never `useState` for animation values (causes re-render stutter). See [`AnalyticsCard.tsx`](../../src/components/AnalyticsCard.tsx:36) for the physics pattern (FAST_SPEED → SLOW_SPEED deceleration).
- **`@base-ui/react` primitives** — shadcn/ui buttons and inputs use `@base-ui/react`, not Radix. See [`button.tsx`](../../src/components/ui/button.tsx:3), [`input.tsx`](../../src/components/ui/input.tsx:2).
- **`cn()` utility** — use `import { cn } from '@/lib/utils'` for conditional class merging (wraps `clsx` + `tailwind-merge`).
- **No 1px solid borders** — use background shifts or ghost borders (`border: 1px solid rgba(145, 145, 145, 0.1)`) per DESIGN.md "No-Line Rule".
- **Static export constraints** — [`next.config.ts`](../../next.config.ts:4) has `output: 'export'`. No `getServerSideProps`, no server-dependent API routes.
- **`cursor: none` on `<html>`** — custom canvas cursor in [`CanvasGrid.tsx`](../../src/components/CanvasGrid.tsx). Must feature-detect touch devices before applying.
- **New pages must be inside `<StyledJsxRegistry>`** — see [`registry.tsx`](../../src/app/registry.tsx) and [`layout.tsx`](../../src/app/layout.tsx:31).
- **Design tokens** — bg `#131313`, text `#e2e2e2`, Manrope for headings (`font-heading`), Inter for body (`font-sans`). All radii use `xl` (24px).
- **Icons** — use `lucide-react` (already installed).
- **Charts** — use `recharts` (already installed, currently unused).
- **No Framer Motion / Three.js** — all motion uses RAF + CSS only.
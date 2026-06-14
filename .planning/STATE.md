# State: Modall Agency Website

## Current Position

**Date:** 2026-06-14
**Milestone:** v1.0 Agency Website — Fully Functional (most scope landed)
**Working on right now:** Reskinned `/privacy` to match site design language (was generic). No feature work in flight.
**Next likely:** Apply same treatment to `/terms` (visual twin) · wire newsletter to a real provider · add `robots.txt` · resolve contact-form submission backend.

## Most Recent Work (newest first)

- 2026-06-14 — Reskinned `/privacy` to feel native: animated `SplitText` hero (matches contact), per-section `ScrollReveal`, numbered left-rail layout. Design only; legal copy unchanged. `/terms` is the still-generic twin.
- 2026-06-13 — Replaced WaveGrid with `BubbleField`; added legal (`/privacy`, `/terms`) + `sitemap.ts`; refactored `CanvasGrid` for footer sync; refined `SplitText` layout; device streaming config + Galaxy Tab S10+
- 2026-06-07 — Viewport-locked layout for single-project portfolio views; `FannedDeck` height-based scaling; modular `showcase-variants/` with staggered scroll animations
- 2026-05-25 — Integrated GSAP `SplitText`; removed LiquidCursor (fixed touch `cursor:none` bug); simplified `CanvasGrid`; refined portfolio nav logic
- 2026-05-07 — Portfolio page overhaul: project marquee + employer assets + visual polish
- 2026-05-03 — Comprehensive site layout, navigation, and core feature sections with page routing

## Project Reference

- **Stable knowledge:** [PROJECT.md](PROJECT.md)
- **Full status board:** [PROGRESS.md](PROGRESS.md)
- **Design spec:** [../DESIGN.md](../DESIGN.md)

**Core value:** A production-ready agency website that converts high-value B2B leads through premium design and complete content across all key pages.

## Accumulated Context (gotchas)

- Next.js 16 App Router, **static export** (`output: 'export'`) — no server routes; forms/newsletter need 3rd-party or serverless endpoints
- "Digital Monolith" design system in DESIGN.md — follow exactly for all new work
- Animations: RAF + `useRef` DOM mutation + CSS only. No Framer Motion / Three.js. GSAP only for `SplitText`
- `GlassSurface` is the universal card wrapper — don't create new card wrappers
- Scroll reveals must re-trigger on every viewport entry (never `unobserve` after first reveal); honor `prefers-reduced-motion`
- Newsletter API route is a stub (`console.log` only)
- `recharts` installed but unused — remove or use

---
*Update this file each working session: bump the date, move the "working on" line to "Most Recent Work," set the new focus.*

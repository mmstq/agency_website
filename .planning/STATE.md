# State: Modall Agency Website

## Current Position

**Date:** 2026-08-07
**Milestone:** v1.0 Agency Website — Fully Functional
**Working on right now:** Fixed excessive vertical gap between HomeCTA card and Footer.
**Next likely:** Replace placeholder social/contact links with real URLs · blog content decision.

## Most Recent Work (newest first)

- 2026-08-07 (footer spacing) — Resolved ~288px vertical gap above footer. Reduced `HomeCTA.tsx` section bottom padding (`py-24` → `pt-20 pb-4`), `Footer.tsx` top margin (`mt-20` → `mt-6 md:mt-10`), and `MasterLayout.tsx` main bottom padding (`pb-12` → `pb-0`). Verified layout balance via browser screenshot.
- 2026-08-07 (button design) — Converted "View all projects" button in [`ShowcaseHoverList.tsx`](src/components/showcase-variants/ShowcaseHoverList.tsx) and [`CaseStudyPreviewRow.tsx`](src/components/CaseStudyPreviewRow.tsx) to strictly align with website design system standards (`DESIGN.md` & `AGENTS.md`). Wrapped in `GlassSurface` (`borderRadius={999}`, `backgroundOpacity={0.20}`, `distortionScale={-95}`, `glass-surface--soft-hover`), featuring solid white fill (`bg-white text-[#1a1c1c]`), ambient glow shadow, hover background shift (`hover:bg-[#e2e2e2]`), `active:scale-95`, and directional arrow animation (`group-hover:-translate-y-0.5 group-hover:translate-x-1`). Verified via browser subagent.
- 2026-08-07 (navbar) — Added scroll-direction detection in [`Navbar.tsx`](src/components/Navbar.tsx). Navbar smoothly translates up (`-translate-y-28 opacity-0`) on scroll down past threshold, and reappears (`translate-y-0 opacity-100`) when scrolling up or at top of page. Keeps active during open mobile menu. Verified via browser automation.

- 2026-06-25 (ballpit) — Added [`Ballpit.jsx`](../src/components/Ballpit.jsx) (vendored React Bits, vanilla three.js) as a **full-screen** interactive background on `/404` — monochrome chrome spheres pile at the bottom, cursor pushes them around; `404`/copy/Return Home centered over the pit with a radial readability scrim. Footer hidden on this page only (scoped `<style>` since `MasterLayout` can't branch on the 404's arbitrary pathname; also zeroes `main` padding). NOTE: vendored physics advances position per-frame (not delta-scaled), so settle speed is frame-rate dependent — fine at 60fps (~1-2s), but headless SwiftShader is too slow to show the settled pile without a long wait. **Deliberate one-time exception to the no-Three.js rule** (user-approved; annotated in AGENTS.md). Installed `three`. Fixed a real shader bug for three 0.185: built-in `vColor` is now `vec4`, so the vendored SSS shader's `* vColor` → `* vColor.rgb` (was failing GLSL compile → blank in every browser). Verified static build + WebGL render via headless CDP. Also: the earlier-flagged untracked `reactbits-preview/` + `reactbits/` scratch were explored as a component preview and then **deleted** (user: "nothing looks good"); only Ballpit kept.

- 2026-06-25 (lint) — Cleared all 12 ESLint errors + 4 warnings → `npm run lint` exit 0, `npm run build` exit 0 (still fully static). Typed every `any` (LucideIcon, exported `ScrollRevealDelay`, GSAP SplitText types), removed dead vars/imports, and resolved 4 `set-state-in-effect` without behavior change (SplitText fonts→async `.then`; Testimonials type-on→local counter + cleanup reset; GlassSurface→justified `eslint-disable`, SSR-safe). 4-lens adversarial review: all pass, zero must-fixes. NOTE: found untracked `reactbits-preview/` + `reactbits/` leaking into the build (not mine — left in place, flagged).
- 2026-06-24 (contact form) — Wired `ContactForm` to **Web3Forms** (static-export-friendly): JSON POST to `api.web3forms.com/submit` with public access key, honeypot, `replyto`=submitter, distinct network/server error states, `role="status"`/`role="alert"` a11y, `name`/`autocomplete` attrs. Verified via a 4-lens adversarial workflow (live API-contract check, edge-cases, project-rules, build+lint) — all pass, no must-fixes. User must domain-lock the key in the Web3Forms dashboard (optional hardening).
- 2026-06-24 (cleanup) — Audit of "what's not done": deleted `privacy-preview/` scratch routes (were exporting to production `out/`) + dead `api/newsletter` stub (unreferenced, incompatible with static export); removed unused `recharts` dep; added `robots.ts` (`force-static`, mirrors sitemap BASE). Corrected stale board entry — hero has **no** email capture (CTA links only).
- 2026-06-24 — Reskinned `/terms` to match `/privacy`: animated `SplitText` hero (`perspective-1000`), per-section `ScrollReveal`, numbered left-rail (01–08 + 09 Contact). Design only; legal copy unchanged. Both legal twins now native.
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

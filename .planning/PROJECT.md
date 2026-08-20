# Falcons Agency Website

## What This Is

Falcons is a premium B2B technology-agency website for custom web applications, mobile products, AI integrations, SaaS, infrastructure, and security work. Its “Digital Monolith” aesthetic uses a near-black palette, glass surfaces, editorial typography, and restrained procedural motion to signal technical authority.

## Core Value

A credible, conversion-focused agency site that shows Falcons's capabilities and gives high-intent buyers a clear path to start a project.

## Current Milestone: v1.0 Launch Readiness

**Goal:** Finish visual acceptance, replace launch-blocking placeholder content, and validate the static site across its supported browser and interaction states.

**Status (2026-08-09):** All core routes, contact submission, navigation, legal pages, metadata, sitemap, robots, and static export are implemented. The latest Services 3D system and Portfolio interaction fixes are technically checked but still need final visual acceptance. Trust/content gaps remain in Contact/Footer links and Blog depth.

## Requirements

### Validated

- None formally validated by production traffic or conversion data yet.

### Active

- [x] Home, About, Services, Portfolio, Blog, Contact, Privacy, Terms, and 404 routes
- [x] Real navigation routes and service anchors
- [x] “Get started” and project CTAs route to `/contact`
- [x] Contact form submission through Web3Forms with honeypot and error states
- [x] Root metadata, Open Graph metadata, sitemap, and robots output
- [x] Static Netlify export from `out/`
- [~] Six Services procedural scenes implemented; final visual acceptance pending
- [~] Portfolio stack/deck and mobile gesture work implemented; final visual acceptance pending
- [~] Contact page implemented; verified social profiles are live, while Calendly/HQ destinations still need real details
- [~] Blog route implemented; content depth and source remain undecided
- [x] Replace Footer root social URLs with verified Falcons profiles
- [ ] Decide whether Case Studies remain inside Portfolio or gain dedicated routes
- [ ] Add browser-level regression coverage after interaction design stabilizes

### Out of Scope

- Runtime Next.js server, authentication, user accounts, payments, chat, or i18n
- CMS integration for v1.0; current content is static TypeScript/React content
- Newsletter capture unless it is explicitly reintroduced with a static-host-compatible provider
- Broad Three.js usage outside the approved 404 and Services scenes

## Current Architecture

- **Framework:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- **Rendering:** `output: 'export'`; `npm run build` emits `out/` for Netlify
- **Layout:** `src/app/layout.tsx` → `StyledJsxRegistry` → `MasterLayout`
- **Content:** static data in `src/lib/data/`
- **Forms:** client-side Web3Forms submission; no runtime application server
- **Motion:** CSS and RAF/ref mutation by default; GSAP SplitText for headline typography
- **Approved Three.js:** `/404` Ballpit and six isolated Services card scenes with fallbacks
- **Design authority:** [`DESIGN.md`](../DESIGN.md)

## Major Built Systems

- **Shared shell:** `Navbar`, `MasterLayout`, `Footer`, `CanvasGrid`, `BubbleField`
- **Home:** Hero, logo marquee, industries, process system, testimonials, portfolio preview, final CTA
- **Portfolio:** modular `showcase-variants/` views, stacked project stages, phone decks, touch/pointer galleries
- **Services:** six distinct procedural micro-scenes plus static mobile/non-WebGL sculptures
- **Animation:** `SplitText`, `ScrollReveal`, `use-scroll-animation`, RAF-driven cards and backgrounds
- **SEO/legal:** metadata, `sitemap.ts`, `robots.ts`, Privacy, Terms, and static 404

## Known Issues and Debt

- `ContactInfo` still contains placeholder `#` destinations for Calendly and Infrastructure HQ.
- The Web3Forms public key is intentionally client-visible; dashboard domain-lock status is not verified in-repo.
- Blog content is shallow and has no finalized content workflow.
- There is no automated test or browser-regression suite.
- Lint/build success is not visual acceptance for motion, touch, reduced-motion, or WebGL fallback states.

## Constraints

- Preserve static export compatibility; do not add request-dependent runtime handlers or Server Actions.
- Do not add Framer Motion or another general animation library.
- Approved Three.js scenes must pause off-screen, honor reduced motion, cap DPR, dispose resources, and render a non-WebGL fallback.
- Scroll reveals re-trigger on every viewport entry and reset on exit.
- Use the existing `GlassSurface` language and the no-line design rule for major containers.

## Key Decisions

| Decision | Outcome |
|----------|---------|
| Static export and Netlify `out/` deployment | Keeps hosting simple; runtime submissions use external services |
| RAF/ref mutation for interactive motion | Avoids frame-by-frame React state updates |
| Canvas for the global dot grid | Supports dense interaction without thousands of DOM nodes |
| GSAP SplitText for headline reveals | Provides per-word/character typography control |
| `BubbleField` replaced `WaveGrid` | Lighter ambient footer/background motion |
| Modular portfolio showcase variants | Shares project data and interaction patterns across views |
| Three.js limited to 404 and Services | Preserves performance and visual restraint while allowing approved 3D moments |
| Newsletter stub removed | Avoids shipping a dead server-dependent route in a static export |

## Document Roles

- Day-to-day handoff: [`STATE.md`](STATE.md)
- Route/feature status: [`PROGRESS.md`](PROGRESS.md)
- Visual rules: [`../DESIGN.md`](../DESIGN.md)
- Pre-implementation research: [`research/`](research/) — historical, not current state

---
*Last updated: 2026-08-09 — reconciled with the current routes, dependencies, and implementation.*

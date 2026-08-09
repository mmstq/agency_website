# Modall Agency Website

## What This Is

A high-end B2B agency website for "Modall," a tech infrastructure agency that builds custom web applications, mobile solutions, AI integrations, and SaaS products. The site uses a "Digital Monolith" aesthetic — near-black palette, glassmorphism, premium editorial typography — to convey technological authority to enterprise buyers.

## Core Value

A production-ready agency website that converts high-value B2B leads through premium design and complete content across all key pages.

## Current Milestone: v1.0 Agency Website — Fully Functional

**Goal:** Transform the single-page scaffold into a complete, production-ready agency website with all pages, sections, working interactions, SEO metadata, and mobile polish.

**Status (2026-06-14):** All core pages built and routed. Most v1.0 interactions and SEO landed. Remaining gaps: newsletter provider wiring, `robots.txt`, and contact-form submission backend (constrained by static export).

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None formally validated yet — site not yet live/measured.)

### Active

<!-- Current scope. Building toward these. -->

- [x] Home page completed with all sections (marquee, industries, process, testimonials, CTA, footer)
- [x] About, Services, Portfolio, Blog, Contact pages created
- [x] 404 page created (`not-found.tsx`)
- [x] Nav links resolve to real routes (`/`, `/services`, `/services#slug`, `/contact`)
- [x] OG tags + sitemap (`layout.tsx` metadata, `sitemap.ts`)
- [x] Cursor animation safe on touch/mobile (LiquidCursor removed; no `cursor:none`)
- [x] Legal pages: `/privacy`, `/terms`
- [~] Contact form built (UI complete); submission backend pending (static export — no server)
- [~] "Get started" CTA wired to `/contact` flow (verify all entry points)
- [ ] Newsletter wired to a real email provider (API route still `console.log` stub)
- [ ] `robots.txt` / `robots.ts`
- [ ] Dedicated Case Studies page (currently folded into Portfolio via `CaseStudyPreviewRow`)

### Out of Scope

- Real CMS / headless CMS integration — static content is sufficient for v1.0
- Authentication or user accounts — marketing site only
- E-commerce / payment flows — not an agency website concern
- Real-time chat widget — defer to v2
- Multi-language / i18n — English only for v1.0

## Context

**Stack:** Next.js 16 (App Router, `output: 'export'` static export), React 19, Tailwind v4, shadcn/ui (on `@base-ui/react`, not Radix), TypeScript. No Framer Motion; animation is normally RAF + `useRef` DOM mutation + CSS. Three.js is limited to the `/404` Ballpit and user-approved procedural service-card micro-scenes. GSAP is used for `SplitText` typography only.

**Design system:** [DESIGN.md](../DESIGN.md) defines the "Digital Monolith" system: `#131313` background, `#e2e2e2` text, Manrope (headings) / Inter (body), `xl` (24px) radius on all major containers, no 1px solid borders (ghost borders only at 10% opacity), glassmorphism via the universal `GlassSurface` wrapper.

**What's already built:**
- **Pages:** Home, About, Services, Portfolio, Blog, Contact, Privacy, Terms, 404
- **Navbar** — floating pill, desktop dropdown + mobile drawer; links now resolve to real routes
- **HeroSection** — glassmorphism hero with email capture + newsletter API stub
- **Bento cards** — `VideoCard` (demo video), `FeatureCardsStack` (spinning ecosystem rings), `AnalyticsCard` (spinning donut rings)
- **Home sections** — `LogoMarquee`, `IndustriesSection`/`IndustriesTicker`, `ProcessSection`, `TestimonialsSection`, `CaseStudyPreviewRow`, `HomeCTA`, `Footer`
- **Portfolio showcase system** — modular `showcase-variants/` (`PortfolioView`, `PortfolioSingle`, `ShowcaseHoverList`, `StackScaleBack`) with staggered scroll animations and viewport-locked single-project views
- **Backgrounds** — `CanvasGrid` (interactive dot grid w/ repulsion physics, footer-synced) + `BubbleField` (ambient animation, replaced WaveGrid)
- **Typography/animation primitives** — `SplitText` (GSAP), `ScrollReveal` + `use-scroll-animation` (re-triggering reveals)
- **MasterLayout** composing backgrounds behind all pages

**Known issues / debt:**
- Newsletter API logs to console only — no provider wired
- Contact form has no submission backend (static export constraint — needs a 3rd-party form endpoint or serverless function)
- `robots.txt` not yet present (sitemap + OG are done)
- `recharts` listed in `package.json` but unused — remove or use
- AGENTS.md historically said "nav links are broken" — now fixed (corrected in AGENTS.md)

## Constraints

- **Tech stack**: Next.js App Router + Tailwind v4 + shadcn/ui — no breaking changes, no new heavy deps
- **Performance**: No Framer Motion. Three.js is restricted to approved isolated scenes with lazy loading, capped DPR, off-screen pausing, reduced-motion handling, and static fallbacks; all other animation stays RAF/CSS (GSAP only for SplitText).
- **Design**: All new pages/sections must follow DESIGN.md "Digital Monolith" spec exactly
- **Export**: Must remain compatible with static export (`output: 'export'`) — no server-only features

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| RAF for all interactive animations | Bypasses React re-renders; guarantees 60fps for spinning rings and dot grid | ✓ Good |
| HTML5 Canvas for dot grid | 3000+ DOM nodes would tank framerate; canvas gives precise mathematical control | ✓ Good |
| `cursor: none` + custom LiquidCursor | Unified premium cursor experience | ✗ Reverted — broke touch devices; LiquidCursor removed (2026-05-25) |
| GSAP `SplitText` for headline typography | Per-char/word reveal control beyond CSS; replaced earlier `WordReveal` | ✓ Good |
| `BubbleField` replaces `WaveGrid` | Lighter, better-fitting ambient background animation | ✓ Good |
| Modular `showcase-variants/` for portfolio | Reusable showcase layouts shared between home + portfolio; viewport-locked single views | ✓ Good |
| Static export | No server needed for marketing site; cheaper, faster, simpler | ✓ Good — but constrains forms/newsletter to 3rd-party endpoints |
| Procedural Three.js service micro-scenes | Give service cards distinctive depth without model downloads or replacing the editorial layout | 🟡 Six distinct card scenes implemented; awaiting final visual acceptance |

## Evolution

This document holds stable, whole-project knowledge. It evolves at milestone/feature boundaries, not every session.

- **Day-to-day "what I'm doing right now"** lives in [STATE.md](STATE.md).
- **Full page/feature status board** (done / in-progress / not-started) lives in [PROGRESS.md](PROGRESS.md).

When a requirement is invalidated → move to Out of Scope with reason. When validated → move to Validated. When a new architectural decision is made → add to Key Decisions.

---
*Last updated: 2026-06-14 — backfilled from git history (work through 2026-06-13) after worklog system set up.*

# Progress: Modall Agency Website — Status Board

> Full website state — what's done, what's in progress, what's left, at what stage.
> Legend: ✅ done · 🟡 partial / needs polish · ⬜ not started · ❌ removed/reverted
>
> Stable knowledge → [PROJECT.md](PROJECT.md) · Current session → [STATE.md](STATE.md)
> Last reconciled with git: **2026-06-14** (covers work through 2026-06-13).

## Pages / Routes

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/` Home | `src/app/page.tsx` | ✅ | All sections present |
| `/about` | `src/app/about/page.tsx` | ✅ | |
| `/services` | `src/app/services/page.tsx` | ✅ | Anchored sub-sections (`/services#slug`) |
| `/portfolio` | `src/app/portfolio/page.tsx` | ✅ | Marquee + showcase variants + single-project views |
| `/blog` | `src/app/blog/page.tsx` | 🟡 | Page exists; content depth TBD (no CMS — static) |
| `/contact` | `src/app/contact/page.tsx` | 🟡 | UI done (`ContactForm` + `ContactInfo`); submission backend pending |
| `/privacy` | `src/app/privacy/page.tsx` | ✅ | Added 2026-06-13 |
| `/terms` | `src/app/terms/page.tsx` | ✅ | Added 2026-06-13 |
| 404 | `src/app/not-found.tsx` | ✅ | |
| Case Studies | — | ⬜ | No dedicated route; folded into Portfolio via `CaseStudyPreviewRow` |

## Features / Interactions

| Feature | Status | Notes |
|---------|--------|-------|
| Navbar (pill + dropdown + mobile drawer) | ✅ | Links resolve to real routes |
| Nav links resolve | ✅ | Was broken (anchor-only); fixed |
| Hero email capture | 🟡 | UI works; posts to stub API |
| Newsletter provider | ⬜ | `api/newsletter/route.ts` is `console.log` only |
| Contact form submission | ⬜ | Static export — needs 3rd-party form endpoint or serverless fn |
| "Get started" CTA wiring | 🟡 | Routes to `/contact`; verify every entry point |
| Scroll-reveal animations (re-triggering) | ✅ | `ScrollReveal` + `use-scroll-animation`; honors reduced-motion |

## SEO / Meta

| Item | Status | Notes |
|------|--------|-------|
| OG tags / metadata | ✅ | `layout.tsx` — `metadataBase`, title template, description, openGraph |
| `sitemap.ts` | ✅ | Added 2026-06-13 |
| `robots.txt` / `robots.ts` | ⬜ | Missing |

## Components (built)

- **Backgrounds:** `CanvasGrid` (dot grid, footer-synced), `BubbleField` (ambient — replaced WaveGrid ❌)
- **Cards/bento:** `VideoCard`, `FeatureCardsStack`, `AnalyticsCard`, `GlassSurface` (universal wrapper)
- **Home sections:** `HeroSection`, `LogoMarquee`, `IndustriesSection`, `IndustriesTicker`, `ProcessSection`, `TestimonialsSection`, `CaseStudyPreviewRow`, `HomeCTA`, `Footer`
- **Portfolio showcase (`showcase-variants/`):** `PortfolioView`, `PortfolioSingle`, `ShowcaseHoverList`, `StackScaleBack`, `portfolioShared`, `projectVisuals`, `ProjectScreenshotMarquee`
- **Typography/animation:** `SplitText` (GSAP), `ScrollReveal`, `use-scroll-animation`
- **Layout/nav:** `MasterLayout`, `Navbar`
- **Forms:** `ContactForm`, `ContactInfo`
- **UI primitives (`ui/`):** `button`, `card`, `input` (on `@base-ui/react`)
- **Removed:** ❌ `LiquidCursor` (2026-05-25), ❌ `WordReveal` (superseded by SplitText), ❌ `WaveGrid` (→ BubbleField)

## Tech Debt

- ⬜ Remove or use `recharts` (unused dependency)
- 🟡 Blog needs real content / decision on content source (no CMS in v1.0 scope)
- ⬜ Keep AGENTS.md "Non-Obvious Rules" in sync as code evolves (nav-links rule was stale)

## Suggested Next Steps (not committed)

1. Wire newsletter + contact form to a static-export-friendly endpoint (e.g. form service or serverless function).
2. Add `robots.ts`.
3. Decide Case Studies: dedicated page vs. keep in Portfolio.
4. Remove `recharts` if still unused.

---
*Update this board whenever a page/feature changes state. Keep the "Last reconciled with git" date current.*

# Progress: Modall Agency Website — Status Board

> Full website state — what's done, what's in progress, what's left, at what stage.
> Legend: ✅ done · 🟡 partial / needs polish · ⬜ not started · ❌ removed/reverted
>
> Stable knowledge → [PROJECT.md](PROJECT.md) · Current session → [STATE.md](STATE.md)
> Last reconciled with git: **2026-08-09** (process-section 3D monolith).

## Pages / Routes

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/` Home | `src/app/page.tsx` | ✅ | All sections present |
| `/about` | `src/app/about/page.tsx` | ✅ | |
| `/services` | `src/app/services/page.tsx` | 🟡 | Anchored cards intact; complete six-card procedural 3D system implemented and awaiting visual acceptance |
| `/portfolio` | `src/app/portfolio/page.tsx` | ✅ | Marquee + showcase variants + single-project views |
| `/blog` | `src/app/blog/page.tsx` | 🟡 | Page exists; content depth TBD (no CMS — static) |
| `/contact` | `src/app/contact/page.tsx` | 🟡 | UI done (`ContactForm` + `ContactInfo`); submission backend pending |
| `/privacy` | `src/app/privacy/page.tsx` | ✅ | Added 2026-06-13 |
| `/terms` | `src/app/terms/page.tsx` | ✅ | Added 2026-06-13; reskinned to match `/privacy` 2026-06-24 |
| 404 | `src/app/not-found.tsx` | ✅ | Interactive 3D `Ballpit` toy added 2026-06-25 (only three.js use on the site) |
| Case Studies | — | ⬜ | No dedicated route; folded into Portfolio via `CaseStudyPreviewRow` |

## Features / Interactions

| Feature | Status | Notes |
|---------|--------|-------|
| Navbar (pill + dropdown + mobile drawer) | ✅ | Links resolve to real routes |
| Nav links resolve | ✅ | Was broken (anchor-only); fixed |
| Hero email capture | ❌ | No email capture exists — hero has CTA links only (`#case-studies`, `/services`). Board entry was stale. |
| Newsletter provider | ❌ | Descoped — dead `api/newsletter` stub deleted 2026-06-24 (unreferenced + incompatible with static export). Re-add UI + provider if newsletter is ever wanted. |
| Contact form submission | ✅ | Wired to Web3Forms 2026-06-24 (public key, honeypot, `replyto`, network/server error states). Build+lint clean; 4-lens adversarial review passed. |
| "Get started" CTA wiring | 🟡 | Routes to `/contact`; verify every entry point |
| Scroll-reveal animations (re-triggering) | ✅ | `ScrollReveal` + `use-scroll-animation`; honors reduced-motion |

## SEO / Meta

| Item | Status | Notes |
|------|--------|-------|
| OG tags / metadata | ✅ | `layout.tsx` — `metadataBase`, title template, description, openGraph |
| `sitemap.ts` | ✅ | Added 2026-06-13 |
| `robots.txt` / `robots.ts` | ✅ | Added 2026-06-24 (`robots.ts`, `force-static`, mirrors sitemap BASE) |

## Components (built)

- **Backgrounds:** `CanvasGrid` (dot grid, footer-synced), `BubbleField` (ambient — replaced WaveGrid ❌)
- **Interactive (3D):** `Ballpit.jsx` on `/404`; Services now uses six sanctioned procedural micro-scenes (`WebApplicationsScene.tsx` + `ServiceSculptureScene.tsx`) with viewport-paused RAF interaction and static mobile/WebGL fallbacks
- **Cards/bento:** `VideoCard`, `FeatureCardsStack`, `AnalyticsCard`, `GlassSurface` (universal wrapper)
- **Home sections:** `HeroSection`, `LogoMarquee`, `IndustriesSection`, `IndustriesTicker`, `ProcessSection` (responsive CSS-3D monolith, four active-card-synced micro-scenes, and a custom four-glyph 2D technical icon system), `TestimonialsSection`, `CaseStudyPreviewRow`, `HomeCTA`, `Footer`
- **Portfolio showcase (`showcase-variants/`):** `PortfolioView`, `PortfolioSingle`, `ShowcaseHoverList`, `StackScaleBack`, `portfolioShared`, `projectVisuals`, `ProjectScreenshotMarquee`
- **Typography/animation:** `SplitText` (GSAP), `ScrollReveal`, `use-scroll-animation`
- **Layout/nav:** `MasterLayout`, `Navbar`
- **Forms:** `ContactForm`, `ContactInfo`
- **UI primitives (`ui/`):** `button`, `card`, `input` (on `@base-ui/react`)
- **Removed:** ❌ `LiquidCursor` (2026-05-25), ❌ `WordReveal` (superseded by SplitText), ❌ `WaveGrid` (→ BubbleField)

## Tech Debt

- ✅ Removed unused `recharts` dependency (2026-06-24)
- ✅ Deleted `privacy-preview/` scratch routes that were shipping into the static export (2026-06-24)
- 🟡 Blog needs real content / decision on content source (no CMS in v1.0 scope)
- 🟡 Placeholder links unwired: contact `ContactInfo` (Calendly/HQ/socials → `#`, `hello@modall.agency`), `Footer` socials (`x.com`/`linkedin.com`/`github.com` roots) — need real URLs/accounts
- ⬜ Keep AGENTS.md "Non-Obvious Rules" in sync as code evolves (nav-links rule was stale)
- ✅ `npm run lint` now clean — exit 0, 0 problems (was 12 errors + 4 warnings). Fixed 2026-06-25: typed `any`s (LucideIcon, `ScrollRevealDelay`, GSAP SplitText types), removed dead vars, and resolved `set-state-in-effect` (SplitText fonts → async; Testimonials → local counter; GlassSurface → justified disable, SSR-safe). Verified behavior-preserving via 4-lens review.
- ⬜ `src/app/reactbits-preview/` + `src/components/reactbits/` — UNTRACKED (not committed). `reactbits-preview` compiles into the build as a public route (same leak pattern as the deleted `privacy-preview`). Left in place — appears to be active local experimentation. Delete or `.gitignore` before deploy if not intended.

## Suggested Next Steps (not committed)

1. Replace placeholder social/contact links with real profile URLs + email (Footer + ContactInfo).
2. Decide whether `reactbits-preview/` ships or gets removed before deploy.
3. Decide Case Studies: dedicated page vs. keep in Portfolio.
4. Blog: real content or keep "Coming Soon".

---
*Update this board whenever a page/feature changes state. Keep the "Last reconciled with git" date current.*

# Progress: Falcons Agency Website

> Legend: ✅ done · 🟡 implemented but partial, unaccepted, or awaiting real content · ⬜ not started · ❌ removed
>
> Stable context → [PROJECT.md](PROJECT.md) · Current handoff → [STATE.md](STATE.md)
> Last reconciled with the repository: **2026-08-09** (documentation and status audit).

## Pages and Routes

| Route | Status | Current state |
|-------|--------|---------------|
| `/` | ✅ | Complete home flow and sections |
| `/about` | ✅ | Implemented |
| `/services` | 🟡 | Six procedural scenes and fallbacks implemented; final visual acceptance pending |
| `/portfolio` | 🟡 | Showcase variants and latest deck/gesture fixes implemented; final visual acceptance pending |
| `/blog` | 🟡 | Route exists; content depth/source undecided |
| `/contact` | 🟡 | Web3Forms submission works; ContactInfo still contains placeholder destinations |
| `/privacy` | ✅ | Native Digital Monolith layout |
| `/terms` | ✅ | Native Digital Monolith layout |
| 404 | ✅ | Interactive Three.js Ballpit with readability fallback |
| Dedicated case studies | ⬜ | Case-study content remains folded into Portfolio |

## Features and Interactions

| Feature | Status | Current state |
|---------|--------|---------------|
| Navbar and mobile drawer | ✅ | Real routes, Services dropdown, active states, scroll-hide behavior |
| Project/contact CTAs | ✅ | Navbar, Services, and Home CTA paths resolve to `/contact` |
| Contact submission | ✅ | Web3Forms, honeypot, reply-to, success and error states |
| Scroll reveals | ✅ | Replay on viewport re-entry and honor reduced motion |
| Services scenes | 🟡 | Lazy WebGL scenes plus static mobile/non-WebGL fallbacks; visual acceptance pending |
| Portfolio phone decks | 🟡 | Pointer/touch interaction and desktop visibility checks passed; visual acceptance pending |
| Newsletter | ❌ | UI/stub removed and descoped; no newsletter is advertised |
| Automated regression tests | ⬜ | No test or browser automation framework is installed |

## SEO and Static Output

| Item | Status | Current state |
|------|--------|---------------|
| Root metadata / Open Graph | ✅ | `src/app/layout.tsx` |
| Sitemap | ✅ | `src/app/sitemap.ts`, statically generated |
| Robots | ✅ | `src/app/robots.ts`, points to the sitemap |
| Static export | ✅ | `next.config.ts` emits `out/` |
| Netlify config | ✅ | Builds with `npm run build`, publishes `out` |

## Major Component Systems

- **Shell/backgrounds:** `MasterLayout`, `Navbar`, `Footer`, `CanvasGrid`, `BubbleField`
- **Home:** `HeroSection`, `LogoMarquee`, industries, process system, testimonials, portfolio preview, `HomeCTA`
- **Portfolio:** `PortfolioView`, `PortfolioSingle`, `ShowcaseHoverList`, `StackScaleBack`, shared project visuals and galleries
- **Services:** `WebApplicationsScene`, `ServiceSculptureScene`, five variants, and static fallbacks
- **UI/motion:** `GlassSurface`, `SplitText`, `ScrollReveal`, `use-scroll-animation`
- **Forms:** `ContactForm`, `ContactInfo`

## Launch Debt

- 🟡 Complete visual acceptance for Services and the latest Portfolio changes.
- 🟡 Replace `ContactInfo` placeholder `#` links and generic HQ/social labels.
- 🟡 Replace Footer root URLs (`x.com`, `linkedin.com`, `github.com`) with real Modall profiles.
- 🟡 Confirm Web3Forms domain locking in its dashboard; this cannot be verified from the repository.
- 🟡 Decide Blog content depth and ownership.
- ⬜ Decide whether dedicated Case Studies routes are needed.
- ⬜ Add browser-level responsive, touch, reduced-motion, and fallback coverage.

## Completed Cleanup

- ✅ Removed the unused `recharts` dependency.
- ✅ Removed the dead newsletter API stub and preview routes that leaked into static output.
- ✅ Added `robots.ts` and reconciled sitemap output.
- ✅ Removed the touch-breaking custom cursor behavior.
- ✅ Corrected stale single-page/navigation documentation.

## Suggested Next Work

1. Visually accept or revise the Portfolio desktop/mobile behavior.
2. Visually accept or revise all six Services scenes and fallbacks.
3. Replace placeholder contact and social destinations.
4. Decide Blog and dedicated Case Studies scope.
5. Add browser regression coverage once interaction design is accepted.

---
*Update this board whenever a route, feature, or launch blocker changes state.*

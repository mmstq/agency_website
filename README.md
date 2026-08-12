# Modall Agency Website

The marketing site for Modall, a B2B technology agency focused on web applications, mobile products, AI integrations, SaaS, infrastructure, and security. The visual direction is the near-black, glass-led “Digital Monolith” system documented in [`DESIGN.md`](DESIGN.md).

The site is a Next.js 16 App Router project that exports to static HTML. All core routes are implemented; final visual acceptance remains open for the Services 3D system and the latest Portfolio interaction work.

## Stack

- Next.js 16.2 and React 19
- TypeScript and Tailwind CSS 4
- `@base-ui/react`-based UI primitives
- GSAP SplitText for headline typography
- Three.js only for the 404 Ballpit and isolated service-card scenes
- Web3Forms for contact submissions
- Netlify static hosting from `out/`

## Local Development

Use npm because the repository commits `package-lock.json`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm exec tsc -- --noEmit
npm run build
```

There is no automated test suite yet. A clean lint, typecheck, and build do not replace browser checks for responsive layout, animation, reduced-motion behavior, touch interaction, or WebGL fallback states.

## Project Structure

```text
src/app/                         App Router pages, metadata, sitemap, robots, 404
src/components/                  Shared layout, navigation, sections, and UI
src/components/services/         Procedural 3D scenes and static fallbacks
src/components/showcase-variants/ Portfolio views and phone-gallery interactions
src/hooks/                       Re-triggering scroll-reveal behavior
src/lib/data/                    Static services, projects, case studies, testimonials
.planning/                       Project context, current handoff, and status board
```

Routes currently exported: `/`, `/about`, `/services`, `/portfolio`, `/blog`, `/contact`, `/privacy`, `/terms`, plus `/robots.txt`, `/sitemap.xml`, and the 404 page.

## Architecture Constraints

- `next.config.ts` uses `output: 'export'`; the production artifact is `out/`.
- Runtime server routes and Server Actions are not available in the deployed site.
- `src/app/layout.tsx` wraps all routes with `StyledJsxRegistry` and `MasterLayout`.
- Major visual containers reuse `GlassSurface`; new animation normally uses CSS or `requestAnimationFrame` with refs.
- Scroll reveals replay on every viewport entry and honor `prefers-reduced-motion`.
- Three.js must remain confined to the approved 404 and Services scenes, with off-screen pausing, capped DPR, reduced-motion handling, and static fallbacks.

## Contact Form and Deployment

`ContactForm.tsx` posts directly to Web3Forms because the site has no runtime server. The public form key should be domain-locked in the Web3Forms dashboard before launch and rotated there if it is ever replaced.

Netlify is configured in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

## Project Documentation

- [`AGENTS.md`](AGENTS.md) — agent workflow and non-obvious implementation rules
- [`.planning/PROJECT.md`](.planning/PROJECT.md) — stable product and architecture context
- [`.planning/STATE.md`](.planning/STATE.md) — current handoff and recent work
- [`.planning/PROGRESS.md`](.planning/PROGRESS.md) — route, feature, SEO, and debt status
- [`DESIGN.md`](DESIGN.md) — visual system and component rules
- [`DESIGN_LOG.md`](DESIGN_LOG.md) and [`CURSOR_ANIMATION_DESIGN.md`](CURSOR_ANIMATION_DESIGN.md) — historical implementation decisions

## Remaining Launch Work

- Complete visual acceptance of the Services scenes and latest Portfolio behavior.
- Replace placeholder Contact and Footer social links with real accounts and confirm the public contact details.
- Decide whether the Blog receives real static content and whether Case Studies need a dedicated route.
- Add browser-level regression coverage when the interaction design stabilizes.

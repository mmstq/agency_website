# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Session Context & Worklog (read first, keep current)

A persistent worklog lives in [`.planning/`](.planning/) so context survives across chat sessions. This is the source of truth for "what we've been working on."

**At the START of a session**, read these to recover context:
- [`.planning/PROJECT.md`](.planning/PROJECT.md) — stable whole-project knowledge (what it is, stack, design system, decisions). Changes rarely.
- [`.planning/STATE.md`](.planning/STATE.md) — current position / what's being worked on right now + recent work log.
- [`.planning/PROGRESS.md`](.planning/PROGRESS.md) — full status board: every page/feature as ✅ done / 🟡 partial / ⬜ not started.

**When meaningful work LANDS in a session** (a feature, page, fix, or decision — not trivial edits), update the worklog before finishing, without being asked:
- `STATE.md` — always: bump the date, refresh the "working on" line, add a "Most Recent Work" entry.
- `PROGRESS.md` — when a page/feature changes state (e.g. ⬜ → ✅).
- `PROJECT.md` — only for new architectural decisions, scope changes, or new known issues.

Keep entries terse and factual. Commit worklog updates alongside the related code change.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Non-Obvious Project Rules

- **No Framer Motion / broad Three.js usage** — animations normally use `requestAnimationFrame` + `useRef` DOM mutation (see [`AnalyticsCard.tsx`](src/components/AnalyticsCard.tsx:6), [`FeatureCardsStack.tsx`](src/components/FeatureCardsStack.tsx:6), [`CanvasGrid.tsx`](src/components/CanvasGrid.tsx:4)). Do NOT install animation libraries. **Two sanctioned Three.js exceptions:** [`Ballpit.jsx`](src/components/Ballpit.jsx) on `/404`, and lightweight procedural service-card micro-scenes under [`src/components/services/`](src/components/services/) (user-approved; currently the Web Applications prototype). Both must pause off-screen, honor reduced motion, cap DPR, and provide a non-WebGL fallback. Do not use Three.js elsewhere without explicit approval.
- **Scroll animations must re-trigger on every viewport entry — never one-time.** Reveal-on-scroll effects animate IN when the element enters the viewport AND reset (re-hide) when it leaves, so they replay every time the user scrolls back. Use the `IntersectionObserver` add/remove-class pattern that toggles on both `isIntersecting` states — see [`use-scroll-animation.ts`](src/hooks/use-scroll-animation.ts) / [`ScrollReveal.tsx`](src/components/ScrollReveal.tsx) and the `.sw-reveal` / `.sw-shown` rows in [`ShowcaseHoverList.tsx`](src/components/showcase-variants/ShowcaseHoverList.tsx). NEVER call `observer.unobserve()` after the first reveal, and do NOT use a "triggerOnce" path. Always honor `prefers-reduced-motion` (show everything, no motion).
- **`GlassSurface`** ([`src/components/GlassSurface.jsx`](src/components/GlassSurface.jsx)) is the universal card wrapper — all major containers use it with `borderRadius={24}`, `backgroundOpacity={0.08}`, `saturation={1.55}`, `distortionScale={-110}`. Do NOT create new card wrappers.
- **No 1px solid borders** — per [`DESIGN.md`](DESIGN.md:28) "No-Line Rule". Sectioning uses background shifts + vertical spacing only. Ghost borders at 10% opacity are allowed.
- **`CanvasGrid.tsx`** — interactive dot-grid background with repulsion physics. Works on both desktop and touch devices.
- **Static export** — [`next.config.ts`](next.config.ts:4) has `output: 'export'`. No server routes, no `getServerSideProps`, no API routes that need a server (newsletter API is a stub).
- **`recharts` is installed but unused** — [`package.json`](package.json:19) lists it as a dependency but no component imports it. Either use it or remove it.
- **`@base-ui/react`** — shadcn/ui buttons and inputs use `@base-ui/react` primitives (not Radix). See [`button.tsx`](src/components/ui/button.tsx:3), [`input.tsx`](src/components/ui/input.tsx:2).
- **`styled-jsx` registry** — [`registry.tsx`](src/app/registry.tsx) wraps the app for styled-jsx SSR support. New pages must be inside `<StyledJsxRegistry>`.
- **Nav links resolve to real routes** — [`Navbar.tsx`](src/components/Navbar.tsx) links point to `/`, `/services`, `/services#slug`, `/contact` (fixed; previously broken anchor-only links).
- **Design tokens** — bg `#131313`, text `#e2e2e2`, Manrope for headings, Inter for body. All radii use `xl` (24px). See [`DESIGN.md`](DESIGN.md).

## Commands

```bash
npm run dev      # Next.js dev server
npm run build    # Static export to out/
npm run lint     # ESLint (next/core-web-vitals + typescript configs)
```

## MCP Tools: code-review-graph

**Always use code-review-graph MCP tools BEFORE Grep/Glob/Read.** The graph auto-updates on file changes.

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — risk-scored analysis |
| `get_review_context` | Need source snippets for review |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. Graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

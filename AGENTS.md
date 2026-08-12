# Agent Instructions

## Start Here

- Read `.planning/PROJECT.md`, `.planning/STATE.md`, and `.planning/PROGRESS.md` before substantial work.
- Treat `.planning/STATE.md` as the current handoff, `.planning/PROGRESS.md` as the status board, and `.planning/PROJECT.md` as stable project context.
- Read `DESIGN.md` before visual work. Historical research and design logs are not current implementation authority.
- Preserve unrelated worktree changes. Do not create or switch branches unless asked.
- When meaningful work lands, update `STATE.md`; update `PROGRESS.md` for status changes and `PROJECT.md` only for durable decisions or scope changes.

## Package Manager

- Use **npm**; `package-lock.json` is authoritative.
- Core commands: `npm install`, `npm run dev`, `npm run lint`, `npm run build`.
- `npm run build` creates the static site in `out/`; Netlify publishes that directory.

## Checks

| Task | Command |
|------|---------|
| Lint one file | `npm exec eslint -- path/to/file.tsx` |
| Lint repository | `npm run lint` |
| Typecheck | `npm exec tsc -- --noEmit` |
| Static export | `npm run build` |

- No automated test framework is installed; distinguish lint/build checks from browser or device acceptance.

## Next.js and Architecture

- This is Next.js 16 App Router. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework APIs or conventions.
- Keep `output: 'export'`; do not add runtime server routes, Server Actions, request-dependent handlers, or server-only redirects/rewrites.
- Runtime form submission must use a static-host-compatible external service; the contact form currently uses Web3Forms.
- `src/app/layout.tsx` owns `StyledJsxRegistry` and `MasterLayout`; keep new routes inside that shared layout.
- Shared content lives in `src/lib/data/`; portfolio UI lives in `src/components/showcase-variants/`; service scenes live in `src/components/services/`.

## Design and Interaction

- Use the existing `GlassSurface` treatment for major glass containers; do not introduce a competing card system.
- Follow the no-line rule: use spacing/background shifts; ghost borders at roughly 10% opacity are allowed.
- Use RAF + refs and CSS for motion. Do not add Framer Motion.
- Three.js is limited to `Ballpit.jsx` and the procedural service scenes. Those scenes must pause off-screen, honor reduced motion, cap DPR, and provide a non-WebGL fallback.
- Scroll reveals must toggle on every viewport entry and exit; never make them one-shot. Reduced motion shows content without animation.
- Preserve the `#131313` / `#e2e2e2` palette, Manrope headings, Inter body copy, and 24px major radii defined in `DESIGN.md`.

## Repository Tools

- Prefix shell commands with `rtk` per the global RTK instructions.
- When code-review-graph tools are callable, use them before direct search for reviews and impact analysis; otherwise state the fallback and inspect the repository directly.

## Commit Attribution

- AI-authored commits must include `Co-Authored-By: <agent name> <agent email>` using the acting agent's own identity.

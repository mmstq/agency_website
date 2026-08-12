# Code Mode

- Follow [`../../AGENTS.md`](../../AGENTS.md) first.
- Read the relevant Next.js 16 guide in `node_modules/next/dist/docs/` before changing framework APIs or conventions.
- Preserve static export, the shared root layout, `GlassSurface`, the no-line rule, and the current design tokens.
- Use CSS or RAF/ref mutation for motion; do not add Framer Motion.
- Keep Three.js inside the approved 404 and Services scenes with pausing, capped DPR, reduced-motion handling, disposal, and static fallback behavior.
- Scroll reveals must replay on entry and reset on exit.
- Run the narrowest useful lint first, then typecheck/build in proportion to risk; browser acceptance is separate.
- Update the planning worklog when meaningful code lands.

# Architect Mode

- Follow [`../../AGENTS.md`](../../AGENTS.md) first.
- Read `.planning/PROJECT.md`, `.planning/STATE.md`, and `.planning/PROGRESS.md` before proposing structural work.
- Preserve Next.js 16 App Router and `output: 'export'`; runtime server features require an explicit architecture change.
- Keep the shared route shell in `src/app/layout.tsx`, `StyledJsxRegistry`, and `MasterLayout`.
- Prefer existing boundaries: `src/lib/data/`, `src/components/showcase-variants/`, and `src/components/services/`.
- Treat `DESIGN.md` as visual authority and `.planning/research/` as historical pre-implementation research.
- New dependencies, broad Three.js usage, CMS/server adoption, or a new card system require explicit approval.
- Separate technical feasibility from browser, device, and visual acceptance criteria.

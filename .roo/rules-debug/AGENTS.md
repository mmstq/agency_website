# Debug Mode

- Follow [`../../AGENTS.md`](../../AGENTS.md) first and preserve unrelated worktree changes.
- Reproduce the exact failure and inspect current code before changing behavior.
- For motion failures, check viewport/document pausing, reduced-motion state, RAF cleanup, pointer/touch handling, and WebGL fallback selection.
- For static-export failures, check the Next.js 16 static-export guide, request-dependent APIs, metadata routes, and `out/` output.
- Contact submission is external Web3Forms traffic; distinguish client validation, network failure, provider rejection, and dashboard configuration.
- No automated test framework exists. Use file linting, typecheck/build, and focused browser/device evidence as separate checks.
- Update `.planning/STATE.md` and `.planning/PROGRESS.md` when a meaningful fix changes current status.

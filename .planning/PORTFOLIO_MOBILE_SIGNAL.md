# Mobile Portfolio Signal Capsule

## Understanding

- Preserve the existing stacked-card portfolio interaction on mobile.
- Remove the large inline screenshot carousel from mobile stack cards only.
- Keep the existing desktop stack and single-project carousel unchanged.
- Replace the removed mobile carousel with a compact, attractive teaser at the bottom of each project card.
- The teaser must not look like a shrunken phone screenshot.
- Tapping the teaser opens the existing screenshot carousel in a full-screen modal.

## Evidence

- The six inline decks mount 28 transformed screenshot layers.
- The current mobile deck reserves 300px, capped at 38svh, before project copy.
- The inline deck assets represent about 2.4 MB of source imagery and image optimization is disabled for the static export.
- The stack already performs scroll-linked geometry reads and transform/opacity writes, so removing the inline deck reduces both viewport pressure and composited layers.

## Assumptions

- The Signal Capsule is approximately 84px tall and the full surface is tappable.
- Project-specific abstract SVG motifs communicate each product without using screenshot thumbnails.
- Motion is limited to transform and opacity, runs only on the front card, and stops for reduced motion.
- Carousel imagery is mounted only while the modal is open.
- Real-device acceptance on the reported Android device is required; static checks do not establish smoothness.

## Decision Log

| Decision | Alternatives | Reason |
| --- | --- | --- |
| Keep the mobile stack | Replace it with natural scrolling | The stack is an intentional signature interaction. |
| Remove only the inline mobile carousel | Keep shrinking or compressing it | The carousel consumes too much height and creates many image layers. |
| Use an abstract Signal Capsule | Tiny phone preview or thumbnail strip | Small screenshots would be illegible and visually weak. |
| Open the existing carousel on demand | Navigate to another page | A modal preserves context and mounts heavy imagery only after intent. |
| Keep desktop unchanged | Redesign all breakpoints | The reported failure is specific to the real-device mobile experience. |
| Restore one stack behavior for all cards | Keep the final-card exception | The exception did not resolve the real-device issue and adds state complexity. |

## Final Design

Each mobile stack card ends with a compact glass Signal Capsule containing the project logo, an abstract project-specific system motif, an `Explore app screens` label, and the screenshot count. Only the visible front card receives a subtle transform/opacity signal sweep. Activating the capsule opens a native full-screen modal containing the existing fanned screenshot carousel and an explicit close control. The modal prevents background interaction and returns focus to its trigger when closed.

## Acceptance

- No inline `FannedDeck` mounts for the all-project mobile stack.
- Desktop and mobile single-project views retain their existing carousel.
- All six project cards use the same sticky stack behavior.
- Every capsule is keyboard accessible and at least 44px tall.
- The gallery closes through its close button, backdrop press, or Escape.
- Reduced motion disables capsule motion and carousel auto-cycling.
- Lint, TypeScript, static export, and rendered mobile checks pass.
- The reported physical device confirms the final visual and scroll behavior.

## Verification Snapshot — 2026-08-12

- ESLint, TypeScript, `git diff --check`, and the 13-page webpack static export passed.
- At a rendered 430×932 mobile viewport, the all-project stack mounted 0 inline decks and 6 Signal Capsules.
- All six card contents measured between 600px and 639px inside a 931px stage.
- Opening a capsule mounted exactly 1 carousel and locked background scrolling; Escape closed it and restored focus to the trigger.
- At 1440×900, the desktop stack retained 6 inline decks and mounted 0 capsules.
- The mobile single-project route retained its 1 existing inline deck and mounted 0 capsules.
- At maximum page scroll, the last card aligned to the viewport and its capsule ended at 752px inside the 932px viewport.
- Physical-device performance and visual acceptance remain pending.

## Real-device viewport correction — 2026-08-12

- Android Chrome screenshots showed that the browser toolbar collapsed from the initial small viewport while stack cards remained locked to `100svh`.
- The resulting small/large viewport mismatch exposed the page beneath each card and left the final card short of `top: 0` at maximum scroll.
- Stack cards now use the stable `100lvh` and scroll progress uses the card's measured height instead of Chrome's changing `window.innerHeight`.
- No final-card spacer is added; the correction keeps one consistent stack model for all projects.

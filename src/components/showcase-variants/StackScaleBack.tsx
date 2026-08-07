'use client';

/* ─────────────────────────────────────────────────────────────────────────
   StackScaleBack — the all-projects /portfolio "scale-back depth stack".

   Six full-viewport cards rendered in normal flow, each CSS `position: sticky`
   pinned to top:0. As you scroll, the next card rises and covers the current
   one; the covered card's STAGE (its rounded surface + content) SCALES DOWN
   (→0.92) and DIMS as it recedes into the back of the stack, giving a sense
   of depth. The recede is FRONT-LOADED (easeOutCubic on scroll progress) so
   most of the scale/dim lands while the card is still visible, and the copy /
   phones inside drift at slightly different rates (subtle internal parallax).
   The front card lifts a touch above the stack via a deeper, CSS-transitioned
   shadow. Cards use `svh` (stable on mobile); buried cards are `inert`.

   Between cards sits a DWELL spacer: a flat stretch of scroll where the current
   project holds fully front (no recede) before the next card begins rising — so
   any project is easy to rest on without precise scrolling.

   Optional `hero`: when supplied it's rendered as the pinned bottom layer
   (z-0, below every card) at less than full height, so the top of project 1
   peeks below it on load as a scroll cue. The hero stays static — project 1
   rises up and covers IT first, on the same sticky-stack mechanism, so the
   page reads as one continuous stack from the very top. The hero does NOT
   scale/dim (unlike cards) — it's a fixed backdrop.

   Why a separate scaling "stage":
     The opaque card BACKGROUND must stay full-viewport so each card seamlessly
     covers the one beneath it (page bg is black). If we scaled the whole
     surface, its shrunken edges would let lower layers / the page bg peek
     through as a sliver while the next card is mid-rise. So the opaque bg is
     fixed at 100% and only an inner stage (rounded #161616 panel + shadow +
     content) scales/dims — depth reads, cover stays seamless.

   Why JS, not CSS scroll-driven animation:
     - `animation-timeline: view()/scroll()` still has uneven browser support.
     - We instead read each card's geometry in a rAF-throttled scroll handler
       and write transform/scale + a dim-overlay opacity directly to the DOM
       (transform + opacity only → 60fps, no layout thrash).

   Front-card detection: one IntersectionObserver watches all six cards and
   keeps the index with the largest visible ratio. That index is committed to
   React state INSIDE the observer callback (never synchronously in an effect
   body) and passed as `active` to each DetailLayout, so only the front card's
   phone carousel cycles.

   SSR-safe: all window/document/IO access lives inside effects and is cleaned
   up on unmount. prefers-reduced-motion keeps the cards stacked but disables
   the JS scale/dim recede (snappy, never traps scroll).
   ───────────────────────────────────────────────────────────────────────── */

import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { projects } from '@/lib/data/projects';
import { DetailLayout } from './portfolioShared';

const TOTAL = projects.length;

// How small / dim a stage gets once fully covered (deepest in the stack).
const MIN_SCALE = 0.92;
const MAX_DIM = 0.55; // dim-overlay opacity when fully receded

// Internal parallax: as a card recedes, its copy drifts up and its phone block
// drifts down at a slightly different rate — turns a flat slide into a "scene".
const PARALLAX_COPY = 14; // px the copy column travels
const PARALLAX_PHONES = 18; // px the phone block travels (opposite → depth)

// Visual entrance: as a card rises in, its deck sweeps up from the bottom-right
// corner into place — like a card dealt into your hand. These are the offsets
// at the start of the rise; they ease to 0 as the card reaches the front.
const ENTER_X = 50; // px — starts to the right
const ENTER_Y = 90; // px — starts lower
const ENTER_ROT = 6; // deg — starts tilted
const ENTER_SCALE = 0.1; // starts at scale 0.9

// Soft elevation on top edge. The front card sits a touch above the stack
// with top-only highlight and shadow.
const BASE_SHADOW = '0 -8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)';
const FRONT_SHADOW = '0 -14px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12)';

// A flat "dwell" inserted between consecutive cards: extra scroll over which
// the current project stays fully front (cover = 0 → no recede, perfectly
// crisp) BEFORE the next card starts rising. Gives every project a comfortable
// resting zone, so a user doesn't have to land on an exact scroll position to
// view one cleanly. (No dwell after the last card — it rests at page end.)
const DWELL_VH = 50;

// When a `hero` is supplied it becomes the pinned bottom layer of the stack,
// rendered at LESS than full height so the top of project 1 peeks below it on
// load — the scroll affordance. Project 1 rises up and covers the hero as you
// scroll. Roughly (100 - HERO_LAYER_VH) vh of project 1 peeks at rest.
const HERO_LAYER_VH = 52;

export default function StackScaleBack({ hero }: { hero?: ReactNode }) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dimRefs = useRef<(HTMLDivElement | null)[]>([]);
    const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
    const phonesRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [frontIndex, setFrontIndex] = useState(0);

    // ── Scale-back recede, driven by a rAF-throttled scroll handler ──────────
    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

        let frame = 0;
        let reduce = mql.matches;

        const paint = () => {
            frame = 0;

            if (reduce) {
                // Stacked but flat — no recede, no parallax, no GPU hints.
                for (let i = 0; i < TOTAL; i++) {
                    const stage = stageRefs.current[i];
                    const dim = dimRefs.current[i];
                    const copy = copyRefs.current[i];
                    const phones = phonesRefs.current[i];
                    if (stage) {
                        stage.style.transform = 'scale(1)';
                        stage.style.willChange = 'auto';
                    }
                    if (dim) {
                        dim.style.opacity = '0';
                        dim.style.willChange = 'auto';
                    }
                    if (copy) copy.style.transform = '';
                    if (phones) phones.style.transform = '';
                }
                return;
            }

            const vh = window.innerHeight || 1;

            // Phase 1 — READ each card's RISE (no interleaved writes → no forced
            // synchronous layout). rise = how far this card has travelled up:
            //   0 → its top is at the viewport bottom (just entering from below)
            //   1 → its top reached the top (pinned/front) or scrolled past
            // A card covering the one beneath it IS that next card's rise, so
            // cover[i] is simply rises[i + 1] — one rect read per card.
            const rises = new Array<number>(TOTAL);
            for (let i = 0; i < TOTAL; i++) {
                const card = cardRefs.current[i];
                let r = 1;
                if (card) {
                    const top = card.getBoundingClientRect().top;
                    r = 1 - top / vh;
                    if (r < 0) r = 0;
                    else if (r > 1) r = 1;
                }
                rises[i] = r;
            }

            // Phase 2 — WRITE (compositor-only: transform + opacity).
            for (let i = 0; i < TOTAL; i++) {
                const stage = stageRefs.current[i];
                const dim = dimRefs.current[i];
                if (!stage || !dim) continue;

                const cover = i + 1 < TOTAL ? rises[i + 1] : 0;
                const receding = cover > 0 && cover < 1; // mid-recede

                // easeOutCubic — front-load the recede so most of the scale/dim
                // lands while the card is still visible, not after it's hidden.
                const e = 1 - Math.pow(1 - cover, 3);

                stage.style.transform = `scale(${1 - (1 - MIN_SCALE) * e})`;
                dim.style.opacity = String(MAX_DIM * e);

                // Scope will-change to cards actually mid-transition (MDN: never
                // leave it on permanently — GPU-memory bloat, worse on mobile).
                stage.style.willChange = receding ? 'transform' : 'auto';
                dim.style.willChange = receding ? 'opacity' : 'auto';

                const copy = copyRefs.current[i];
                const phones = phonesRefs.current[i];

                // Copy column: subtle parallax drift as the card recedes.
                if (copy) copy.style.transform = receding ? `translateY(${cover * -PARALLAX_COPY}px)` : '';

                // Visual: on the way IN (this card rising from below) the deck
                // sweeps up from the bottom-right corner into place — like a card
                // dealt into your hand. Once settled it does the recede parallax.
                if (phones) {
                    const rise = rises[i];
                    if (rise < 1) {
                        const inv = (1 - rise) * (1 - rise); // ease-out arrival
                        phones.style.transform =
                            `translate(${inv * ENTER_X}px, ${inv * ENTER_Y}px) rotate(${inv * ENTER_ROT}deg) scale(${1 - inv * ENTER_SCALE})`;
                        phones.style.willChange = rise > 0 ? 'transform' : 'auto';
                    } else if (receding) {
                        phones.style.transform = `translateY(${cover * PARALLAX_PHONES}px)`;
                        phones.style.willChange = 'transform';
                    } else {
                        phones.style.transform = '';
                        phones.style.willChange = 'auto';
                    }
                }
            }
        };

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(paint);
        };

        // Keep the rAF loop's `reduce` flag in sync on a live change.
        const onMotion = (e: MediaQueryListEvent) => {
            reduce = e.matches;
            onScroll();
        };
        mql.addEventListener('change', onMotion);

        paint(); // initial frame
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            mql.removeEventListener('change', onMotion);
        };
    }, []);

    // ── Front-card detection via IntersectionObserver ────────────────────────
    useEffect(() => {
        const ratios = new Array<number>(TOTAL).fill(0);

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const idx = Number((entry.target as HTMLElement).dataset.index ?? '-1');
                    if (idx >= 0) ratios[idx] = entry.intersectionRatio;
                }
                // Pick the FRONT-MOST card of the stack. Every card is
                // `position: sticky; top:0; height:100svh`, so once the next card
                // rises and covers the current one, BOTH are pinned to the full
                // viewport and report intersectionRatio ≈ 1.0 at the same time
                // (IO measures viewport intersection, not occlusion). The visible
                // front is the TOPMOST of those — the HIGHEST index tied at the
                // max ratio — so `>=` lets later cards win the tie. A strict `>`
                // would always keep index 0, freezing `active` on project 1 so
                // only its phone carousel ever cycles.
                let best = 0;
                let bestRatio = -1;
                for (let i = 0; i < TOTAL; i++) {
                    if (ratios[i] >= bestRatio) {
                        bestRatio = ratios[i];
                        best = i;
                    }
                }
                // State is updated INSIDE the observer callback (not in an
                // effect body) → no react-hooks/set-state-in-effect violation.
                setFrontIndex((prev) => (prev === best ? prev : best));
            },
            {
                // Fine-grained thresholds so the "most visible" pick is stable
                // as cards slide over each other.
                threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
            },
        );

        const nodes = cardRefs.current.filter((n): n is HTMLDivElement => n !== null);
        for (const node of nodes) io.observe(node);

        return () => io.disconnect();
    }, []);

    // Keep only the FRONT card interactive. Buried cards stay in the DOM (the
    // sticky stack needs them) but are pulled out of tab order AND the a11y tree
    // via `inert`, so keyboard focus never lands on an invisible card's links
    // (WCAG 2.4.3) and SRs don't read all six. The live region above still
    // announces the front project.
    useEffect(() => {
        for (let i = 0; i < TOTAL; i++) {
            const node = cardRefs.current[i];
            if (node) node.inert = i !== frontIndex;
        }
    }, [frontIndex]);

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Project showcase — scroll to advance"
            className="relative"
        >
            {/* ── Hero as the pinned bottom layer ──────────────────────────────
                When supplied, the hero pins at top:0 (z-0, below every card) and
                stays static while project 1 (z-1) rises up and covers it — same
                sticky-stack mechanism as card→card, just with the hero as the
                covered layer. It's rendered SHORTER than the viewport so the top
                of project 1 peeks below it on load (the scroll cue). Kept
                transparent so the page's dot-grid still shows through behind it;
                the covering is done by project 1's own opaque bg as it rises.
                `minHeight` (not a fixed height) so tall hero copy / short
                viewports never clip the headline. */}
            {hero && (
                <div
                    className="sticky top-0 z-0 flex w-full items-start pt-20 pb-8 md:pt-32"
                    style={{ minHeight: `${HERO_LAYER_VH}svh` }}
                >
                    {hero}
                </div>
            )}

            {/* Screen-reader announcement for the front project. */}
            <span className="sr-only" aria-live="polite" aria-atomic="true">
                {projects[frontIndex].title}, project {frontIndex + 1} of {TOTAL}
            </span>

            {/* ── The stacking cards ──────────────────────────────────────── */}
            {projects.map((project, i) => (
                <Fragment key={project.id}>
                <div
                    ref={(node) => {
                        cardRefs.current[i] = node;
                    }}
                    data-index={i}
                    className="sticky top-0 flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-black"
                    style={{ zIndex: i + 1, height: '100svh', minHeight: '100svh' }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${project.title} — ${i + 1} of ${TOTAL}`}
                >
                    {/* Inner STAGE: rounded top only + top border only + gradient from #161616 to black */}
                    <div
                        ref={(node) => {
                            stageRefs.current[i] = node;
                        }}
                        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-t-[28px] sm:rounded-t-[36px] rounded-b-none border-t border-white/[0.12] border-x-0 border-b-0 bg-gradient-to-b from-[#161616] via-[#111111] to-black"
                        style={{
                            transformOrigin: 'center center',
                            boxShadow: i === frontIndex ? FRONT_SHADOW : BASE_SHADOW,
                            transition: 'box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)',
                        }}
                    >
                        <div className="w-full px-5 pt-7 pb-6 sm:pt-8 md:px-12 md:py-0">
                            <DetailLayout
                                project={project}
                                index={i}
                                active={i === frontIndex}
                                copyRef={(el) => {
                                    copyRefs.current[i] = el;
                                }}
                                phonesRef={(el) => {
                                    phonesRefs.current[i] = el;
                                }}
                            />
                        </div>

                        {/* Dim overlay — fades in as the stage recedes behind the
                            next card. Sits above content, inside the stage. */}
                        <div
                            ref={(node) => {
                                dimRefs.current[i] = node;
                            }}
                            className="pointer-events-none absolute inset-0 rounded-t-[28px] sm:rounded-t-[36px] bg-black"
                            style={{ opacity: 0 }}
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Dwell spacer — holds THIS project fully front before next card rises */}
                {i < TOTAL - 1 && (
                    <div aria-hidden="true" style={{ height: `${DWELL_VH}svh` }} />
                )}
                </Fragment>
            ))}
        </section>
    );
}

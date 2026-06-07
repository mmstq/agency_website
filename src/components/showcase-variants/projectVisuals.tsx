'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

/* ─────────────────────────────────────────────────────────────────────────
   projectVisuals — the RIGHT-side visual for a /portfolio project card.

   FannedDeck: the project's screenshots fanned like a spread hand of cards —
   one sharp, upright front card with the rest rotated, dimmed and shrunk
   behind it. Each tick the front card peels to the back and the next promotes
   to front. Transform/opacity/filter only, dark-theme, ghost-border only
   (No-Line rule).

   It cycles CONTINUOUSLY (not gated on whether the card is the front one), so a
   project's deck is already in motion as it arrives — no "it only starts once
   you stop scrolling". Interactive: hover pauses the shuffle so you can look,
   and clicking (or Enter/Space) advances to the next screenshot. Honours
   prefers-reduced-motion (no auto-shuffle; manual advance still works).
   ───────────────────────────────────────────────────────────────────────── */

export type VizProps = { screenshots: StaticImageData[]; active: boolean; fill?: boolean };

const EASE = 'cubic-bezier(0.22,1,0.36,1)';
const DECK_TICK_MS = 3600;

type Slot = { transform: string; filter: string; opacity: number; z: number };

// Fan slots, front → deepest. transform-origin is bottom-center, so cards
// pivot from the base like a held hand. Rotations stay ≤ ~10° (intentional,
// not gimmicky); each card back is smaller + dimmer for a clear depth gradient.
const DECK_SLOTS: Slot[] = [
    { transform: 'rotate(-2deg) translate(0%,-3%) scale(1)', filter: 'brightness(1)', opacity: 1, z: 40 },
    { transform: 'rotate(5deg) translate(9%,-1%) scale(0.96)', filter: 'brightness(0.7)', opacity: 1, z: 30 },
    { transform: 'rotate(9deg) translate(16%,2%) scale(0.92)', filter: 'brightness(0.5)', opacity: 1, z: 20 },
    { transform: 'rotate(-6deg) translate(-10%,0%) scale(0.94)', filter: 'brightness(0.6)', opacity: 1, z: 10 },
];
// Parked behind the deck, invisible — the card mid-cycle between front and back.
const DECK_HIDDEN: Slot = { transform: 'rotate(0deg) translate(0%,0%) scale(0.9)', filter: 'brightness(0.4)', opacity: 0, z: 0 };

export function FannedDeck({ screenshots, fill = false }: VizProps) {
    const shots = screenshots.slice(0, 5);
    const n = shots.length;
    const [i, setI] = useState(0);
    const paused = useRef(false);

    // Always shuffling (paused only on hover) — never gated on visibility.
    useEffect(() => {
        if (n < 2) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = window.setInterval(() => {
            if (!paused.current) setI((p) => (p + 1) % n);
        }, DECK_TICK_MS);
        return () => window.clearInterval(id);
    }, [n]);

    const advance = () => setI((p) => (p + 1) % n);

    return (
        <div
            // `fill` (single-project view): drive size from viewport HEIGHT on
            // md+ (w-auto + aspect-ratio keeps phones proportional) so the deck
            // never runs off the bottom. Default: width-driven, as before.
            className={`relative mx-auto aspect-[9/19] cursor-pointer ${
                fill
                    ? 'w-full max-w-[340px] md:h-[68svh] md:w-auto md:max-w-full'
                    : 'max-h-[86svh] w-full max-w-[400px]'
            }`}
            style={{ perspective: '1000px' }}
            role="button"
            tabIndex={0}
            aria-label="Next screenshot"
            title="Next screenshot"
            onClick={advance}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    advance();
                }
            }}
            onMouseEnter={() => {
                paused.current = true;
            }}
            onMouseLeave={() => {
                paused.current = false;
            }}
        >
            {shots.map((s, k) => {
                const slot = ((k - i) % n + n) % n;
                const st = slot < DECK_SLOTS.length ? DECK_SLOTS[slot] : DECK_HIDDEN;
                return (
                    <div
                        key={k}
                        className="absolute inset-0 overflow-hidden rounded-[26px]"
                        style={{
                            transform: st.transform,
                            filter: st.filter,
                            opacity: st.opacity,
                            zIndex: st.z,
                            transformOrigin: 'bottom center',
                            transition: `transform 0.9s ${EASE}, filter 0.9s ${EASE}, opacity 0.6s ${EASE}`,
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.07)',
                        }}
                    >
                        <Image src={s} alt="" fill priority={k === 0} sizes="270px" className="object-cover" />
                    </div>
                );
            })}
        </div>
    );
}
